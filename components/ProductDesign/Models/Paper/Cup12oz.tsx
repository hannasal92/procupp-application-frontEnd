import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Decal, PivotControls, useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useSnapshot } from "valtio";
import { store } from "@/store";

type GLTFResult = GLTF & {
  nodes: {
    body: THREE.Mesh;
    cap: THREE.Mesh;
  };
  materials: {
    ["default"]: THREE.MeshStandardMaterial;
  };
};

export function Cup12oz(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF(
    "/product-design/models/paper/12oz.glb"
  ) as GLTFResult;

  const globalState = useSnapshot(store);

  const [pos, setXYZ] = useState([0, 0.06, 0.05]);
  const [scl, setScl] = useState([0.07, 0.07, 0.07]);

  useEffect(() => {
    setXYZ((prev) => [prev[0], prev[1], 0]);
  }, [globalState.printOnBothSide]);

  useEffect(() => {
    store.handleCenterArrow = () => setXYZ([0, 0.06, 0.05]);
  }, []);

  let map = useTexture(globalState.productUploadImage);

  return (
    <>
      <group {...props} dispose={null}>
        <mesh castShadow geometry={nodes.body.geometry}>
          <group position={[0, 0.058, 0.04]}>
            <PivotControls
              visible={!globalState.isOrbitControl}
              scale={0.55}
              disableRotations
              activeAxes={[false, true, false]}
              onDrag={(local) => {
                const position = new THREE.Vector3(0, 0, 0);
                const scale = new THREE.Vector3();
                const quaternion = new THREE.Quaternion();
                local.decompose(position, quaternion, scale);
                setXYZ([position.x, position.y + 0.06, 0]);
                setScl([0.07 * scale.y, 0.07 * scale.y, 0.07 * scale.z]);
              }}
            />
          </group>
          <Suspense fallback={null}>
            <Decal
              // debug
              position={[pos[0], pos[1], 0.03]}
              rotation={[Math.PI * 0, Math.PI * 0, Math.PI * 0]}
              scale={scl as unknown as THREE.Vector3}
            >
              <meshBasicMaterial
                transparent
                map={map}
                polygonOffset
                polygonOffsetFactor={-1}
              />
            </Decal>
          </Suspense>
          {globalState.printOnBothSide && (
            <Suspense fallback={null}>
              <Decal
                // debug
                position={[pos[0], pos[1], -0.03]}
                rotation={[Math.PI * 0, Math.PI * 1, Math.PI * 0]}
                scale={scl as unknown as THREE.Vector3}
              >
                <meshBasicMaterial
                  transparent
                  map={map}
                  polygonOffset
                  polygonOffsetFactor={-1}
                />
              </Decal>
            </Suspense>
          )}
          <meshStandardMaterial color={globalState.productColor} />
        </mesh>
        <mesh castShadow geometry={nodes.cap.geometry}>
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload("/product-design/models/paper/12oz.glb");
