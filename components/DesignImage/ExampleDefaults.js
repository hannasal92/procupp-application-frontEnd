import React, { useState } from "react";
import dynamic from 'next/dynamic';
const PinturaEditor = dynamic(() => import('@pqina/react-pintura').then(mod => mod.PinturaEditor), { ssr: false });

// react-pintura

// pintura
import "@pqina/pintura/pintura.css";
import { getEditorDefaults } from "@pqina/pintura";

// get default properties
const editorDefaults = getEditorDefaults({
    utils: [
    'filter',    // Image filters (brightness, contrast, etc.)
    "finetune",
    'annotate',  // Drawing, annotations
    "decorate",
    'sticker',  // Add stickers or emojis
    'adjust',    // Adjust settings like exposure, temperature
    'frame',     // Add frames around the image

  ],
  stickers: ["😎", "sticker-one.svg", "sticker-two.svg", "sticker-three.svg"],
});

export default function Example({handleUpload, imageData}) {

  let {src, label} = imageData ;
  src = './'+src;
  return (
    <div>
      <div style={{ height: "70vh" }}>
        <PinturaEditor
          {...editorDefaults}
          src={src}
          // onLoad={(res) => console.log("load image", res)}
          onProcess={({ dest }) => handleUpload(dest, true)}
        />
      </div>
    </div>
  );
}
