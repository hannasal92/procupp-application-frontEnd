import React, { useState } from "react";
import dynamic from 'next/dynamic';
const PinturaEditor = dynamic(() => import('@pqina/react-pintura').then(mod => mod.PinturaEditor), { ssr: false });

// react-pintura

// pintura
import "@pqina/pintura/pintura.css";
import { getEditorDefaults } from "@pqina/pintura";

// get default properties
const editorDefaults = getEditorDefaults({
  stickers: ["😎", "sticker-one.svg", "sticker-two.svg", "sticker-three.svg"],
});

export default function Example({handleUpload}) {
  // inline result
  // const [result, setResult] = useState("");
  
  return (
    <div>

      <div style={{ height: "70vh" }}>
        <PinturaEditor
          {...editorDefaults}
          src={"./blank_image.jpg"}
          imageCropAspectRatio={1}
          // onLoad={(res) => console.log("load image", res)}
          onProcess={({ dest }) => handleUpload(dest, true)}
        />
      </div>
    </div>
  );
}
