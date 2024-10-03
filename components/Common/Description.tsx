import Image from "next/image";
import s from "./common.module.scss";

type Props = {
  imgSrc: string;
  alt: string;
  children: React.ReactNode;
};

const Description: React.FC<Props> = ({ alt, children, imgSrc }) => {
  return (
    <div className={s.description}>
      <div className={s.description_block} />
      <Image
        className={s.description_img}
        src={imgSrc}
        height={750}
        width={1150}
        alt={alt}
      />
      <div className={s.description_content}>{children}</div>
    </div>
  );
};

export default Description;
