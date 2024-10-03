import { useRouter } from "next/router";
import Forget from "./Forget";
import s from "./form.module.scss";
import Login from "./Login";
import Reset from "./Reset";
import SignUp from "./SignUp";
import { getLangDir } from "rtl-detect";

type Props = {
  heading: string;
  description: string;
  type: "login" | "register" | "reset" | "forgot";
};

const Form: React.FC<Props> = ({ description, heading, type }) => {
  const { locale } = useRouter();

  const direction = getLangDir(locale!);

  return (
    <section dir={direction} className={s.main}>
      <div className={s.container}>
        <div className={s.box}>
          <div className={s.box_head}>
            <h2>{heading}</h2>
            <p>{description}</p>
          </div>
        </div>
        {type === "login" ? (
          <Login />
        ) : type === "reset" ? (
          <Reset />
        ) : type === "forgot" ? (
          <Forget />
        ) : (
          <SignUp />
        )}
      </div>
    </section>
  );
};

export default Form;
