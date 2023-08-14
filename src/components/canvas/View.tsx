'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'


export const Common = ({ color }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <pointLight position={[20, 30, 10]} />
    <pointLight position={[-10, -10, -10]} />
    {/* <PerspectiveCamera position={[0, 0, 6]} /> */}
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
