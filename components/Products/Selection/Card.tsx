import Image from "next/image";
import s from "./selection.module.scss";

type Props = {
  imageUrl: string;
  heading: string;
  btnClick: () => void;
};

const Card: React.FC<Props> = ({ heading, imageUrl, btnClick }) => {
  return (
    <div className={s.card}>
      <div className={s.card_cover}>
        <Image
          className={s.card_img}
          src={imageUrl}
          alt="selection-cups"
          height={1000}
          width={1000}
        />
      </div>
      <h3>{heading}</h3>
      <button onClick={btnClick}>Purchase</button>
    </div>
  );
};

export default Card;
