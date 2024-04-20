import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraController } from './components/CameraControler';
import { getRandomImage } from './utils/getRandomImage';
import { createArray } from './utils/createArray';
import { Locker } from './components/Locker/Locker';
import { Lights } from './components/Lights';
import { Helpers } from './components/Helpers/Helpers';

const size = [4, 4];
const boxSize = 1;

const App: React.FC = () => {
  const gridSize = size.map((s) => s * boxSize);
  const [scene, setScene] = useState(null);
  const pairNumber = (size[0] * size[1]) / 2;
  const pairArray = createArray(pairNumber);

  useEffect(() => {
    if (scene) {
      console.log('Scene:', scene);
    }
  }, [scene]);
  const canvasWidth = gridSize[0] - 3;

  return (
    <div id="App">
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas onCreated={({ scene }) => setScene(scene)}>
          <Lights />
          <CameraController distance={10} />
          <Helpers />
          <group position={[-canvasWidth / 2, 0, 0]} name={'lockers'}>
            {Array.from({ length: size[0] * size[1] }).map((_, i) => {
              const index = getRandomImage(pairArray);
              return (
                <Locker
                  index={index}
                  key={`${i}`}
                  x={(i % size[0]) + 1}
                  y={Math.floor(i / size[0]) + 1}
                  size={size}
                  boxSize={boxSize}
                />
              );
            })}
          </group>
        </Canvas>
      </div>
    </div>
  );
};

export default App;
