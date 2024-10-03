const Lighting = () => {
  return (
    <>
      <ambientLight intensity={0.5 * Math.PI} />
      <directionalLight intensity={4} position={[10, 10, 10]} />
    </>
  );
};

export default Lighting;
