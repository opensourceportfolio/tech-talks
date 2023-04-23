import { Inter } from 'next/font/google';
import Image from 'next/image';

import { TalkLink } from '@/components/TalkLink';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'></div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <h1 className='lg:text-8xl sm:text-4xl'>Tech Talks</h1>
      </div>

      <div className='mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left'>
        <TalkLink
          name='Introduction to monads'
          description='A primer on functional programming and monads'
          slug='/talk/intro-to-monads'
        ></TalkLink>

        <TalkLink
          name='Are you my type'
          description='An exploration of the Typescript type hierarchy'
          slug='/talk/are-you-my-type'
        ></TalkLink>

        <TalkLink
          name='Will you be my covariant'
          description='Discovering the meaning of covariance and contravariance'
          slug='/talk/will-you-be-my-covariant'
        ></TalkLink>

        <TalkLink
          name='Algebraic data types'
          description='What is all the fuss about about ADTs'
          slug='/talk/algebraic-data-types'
        ></TalkLink>
      </div>
    </main>
  );
}
