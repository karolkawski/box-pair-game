import React, { useEffect, useRef, useState } from 'react';
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

const App: React.FC = () => {
  const gridSize = size.map((s) => s * boxSize);
  const [scene, setScene] = useState(null);
  const [clickAmount, setClickAmount] = useState(0);
  const [timer, setTimer] = useState();
  const [selectedPair, setSelectedPair] = useState([null, null]);
  const [selectedHistory, setSelectedHistory] = useState([]);
  const groupRef = useRef();

  const handleClickAmount = (selected, index) => {
    let newAmount = clickAmount;
    const [first, second] = selectedPair;

    if (selected) {
      newAmount += 1;
      setSelectedHistory([...selectedHistory, index]);
      if (first === null) {
        setSelectedPair([index, second]);
      } else {
        setSelectedPair([first, index]);
      }
    } else if (newAmount > 0) {
      newAmount -= 1;
    }
    setClickAmount(newAmount);
  };
  const onMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    const mouseX = (clientX / innerWidth) * 0.08;
    const mouseY = -(clientY / innerHeight) * 0.08;

    if (groupRef.current) {
      groupRef.current.rotation.y = mouseX;
      groupRef.current.rotation.x = mouseY;
    }
  };

  useEffect(() => {
    setInterval(() => {
      const time = (
        (new Date() - performance.timing.responseEnd) /
        1000
      ).toFixed(2);
      setTimer(time);
    }, 500);

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useEffect(() => {
    if (scene) {
      console.log('Scene:', scene);
    }
  }, [scene]);

  const canvasWidth = gridSize[0] - (size[0] - 1);

  return (
    <div id="App">
      <div className="absolute p-5 h-40 w-full bg-slate-300">
        <h3 className="text-black">
          Number of clicks: <strong>{clickAmount}</strong>
        </h3>
        <h3>
          Time: <strong>{timer}</strong>s
        </h3>
      </div>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas onCreated={({ scene }) => setScene(scene)}>
          <Lights />
          <CameraController distance={5} />
          <Helpers />
          <group
            ref={groupRef}
            position={[-canvasWidth / 2, 0, 0]}
            name={'lockers'}
          >
            {Array.from({ length: size[0] * size[1] }).map((_, i) => {
              return (
                <Locker
                  index={indexes[i]}
                  key={`${i}`}
                  x={(i % size[0]) + 1}
                  y={Math.floor(i / size[0]) + 1}
                  size={size}
                  boxSize={boxSize}
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
