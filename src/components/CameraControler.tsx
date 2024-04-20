import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

export const CameraController = ({ distance }) => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.distance = distance;
    controls.minDistance = distance;
    const maxHorizontalAngle = Math.PI / 6;

    controls.maxAzimuthAngle = maxHorizontalAngle;
    controls.minAzimuthAngle = -maxHorizontalAngle;

    controls.update();
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};
