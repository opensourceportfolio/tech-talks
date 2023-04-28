import { Inter } from 'next/font/google';
import Image from 'next/image';

import { TalkLink } from '@/components/TalkLink';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between lg:p-24 ${inter.className}`}
    >
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'></div>

      <div className='relative flex place-items-center sm:justify-top'>
        <h1 className='text-4xl md:text-6xl lg:text-8xl'>Tech Talks</h1>
      </div>

      <div className='grid text-center lg:mb-0 md:grid-cols-2 lg:grid-cols-4 lg:text-left'>
        <TalkLink
          name='Algebraic data types'
          description='What is all the fuss about about ADTs?'
          src='/talk/algebraic-data-types'
        ></TalkLink>

        <TalkLink
          name='Will you be my covariant'
          description='Discovering the meaning of covariance and contravariance'
          src='/talk/will-you-be-my-covariant'
        ></TalkLink>

        <TalkLink
          name='What <T>ype are you?'
          description='An exploration of the Typescript type hierarchy'
          src='https://slides.com/leontager/are-you-my-type'
        ></TalkLink>

        <TalkLink
          name='Introduction to monads'
          description='A primer on functional programming and monads'
          src='https://slides.com/leontager/my-attempt-at-monads'
        ></TalkLink>

        <TalkLink
          name='Intro to personal finance'
          description='A quick primer on personal finance when starting your career'
          src='https://slides.com/leontager/personal-finance-ii'
        ></TalkLink>

        <TalkLink
          name='Intermittent fasting'
          description='What is IF and its benefits?'
          src='https://docs.google.com/presentation/d/1VfQLQZgjAHZHu3rKvO633MDg7Y1lFawmwAcAbB7-Fyg/edit?usp=sharing'
        ></TalkLink>

        <TalkLink
          name='Heart disease'
          description='What is the root cause of heart disease?'
          src='https://docs.google.com/presentation/d/1fYkBhSPNr1m0qfvkR03zMAS0BzOI47oPmPVxy5BEeOM/edit?usp=sharing'
        ></TalkLink>
      </div>
    </main>
  );
}
