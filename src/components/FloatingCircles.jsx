import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const FloatingCircles = () => {
    const circles = [...Array(50)].map(() => {
        const mesh = new THREE.Mesh(
            new THREE.CircleGeometry(0.5, 32), // radius = 0.5, segments = 32
            new THREE.MeshBasicMaterial({
                color: new THREE.Color(Math.random(), Math.random(), Math.random()),
                side: THREE.DoubleSide,
            })
        );
        mesh.position.set(Math.random() * 20 - 10, Math.random() * 10 - 5, Math.random() * 20 - 10);
        mesh.rotation.x = Math.PI / 2; // Align with XY plane
        return {
            mesh,
            speed: 0.01 + Math.random() * 0.03, // Random upward speed
        };
    });

    useFrame(() => {
        // Update the positions of the circles to make them float upward
        circles.forEach((circle) => {
            circle.mesh.position.y += circle.speed;
            if (circle.mesh.position.y > 10) {
                // Reset the position when it goes off the top of the screen
                circle.mesh.position.y = -10;
            }
        });
    });

    return (
        <group>
            {circles.map((circle, index) => (
                <primitive key={index} object={circle.mesh} />
            ))}
        </group>
    );
};

export default FloatingCircles;
