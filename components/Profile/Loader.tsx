import s from "./profile.module.scss";

const Loader = () => {
  return (
    <div className={s.loading}>
      <div className={s.loadingSquare}></div>
      <div className={s.loadingSquare}></div>
      <div className={s.loadingSquare}></div>
      <div className={s.loadingSquare}></div>
      <div className={s.loadingSquare}></div>
      <div className={s.loadingSquare}></div>
      <div className={s.loadingSquare}></div>
    </div>
  );
};

export default Loader;
