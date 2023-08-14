'use client'
import * as THREE from 'three';
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Roboto, Rubik_Maze } from 'next/font/google'
import VideoPlayer from '@/components/VideoPlayer'
import FloatingCircles from '@/components/FloatingCircles'
import { FlagPole } from '@/components/FlagPole'

const rubik = Rubik_Maze({
  weight: '400',
  subsets: ['latin'],
})


const MyPointLight = () => {
  const { scene } = useThree();
  const light = new THREE.PointLight(0xffffff);
  light.position.set(10, 10, 10);
  scene.add(light);
  return null;
};

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
const Character = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Character), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })



export default function Page() {
  return (
    <>

      <Canvas style={{ position: 'absolute', zIndex: -1 }}>
        <FloatingCircles />
      </Canvas>

      <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-full'>
        {/* jumbo */}
        <div className='flex w-full flex-col justify-center p-12 text-center md:w-full md:text-center'>
          <p className={`${rubik.className} text-2xl`}>mimes.ai</p>
          <h1 className='my-4 text-5xl font-bold leading-tight text-center'>2D to 3D Character Animator</h1>
          <p className='mb-8 text-2xl leading-normal'>Animate your world and share your stories</p>
        </div>
      </div>


      <div className="mx-auto flex w-full flex-col flex-wrap items-center justify-center md:flex-row  lg:w-4/5">
        <form action="https://api.web3forms.com/submit" method="POST">

          <input type="hidden" name="access_key" value="928aa7e4-7d32-42bc-a8c7-c82154345c8c" />

          <input
            className='border-2 border-gray-300 p-2 w-1/2'
            type="text"
            name="name"
            placeholder='Your name'
            required
          />
          <input
            className='border-2 border-gray-300 p-2 w-1/2'
            type="email"
            name="email"
            placeholder='Your email'
            required
          />
          <input type="hidden" name="redirect" value="https://web3forms.com/success" />
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded w-full'
            type="submit">Sign Up for Waitlist</button>

        </form>
      </div>


      <div className='mx-auto flex w-full flex-col flex-wrap items-center p-12 md:flex-row  lg:w-4/5'>
        {/* first row */}
        <div className='relative h-100 w-full sm:w-1/2 md:my-12 md:mb-40'>
          <Image
            src="/img/catwizard.png"
            alt="input image"
            width={500}
            height={500}
            priority
          />
        </div>
        <div className='relative my-12 h-100 w-full sm:w-1/2 md:mb-40'>
          <VideoPlayer src="/video/catwizard-output.mp4" />
        </div>
        {/* second row */}
        <div className='relative w-full text-center text-gray-500 '>
          <p className='mb-8 leading-normal'>Use your arrow keys &larr; &rarr; to move the Tiger!</p>
        </div>
        <div className='relative h-48 w-full '>
          <View orbit className='relative h-full sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <MyPointLight />
              <Character route='/blob' scale={4} position={[0, -0.6, 0]} />
              <Common color={'lightblue'} />
              <FlagPole position={[-5, -3, 0]} />
            </Suspense>
          </View>
        </div>
        {/* third row */}

      </div>

      <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-full'>
        {/* jumbo */}
        <div className='flex w-full flex-col justify-center p-12 text-center md:w-full md:text-center'>
          <p className='mb-8 leading-normal'>Made with &#9829; in SF</p>
        </div>
      </div>
    </>
  )
}


