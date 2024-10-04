import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Decal, PivotControls, useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useSnapshot } from "valtio";
import { store } from "@/store";

type GLTFResult = GLTF & {
  nodes: {
    models: THREE.Mesh;
  };
  materials: {
    plastic_cup_material: THREE.MeshStandardMaterial;
  };
};

export function V1ExtraSmall(props: JSX.IntrinsicElements["group"]) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { nodes, materials } = useGLTF(
    "/product-design/models/plastic/v1_xs.glb"
  ) as GLTFResult;

  const globalState = useSnapshot(store);

  const [pos, setXYZ] = useState([0, 0.055, 0.024]);
  const [scl, setScl] = useState([0.07, 0.07, 0.08]);

  useEffect(() => {
    setXYZ((prev) => [prev[0], prev[1], 0]);
  }, [globalState.printOnBothSide]);

  useEffect(() => {
    store.handleCenterArrow = () => setXYZ([0, 0.055, 0.024]);
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      const position = new THREE.Vector3();
      const rotation = new THREE.Quaternion();
      const scale = new THREE.Vector3();

      meshRef.current.matrixWorld.decompose(position, rotation, scale);
      setXYZ([position.x, globalState.positionY / 1000 + 0.055, 0]);

    }
  }, [globalState.positionY]);

  useEffect(() => {
    if (meshRef.current) {
      const position = new THREE.Vector3();
      const rotation = new THREE.Quaternion();
      const scale = new THREE.Vector3();
      // Decompose the matrixWorld of the mesh
      meshRef.current.matrixWorld.decompose(position, rotation, scale);
      setScl([0.08 * globalState.positionZ, 0.08 * globalState.positionZ, 0.08 * 0.5555]);
    }
  }, [globalState.positionZ]);

  let map = useTexture(globalState.productUploadImage);

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef} 
        position={[0, -0.02, 0]}
        geometry={nodes.models.geometry}
        material={materials.plastic_cup_material}
        scale={1.5}

      >
        <group position={[0, 0.05, 0.04]}>
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
              setXYZ([position.x, position.y + 0.055, 0]);
              setScl([0.08 * scale.y, 0.08 * scale.y, 0.08 * scale.z]);
            }}
          />
        </group>
        <Suspense fallback={null}>
          <Decal
            // debug
            position={[pos[0], pos[1], 0.024]}
            scale={scl as unknown as THREE.Vector3}
            rotation={[Math.PI * 0, Math.PI * 0, Math.PI * 0]}
            map={map}
          />
        </Suspense>
        {globalState.printOnBothSide && (
          <Suspense fallback={null}>
            <Decal
              // debug
              position={[pos[0], pos[1], -0.024]}
              scale={scl as unknown as THREE.Vector3}
              rotation={[Math.PI * 0, Math.PI * 1, Math.PI * 0]}
              map={map}
            />
          </Suspense>
        )}
      </mesh>
    </group>
  );
}

useGLTF.preload("/product-design/models/plastic/v1_xs.glb");
