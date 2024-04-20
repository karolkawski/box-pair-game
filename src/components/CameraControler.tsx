import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export const CameraController = ({ distance }) => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.distance = distance;
    controls.minDistance = distance;
    // const maxHorizontalAngle = Math.PI / 6;
    // const minVerticalAngle = Math.PI / 18;
    // const maxVerticalAngle = Math.PI / 18;

    // controls.maxAzimuthAngle = maxHorizontalAngle;
    // controls.minAzimuthAngle = -maxHorizontalAngle;

    // controls.maxPolarAngle = Math.PI / 2 - minVerticalAngle;
    // controls.minPolarAngle = Math.PI / 2 + maxVerticalAngle;

    controls.update();
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};
