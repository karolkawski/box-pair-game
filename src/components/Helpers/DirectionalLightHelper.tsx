import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export const DirectionalLightHelper = () => {
  const { scene } = useThree();
  useEffect(() => {
    const directionalLight = scene.getObjectByName('DirectionalLight');
    if (directionalLight) {
      const helper = new THREE.DirectionalLightHelper(directionalLight, 10);
      scene.add(helper);
      return () => {
        scene.remove(helper);
      };
    }
  }, [scene]);

  return null;
};
