import React, { useEffect, useRef, useState, useCallback } from 'react';
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
let matrix = Array.from({ length: 4 }, () =>
  Array.from({ length: 4 }, () => 0)
);

const App: React.FC = () => {
  const gridSize = size.map((s) => s * boxSize);
  const [scene, setScene] = useState(null);
  const [clickAmount, setClickAmount] = useState(0);
  const [timer, setTimer] = useState();
  const [blocked, setBlocked] = useState(false);
  const [selectedPair, setSelectedPair] = useState([
    [null, null],
    [null, null],
  ]);
  const [selectedHistory, setSelectedHistory] = useState([]);
  const [selectedMatrix, setSelectedMatrix] = useState(matrix);
  const groupRef = useRef();

  const handleClickAmount = (selected, x, y, index) => {
    const matrixCopy = [...matrix];
    matrixCopy[y][x] = selected ? index : 0;
    setSelectedMatrix(matrixCopy);

    let newAmount = clickAmount;
    const [first, second] = selectedPair;
    if (selected) {
      newAmount += 1;
      setSelectedHistory([...selectedHistory, index]);
      if (first[0] === null && first[1] === null) {
        setSelectedPair([[x, y], second]);
      } else {
        setSelectedPair([first, [x, y]]);
      }
    } else if (newAmount > 0) {
      newAmount -= 1;
    }
    setClickAmount(newAmount);
  };

  useEffect(() => {
    const [first, second] = selectedPair;
    if (
      first[0] !== null &&
      first[1] !== null &&
      second[0] !== null &&
      second[1] !== null
    ) {
      setBlocked(true);
      const A = matrix[first[1]][first[0]];
      const B = matrix[second[1]][second[0]];

      const matrixCopy = [...matrix];
      if (A !== B) {
        matrixCopy[first[1]][first[0]] = 0;
        matrixCopy[second[1]][second[0]] = 0;
      }

      setTimeout(() => {
        console.log('clear');
        setSelectedPair([
          [null, null],
          [null, null],
        ]);
        setSelectedMatrix(matrixCopy);
        setBlocked(false);
      }, 5 * 1000);
    }
  }, [selectedPair]);

  const onMouseMove = useCallback((event) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    const mouseX = (clientX / innerWidth) * 0.08;
    const mouseY = -(clientY / innerHeight) * 0.08;

    if (groupRef.current) {
      groupRef.current.rotation.y = mouseX;
      groupRef.current.rotation.x = mouseY;
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [onMouseMove]);

  const canvasWidth = gridSize[0] - (size[0] - 3);

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
                  x={i % size[0]}
                  y={Math.floor(i / size[0])}
                  size={size}
                  boxSize={boxSize}
                  blocked={blocked}
                  handleClickAmount={handleClickAmount}
                  selected={
                    selectedMatrix[Math.floor(i / size[0])][i % size[0]] !== 0
                      ? true
                      : false
                  }
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
