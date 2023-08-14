'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'


type CustomPerspectiveCameraProps = Partial<React.ComponentProps<typeof PerspectiveCamera>>;

export const CustomPerspectiveCamera: React.FC<CustomPerspectiveCameraProps> = ({
  makeDefault = true,
  fov = 40,
  position = [0, 0, 6],
  ...props
}) => {
  return (
    <PerspectiveCamera
      makeDefault={makeDefault}
      fov={fov}
      position={position}
      {...props}
    />
  );
};


export const Common = ({ color }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <pointLight position={[20, 30, 10]} />
    <pointLight position={[-10, -10, -10]} />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
  </Suspense>
)

type ViewProps = {
  children?: React.ReactNode;
  orbit?: boolean;
  className?: string;
  // ... any other props you expect to pass to View
};

const View = forwardRef<HTMLDivElement, ViewProps>(({ children, orbit, ...props }, ref) => {
  const localRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => localRef.current);

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </Three>
    </>
  );
});

View.displayName = 'View';

export { View };
