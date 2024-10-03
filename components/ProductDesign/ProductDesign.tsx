import { useRef } from "react";
import Configuration from "./Configuration/Configuration";
import Render from "./Render/Render";
import s from "./design.module.scss";
import { OrbitControls as OC } from "three-stdlib";

const ProductDesign = () => {
  const orbitFollow = useRef<OC>(null);

  return (
    <section className={s.main}>
      <Configuration orbitFollow={orbitFollow} />
      <Render orbitFollow={orbitFollow} />
    </section>
  );
};

export default ProductDesign;
