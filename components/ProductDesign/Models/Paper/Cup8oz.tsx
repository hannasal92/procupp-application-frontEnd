import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Decal, PivotControls, useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { store } from "@/store";
import { useSnapshot } from "valtio";

type GLTFResult = GLTF & {
  nodes: {
    body: THREE.Mesh;
    cap: THREE.Mesh;
  };
  materials: {
    ["default"]: THREE.MeshStandardMaterial;
  };
};

export function Cup8oz(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF(
    "/product-design/models/paper/8oz.glb"
  ) as GLTFResult;

  const globalState = useSnapshot(store);

  const [pos, setXYZ] = useState([0, 0.05, 0.043]);
  const [scl, setScl] = useState([0.086, 0.086, 0.086]);

  useEffect(() => {
    setXYZ((prev) => [prev[0], prev[1], 0]);
  }, [globalState.printOnBothSide]);

  let map = useTexture(globalState.productUploadImage);

  useEffect(() => {
    store.handleCenterArrow = () => setXYZ([0, 0.05, 0.043]);
  }, []);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.body.geometry}>
        <group position={[0, 0.045, 0.04]}>
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
              setXYZ([position.x, position.y + 0.05, 0]);
              setScl([0.086 * scale.y, 0.086 * scale.y, 0.086 * scale.z]);
            }}
          />
        </group>
        <Suspense fallback={null}>
          <Decal
            // debug
            position={[pos[0], pos[1], 0.043]}
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
              position={[pos[0], pos[1], -0.043]}
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
      <mesh geometry={nodes.cap.geometry}>
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}

useGLTF.preload("/product-design/models/paper/8oz.glb");
