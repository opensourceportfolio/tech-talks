import 'reveal.js/dist/reveal.css';

import fs from 'fs';
import mermaid from 'mermaid';
import { GetServerSideProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import path from 'path';
import { useEffect, useRef } from 'react';

function setGraphHeight(dom: Element) {
  const svgDiagram = dom.firstElementChild;

  if (svgDiagram) {
    svgDiagram.setAttribute('width', dom.clientWidth.toString());
    svgDiagram.setAttribute('height', dom.clientHeight.toString());
    svgDiagram.removeAttribute('style');
  }
}

async function renderGraph(dom: Element, id: number) {
  const mermaidGraph = dom.textContent;

  if (mermaidGraph) {
    const renderResult = await mermaid.mermaidAPI.render(
      `mermaid-${id}`,
      mermaidGraph
    );

    const mermaidSvg = document.createElement('div');

    mermaidSvg.classList.add('mermaid-svg');
    mermaidSvg.innerHTML = renderResult.svg;

    dom.parentElement?.after(mermaidSvg);
    dom.parentElement?.remove();

    return mermaidSvg;
  }
}

function renderSVG(dom: Element) {
  const svgDrawing = (dom.textContent ?? '')
    .split(';')
    .filter(Boolean)
    .map((l) => `svg.appendChild(${l.trim()});`)
    .join(';\n');
  const ext = {
    text: (
      textContent: string,
      x: number,
      y: number,
      options: Record<string, string>
    ) => {
      const node = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );
      const textNode = document.createTextNode(textContent);

      Object.entries({ x, y, ...options }).forEach(([k, v]) =>
        node.setAttribute(k, v.toString())
      );
      node.appendChild(textNode);

      return node;
    },
  };
  const renderedSvg = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );

  renderedSvg.classList.add('rendered-svg');

  const s = Function(
    'svg',
    'ext',
    `
      const r = rough.svg(svg);
      Object.assign(r, ext)
      
      ${svgDrawing}

      return svg;
    `
  )(renderedSvg, ext);

  // renderedSvg.innerHTML = s;

  dom.parentElement?.after(renderedSvg);
  dom.parentElement?.remove();

  // return dom;
}

type Props = {
  content: string;
};

export default function Talk({ content }: Props) {
  const router = useRouter();
  const { name } = router.query;
  const init = useRef<boolean>(false);

  useEffect(() => {
    async function clientSide() {
      const Reveal = (await import('reveal.js')).default;

      if (init.current == false) {
        init.current = true;
        const [RevealMarkdown, RevealHighlight, RevealNotes, RevealMath] = (
          await Promise.all([
            import('reveal.js/plugin/markdown/markdown'),
            import('reveal.js/plugin/highlight/highlight'),
            import('reveal.js/plugin/notes/notes'),
            import('reveal.js/plugin/math/math'),
          ])
        ).map((plugin) => plugin.default);

        mermaid.initialize({ startOnLoad: false });

        await Reveal.initialize({
          backgroundTransition: 'convex',
          hash: true,
          width: '100%' as any,
          height: 700,
          margin: 0.04,
          minScale: 0.2,
          maxScale: 2.0,
          display: 'flex',
          plugins: [
            RevealMarkdown,
            RevealNotes,
            RevealHighlight,
            // RevealMath.KaTeX,
          ],
        });

        Reveal.on('slidechanged', () => {
          document.querySelectorAll('.mermaid').forEach(renderGraph);
          document.querySelectorAll('.svg').forEach(renderSVG);
          document.querySelectorAll('.mermaid-svg').forEach(setGraphHeight);
        });
      }
    }
    clientSide();
  }, []);

  return (
    <div className='reveal'>
      <div className='slides'>
        <section
          data-auto-animate
          data-markdown=''
          data-separator='^#######'
          data-separator-vertical='^-------'
          data-separator-notes='^Note:'
          data-charset='iso-8859-15'
        >
          <textarea data-template='' defaultValue={content}></textarea>
        </section>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'public', 'talks');
  const files = await fs.promises.readdir(filePath, { withFileTypes: false });

  const res = {
    paths: files.map((name) => ({
      params: {
        name: path.parse(name).name,
      },
    })),
    fallback: false,
  };

  return res;
};

export const getStaticProps: GetServerSideProps<Props> = async (context) => {
  if (context.params) {
    const { name } = context.params;

    if (name && typeof name == 'string') {
      const filePath = path.join(
        process.cwd(),
        'public',
        'talks',
        `${name}.md`
      );
      const content = await fs.promises.readFile(filePath, 'utf8');

      return {
        props: {
          content,
        },
      };
    }
    throw new Error(`Invalid talk name provided: ${name}`);
  }
  throw new Error('No talk name provided');
};
