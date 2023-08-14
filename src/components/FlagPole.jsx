import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const FlagPole = ({ position = [0, 0, 0] }) => {
    const poleHeight = 5;
    const poleWidth = 0.1;
    const flagWidth = 2;
    const flagHeight = 1;

    // Create a reference to the flag mesh
    const flagRef = useRef();

    useFrame((state) => {
        // Update the position or rotation of the flag using a sine wave
        if (flagRef.current) {
            flagRef.current.rotation.z = Math.sin(state.clock.getElapsedTime()) * 0.1; // You can adjust the amplitude and frequency of the sine wave here
        }
    });

    return (
        <group position={position}>
            {/* Pole */}
            <mesh position={[0, poleHeight / 2, 0]} scale={[poleWidth, poleHeight, poleWidth]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="brown" />
            </mesh>

            {/* Flag */}
            <mesh ref={flagRef} position={[poleWidth / 2 + flagWidth / 2, poleHeight - flagHeight / 2, 0]} scale={[flagWidth, flagHeight, poleWidth]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </group>
    );
};
