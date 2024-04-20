import React, { useEffect, useState } from 'react';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const size = [4, 4];
const boxSize = 1;

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
  const boxFbx = useLoader(FBXLoader, '/assets/BOX/box.fbx');
  console.log('🚀 ~ Box ~ boxFbx:', boxFbx);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const gridSize = size.map((s) => s * boxSize);
  const gridCenter = [
    (gridSize[0] - boxSize) / 2 + 1,
    (gridSize[1] - boxSize) / 2,
  ];

  return (
    <group
      position={[gridCenter[0] - x * boxSize, gridCenter[1] - y * boxSize, 1]}
      name={'locker'}
    >
      <primitive
        object={boxFbx.clone()}
        name={'box'}
        onClick={(event) => select(!selected)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* {selected ? (
          <meshPhongMaterial
            color="#ff0000"
            opacity={0.01}
            transparent={selected}
          />
        ) : (
          <meshStandardMaterial color={selected ? 'hotpink' : 'graay'} />
        )} */}
      </primitive>
    </group>
  );
};

const DirectionalLightHelper = () => {
  const { scene } = useThree();
  useEffect(() => {
    const directionalLight = scene.getObjectByName('DirectionalLight');
    console.log('🚀 ~ useEffect ~ directionalLight:', directionalLight);
    if (directionalLight) {
      const helper = new THREE.DirectionalLightHelper(directionalLight, 10); // Adjust the size of the helper as needed
      scene.add(helper);
      return () => {
        scene.remove(helper);
      };
    }
  }, [scene]);

  return null;
};

const App: React.FC = () => {
  const gridSize = size.map((s) => s * boxSize);
  const [scene, setScene] = useState(null);

  useEffect(() => {
    if (scene) {
      console.log('Scene:', scene);
    }
  }, [scene]);
  const canvasWidth = gridSize[0] - 1;

  return (
    <div id="App">
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas onCreated={({ scene }) => setScene(scene)}>
          <ambientLight intensity={0.5} />
          <directionalLight
            color="white"
            position={[0, 0, 10]}
            intensity={0.5}
            name="DirectionalLight"
          />

          {/* <spotLight position={[-1, -1, -1]} angle={0.15} penumbra={1} /> */}
          {/* <pointLight position={[10, 10, 10]} /> */}
          <DirectionalLightHelper />
          <CameraController distance={10} />
          <group position={[-canvasWidth / 2, 0, 0]} name={'lockers'}>
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
