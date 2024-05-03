import { useLoader } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { splitObject } from '../../utils/splitObject';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { pairs } from '../../pairs';

export const Locker = ({
  x,
  y,
  index,
  size,
  boxSize,
  clickAmount,
  handleClickAmount,
  selectedPair,
  setSelectedPair,
}) => {
  const [selected, select] = useState(false);
  const [hovered, setHovered] = useState(false);
  const boxFbx = useLoader(FBXLoader, '/assets/Models/locker.fbx');

  const [locker, door, image] = splitObject(boxFbx.children);

  const texture = useLoader(
    THREE.TextureLoader,
    `/assets/Images/${index + 1}.png`
  );

  const material = new THREE.MeshBasicMaterial({ map: texture });

  const handleClick = () => {
    if (clickAmount % 2 === 1) {
      return;
    }

    select(!selected);
  };

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const gridSize = size.map((s) => s * boxSize);
  const gridCenter = [
    (gridSize[0] - boxSize) / 2 + 1,
    (gridSize[1] - boxSize) / 2,
  ];

  useEffect(() => {
    handleClickAmount(selected, index);
  }, [selected]);

  useEffect(() => {
    if (selectedPair[0] !== null && selectedPair[1] !== null) {
      if (selectedPair[0] === selectedPair[1]) {
        return;
      }
      if (selectedPair.includes(index) && selected) {
        select(!selected);
        setSelectedPair([null, null]);
      }
    }
  }, [selectedPair]);

  return (
    <group
      position={[gridCenter[0] - x * boxSize, gridCenter[1] - y * boxSize, 1]}
      name={'locker-group'}
    >
      <primitive object={locker.clone()} name={'locker'}></primitive>
      <primitive
        object={door.clone()}
        name={'front'}
        onClick={() => handleClick()}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {selected ? (
          <meshPhongMaterial
            color="#ff0000"
            opacity={0.01}
            transparent={selected}
          />
        ) : (
          <meshStandardMaterial color={'gray'} />
        )}
        <Edges
          linewidth={selected ? 0.5 : 0.1}
          scale={1.1}
          threshold={15}
          color="white"
        />
      </primitive>
      <primitive object={image.clone()} name={'image'}>
        <meshBasicMaterial attach="material" map={texture} />
      </primitive>
    </group>
  );
};
