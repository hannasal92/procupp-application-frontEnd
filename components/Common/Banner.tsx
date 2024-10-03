import s from "./common.module.scss";

type Props = {
  heading: string;
  paragraph?: string;
};

const Banner: React.FC<Props> = ({ heading, paragraph }) => {
  return (
    <div className={s.banner}>
      <div className={s.banner_cover}>
        <div className={s.banner_content}>
          <h2>{heading}</h2>
          {paragraph && <p>{paragraph}</p>}
        </div>
      </div>
    </div>
  );
};

export default Banner;
