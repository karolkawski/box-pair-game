export const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        color="white"
        position={[0, 0, 10]}
        intensity={1}
        name="DirectionalLight"
      />
    </>
  );
};
