import { store } from "@/store";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import axios from "axios";
import { useEffect, useRef } from "react";
import { PerspectiveCamera as PC, Vector3 } from "three";
import { OrbitControls as OC } from "three-stdlib";

const SaveCanvas = ({
  orbitEnabled,
  orbitFollow,
}: {
  orbitEnabled: boolean;
  orbitFollow: React.RefObject<OC>;
}) => {
  const gl = useThree((state) => state.gl);
  const camera = useRef<PC>(null);
  // const orbit = useRef<OC>(null);

  const dataURLtoFile = (dataurl: string, filename: string) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)![1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const createDelay = () => {
    return new Promise((resolve, reject) => {
      orbitFollow.current!.reset();
      setTimeout(() => {
        resolve("done");
      }, 500);
    });
  };

  store.handleSaveCanvas = async () => {
    try {
      store.isOrbitControl = true;
      await createDelay();
      let file = dataURLtoFile(gl.domElement.toDataURL("image/png"), "cup.png");
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("alt", "order-product-img");
      let uploadImage = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER!}/api/media`,
        data: formdata,
      });

      return { url: uploadImage.data.doc.url, id: uploadImage.data.doc.id };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PerspectiveCamera
        ref={camera}
        makeDefault
        position={[0, 0.5, 6]}
        fov={35}
      />
      <OrbitControls
        ref={orbitFollow}
        enabled={orbitEnabled}
        target0={new Vector3(0, 1.2, 0)}
        target={[0, 1.2, 0]}
      />
    </>
  );
};

export default SaveCanvas;
