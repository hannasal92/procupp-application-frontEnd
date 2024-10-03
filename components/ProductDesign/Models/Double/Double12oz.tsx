import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Decal, PivotControls, useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useSnapshot } from "valtio";
import { store } from "@/store";

type GLTFResult = GLTF & {
  nodes: {
    cup_double_12oz: THREE.Mesh;
    cup_double_12oz_1: THREE.Mesh;
    cup_double_12oz_2: THREE.Mesh;
  };
  materials: {
    generic_cup_material: THREE.MeshStandardMaterial;
    generic_lid_material: THREE.MeshStandardMaterial;
    generic_doublewall_material: THREE.MeshStandardMaterial;
  };
};

export function Double12oz(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/product-design/models/double/12oz.glb"
  ) as GLTFResult;

  const globalState = useSnapshot(store);

  const [pos, setXYZ] = useState([0, 0.064, 0.024]);
  const [scl, setScl] = useState([0.056, 0.056, 0.056]);

  useEffect(() => {
    setXYZ((prev) => [prev[0], prev[1], 0]);
  }, [globalState.printOnBothSide]);

  useEffect(() => {
    store.handleCenterArrow = () => setXYZ([0, 0.064, 0.024]);
  }, []);

  let map = useTexture(globalState.productUploadImage);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.cup_double_12oz.geometry}
        material={materials.generic_cup_material}
        material-color={globalState.productColor}
      />
      <mesh
        geometry={nodes.cup_double_12oz_1.geometry}
        material={materials.generic_lid_material}
      />
      <mesh
        geometry={nodes.cup_double_12oz_2.geometry}
        material={materials.generic_doublewall_material}
        material-color={globalState.productColor}
      >
        <group position={[0, 0.062, 0.04]}>
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
              setXYZ([position.x, position.y + 0.064, 0]);
              setScl([0.056 * scale.y, 0.056 * scale.y, 0.056 * scale.z]);
            }}
          />
        </group>
        <Suspense fallback={null}>
          <Decal
            // debug
            position={[pos[0], pos[1], 0.024]}
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
              position={[pos[0], pos[1], -0.024]}
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
      </mesh>
    </group>
  );
}

useGLTF.preload("/product-design/models/double/12oz.glb");
