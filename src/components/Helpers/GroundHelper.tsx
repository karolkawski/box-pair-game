import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export const GroundHelper = () => {
  const { scene } = useThree();
  useEffect(() => {
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
    return () => {
      scene.remove(gridHelper);
    };
  }, [scene]);

  return null;
};
