import Link from "next/link";
import s from "./form.module.scss";
import Button from "@/components/Common/Button";
import { Arrow } from "@/components/Header/Icons";
import { Google } from "./Icons";
import { useFormik } from "formik";
import { setCookie } from "cookies-next";
import { store } from "@/store";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslations } from "next-intl";

const Login = () => {
  const t = useTranslations("Login");
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        // let response: Login = await client.request(LOGIN_USER, { ...values });

        let response = await axios.post(
          `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER}/api/users/login`,
          { ...values }
        );

        setCookie("payload-token", response.data.token);
        store.user = response.data.user;
        formik.resetForm();
        toast.success("Login Successfully", { theme: "dark" });

        push("/");
      } catch (error) {
        toast.error("Something is wrong!!", { theme: "dark" });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={s.form}>
      <div className={s.form_box}>
        <input
          name="email"
          type="email"
          placeholder={t("Inputs.Email")}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder={t("Inputs.Password")}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <p>
          {t("Buttons.Forgot")}{" "}
          <Link href="/forgot-password">{t("Buttons.Click")}</Link>
        </p>
      </div>
      <Button type="submit">
        {t("Buttons.Login")} <Arrow />
      </Button>
      <Button
        onClick={() =>
          push(`${process.env.NEXT_PUBLIC_PAYLOAD_SERVER}/oauth2/authorize`)
        }
        type="button"
        varients="secondary"
      >
        <span>
          <Google />
        </span>{" "}
        {t("Buttons.Login-Google")} <Arrow />
      </Button>
    </form>
  );
};

export default Login;
