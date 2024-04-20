import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export const AxesHelper = () => {
  const { scene } = useThree();
  useEffect(() => {
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    return () => {
      scene.remove(axesHelper);
    };
  }, [scene]);

  return null;
};
