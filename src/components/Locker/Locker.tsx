import { useLoader } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { splitObject } from '../../utils/splitObject';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export const Locker = ({
  x,
  y,
  index,
  size,
  boxSize,
  blocked,
  handleClickAmount,
  selected,
}) => {
  const [hovered, setHovered] = useState(false);
  const boxFbx = useLoader(FBXLoader, '/assets/Models/locker.fbx');
  const [locker, door, image] = splitObject(boxFbx.children);

  const texture = useLoader(
    THREE.TextureLoader,
    `/assets/Images/${index + 1}.png`
  );

  const gridSize = size.map((s) => s * boxSize);
  const gridCenter = [
    (gridSize[0] - boxSize) / 2 + 1,
    (gridSize[1] - boxSize) / 2,
  ];

  const handleSelectClick = () => {
    if (blocked) {
      return;
    }
    handleClickAmount(true, x, y, index);
  };

  useEffect(() => {
    if (blocked) {
      document.body.style.cursor = 'cursor';
      return;
    }
    document.body.style.cursor = hovered ? 'pointer' : 'cursor';
  }, [hovered]);

  return (
    <group
      position={[gridCenter[0] - x * boxSize, gridCenter[1] - y * boxSize, 1]}
      name={'locker-group'}
    >
      <primitive object={locker.clone()} name={'locker'}></primitive>
      <primitive
        object={door.clone()}
        name={'front'}
        onClick={() => handleSelectClick()}
        onPointerOver={() => (blocked ? false : setHovered(true))}
        onPointerOut={() => setHovered(false)}
      >
        {selected ? (
          <meshPhongMaterial
            color="#ff0000"
            opacity={0.01}
            transparent={selected}
          />
        ) : hovered ? (
          <meshStandardMaterial color={'#ff0000'} />
        ) : (
          <meshStandardMaterial color={'gray'} />
        )}
      </primitive>
      <primitive object={image.clone()} name={'image'}>
        <meshBasicMaterial attach="material" map={texture} />
      </primitive>
    </group>
  );
};
