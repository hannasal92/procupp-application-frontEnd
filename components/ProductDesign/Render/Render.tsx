import { Canvas } from "@react-three/fiber";
import s from "./render.module.scss";
import { Suspense, useState, useEffect } from "react";
import Lighting from "./Lighting";
import ConditionalCup from "../Models/ConditionalCup";
import { useSnapshot } from "valtio";
import { store } from "@/store";
import SaveCanvas from "./SaveCanvas";
import Options from "./Options";
import { OrbitControls as OC } from "three-stdlib";
import { Loader } from "@react-three/drei";

const Render = ({ orbitFollow }: { orbitFollow: React.RefObject<OC> }) => {
  const { isOrbitControl } = useSnapshot(store);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true); // Ensure rendering only happens on the client
  }, []);
  return (
    <div className={s.main}>
      <Options />
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        shadows="soft"
        frameloop="demand"
      >
        <SaveCanvas orbitFollow={orbitFollow} orbitEnabled={isOrbitControl} />
        <color attach="background" args={["#b5b5b5"]} />
        <group scale={15}>
          <Suspense fallback={null}>
            <ConditionalCup />
          </Suspense>
        </group>
        <Lighting />
      </Canvas>
      {isClient && <Loader />}

    </div>
  );
};

export default Render;
