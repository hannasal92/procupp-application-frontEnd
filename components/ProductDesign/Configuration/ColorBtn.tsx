import s from "./config.module.scss";
import { Circle } from "../Icons";
import { useEffect, useState } from "react";
import { store } from "@/store";
import { useSnapshot } from "valtio";

const ColorBtn = () => {
  const [color, setColor] = useState("#ffffff");
  const [isActive, setIsActive] = useState<boolean>(false);
  const { selectedProduct } = useSnapshot(store);

  useEffect(() => {
    store.productColor = color;
  }, [color]);

  const handleColor = (color: string) => {
    setIsActive(false);
    setColor(color);
  };

  return (
    <div className={s.btnCover}>
      <button
        disabled={!(selectedProduct.slice(0, 5) === "paper")}
        onClick={() => setIsActive((prev) => !prev)}
      >
        <Circle hexcode={color} /> <span>CHOOSE COLORS</span>
      </button>
      <div data-active={isActive} className={s.colorful}>
        <button onClick={() => handleColor("#000000")} className={s.colorBox}>
          <Circle hexcode={"#000000"} /> <span>Black</span>
        </button>
        <button onClick={() => handleColor("#ffffff")} className={s.colorBox}>
          <Circle hexcode={"#ffffff"} /> <span>White</span>
        </button>
      </div>
    </div>
  );
};

export default ColorBtn;
