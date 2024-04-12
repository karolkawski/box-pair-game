import React, { useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

const size = [4, 4];
const boxSize = 1;
const selectedPair = [false, false];

const CameraController = ({ distance }) => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.distance = distance;
    controls.minDistance = distance;
    controls.maxDistance = distance;
    controls.update();
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

const Box = ({ x, y }) => {
  const [selected, select] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);
  return (
    <group>
      <mesh position={[x, y, 0]}>
        <boxGeometry args={[boxSize, boxSize, boxSize]} />
        <meshStandardMaterial />
        <mesh
          transparent={selected}
          position={[0, 0, 0.55]}
          onClick={(event) => select(!selected)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[boxSize, boxSize, 0.1]} />
          <Edges
            linewidth={2}
            threshold={15}
            color={selected ? '#c02040' : 'black'}
          />

          {selected ? (
            <meshPhongMaterial
              color="#ff0000"
              opacity={0.1}
              transparent={selected}
            />
          ) : (
            <meshStandardMaterial color={selected ? 'hotpink' : 'orange'} />
          )}
        </mesh>
      </mesh>
    </group>
  );
};
const App: React.FC = () => {
  const gridSize = size.map((s) => s * boxSize);
  const canvasWidth = gridSize[0] - 1;

  return (
    <div id="App">
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <CameraController distance={5} />
          <group position={[-canvasWidth / 2, 0, 0]}>
            {' '}
            {Array.from({ length: size[0] }).map((_, i) => (
              <React.Fragment key={i}>
                {Array.from({ length: size[1] }).map((_, j) => (
                  <Box key={`${i}-${j}`} x={i} y={j} />
                ))}
              </React.Fragment>
            ))}
          </group>
        </Canvas>
      </div>
    </div>
  );
};

export default App;
