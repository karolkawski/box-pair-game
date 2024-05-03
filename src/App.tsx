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
const pairNumber = (size[0] * size[1]) / 2;
const pairArray = createArray(pairNumber);
const indexes = Array.from({ length: size[0] * size[1] }).map((_, i) => {
  return getRandomImage(pairArray);
});
console.log('🚀 ~ indexes ~ indexes:', indexes);

const App: React.FC = () => {
  const gridSize = size.map((s) => s * boxSize);
  const [scene, setScene] = useState(null);
  const [clickAmount, setClickAmount] = useState(0);
  const [selectedPair, setSelectedPair] = useState([null, null]);
  const [selectedHistory, setselectedHistory] = useState([]);

  const handleClickAmount = (selected, index) => {
    let newAmount;
    if (selected) {
      newAmount = clickAmount + 1;
      setselectedHistory([...selectedHistory, index]);
      if (selectedPair[0] === null) {
        setSelectedPair([index, selectedPair[1]]);
      } else {
        setSelectedPair([selectedPair[0], index]);
      }
    } else {
      newAmount = clickAmount - 1;
    }

    setClickAmount(newAmount);

    console.log(newAmount);
  };

  useEffect(() => {
    console.log(selectedHistory, selectedPair);

    if (selectedPair[0] !== null && selectedPair[1] !== null) {
      if (selectedPair[0] === selectedPair[1]) {
        console.log('SAME');
        setClickAmount(-1);
        setSelectedPair([null, null]);
      } else {
        console.log('DIF');
        setClickAmount(-1);
      }
    }
  }, [selectedHistory, selectedPair]);

  useEffect(() => {
    if (scene) {
      console.log('Scene:', scene);
    }
  }, [scene]);
  const canvasWidth = gridSize[0] - (size[0] - 1);

  return (
    <div id="App">
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas onCreated={({ scene }) => setScene(scene)}>
          <Lights />
          <CameraController distance={10} />
          <Helpers />
          <group position={[-canvasWidth / 2, 0, 0]} name={'lockers'}>
            {Array.from({ length: size[0] * size[1] }).map((_, i) => {
              return (
                <Locker
                  index={indexes[i]}
                  key={`${i}`}
                  x={(i % size[0]) + 1}
                  y={Math.floor(i / size[0]) + 1}
                  size={size}
                  boxSize={boxSize}
                  clickAmount={clickAmount}
                  handleClickAmount={handleClickAmount}
                  selectedPair={selectedPair}
                  setSelectedPair={setSelectedPair}
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
