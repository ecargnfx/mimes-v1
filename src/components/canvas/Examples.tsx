'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState, useEffect } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'

export function Dog(props) {
  const { scene } = useGLTF('/catwizard-csm-mesh.glb')

  return <primitive object={scene} {...props} />
}

export function Duck(props) {
  const { scene } = useGLTF('/tiger-csm-mesh.glb')

  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}



export function Character(props) {
  const { scene } = useGLTF('/tiger-csm-mesh.glb');

  const speed = 0.8; // Controls the speed of the wave
  const amplitude = 0.3; // Controls the height of the wave

  useFrame((state) => {
    // Calculate the y position based on a sine wave
    const y = Math.sin(state.clock.elapsedTime * speed) * amplitude;

    // Apply the calculated y position to the scene
    scene.position.y = y;
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          scene.position.x -= 0.1;
          break;
        case 'ArrowRight':
          scene.position.x += 0.1;
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Remove event listener on cleanup
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scene]);

  return <primitive object={scene} {...props} />;
}


