import Button from "@/components/Common/Button";
import s from "./form.module.scss";
import { Arrow } from "@/components/Header/Icons";
import { Google } from "./Icons";
import Link from "next/link";
import { useFormik } from "formik";
import { client } from "@/client";
import { CREATE_USER } from "@/query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const SignUp = () => {
  const t = useTranslations("Signup");
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeprivacy: "",
      agreeterms: "",
    },
    onSubmit: async (values) => {
      try {
        if (values.password === values.confirmPassword) {
          if (
            values.agreeprivacy[0] === "agree" &&
            values.agreeterms[0] === "agree"
          ) {
            let response: {
              createUser: { email: string; id: string; name: string };
            } = await client.request(CREATE_USER, {
              data: {
                name: values.name,
                email: values.email,
                password: values.password,
              },
            });
            formik.resetForm();
            toast.success("Send Email Verification", { theme: "dark" });
          } else {
            toast.error(
              "Please agree with privacy policy, teams and condtion.",
              { theme: "dark" }
            );
          }
        } else {
          toast.error("Password not match..!", { theme: "dark" });
        }
      } catch (error) {
        toast.error("Something is wrong..!!", { theme: "dark" });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={s.form}>
      <div className={s.form_box}>
        <input
          onChange={formik.handleChange}
          value={formik.values.name}
          name="name"
          type="text"
          placeholder={t("Inputs.Name")}
        />
        <input
          onChange={formik.handleChange}
          value={formik.values.email}
          name="email"
          type="email"
          placeholder={t("Inputs.Email")}
        />
        <input
          onChange={formik.handleChange}
          value={formik.values.password}
          name="password"
          type="password"
          placeholder={t("Inputs.Password")}
        />
        <input
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          name="confirmPassword"
          type="password"
          placeholder={t("Inputs.Confirm-Password")}
        />
        <p>
          {t("Buttons.Already")} <Link href="/login">{t("Buttons.Login")}</Link>
        </p>
      </div>
      <div className={s.choice}>
        <div className={s.checkbox}>
          <input
            onChange={formik.handleChange}
            name="agreeprivacy"
            value="agree"
            type="checkbox"
            id="react-checkbox-privacy"
          />
          <div className={s.checkbox_circle}>
            <div />
          </div>
          <label htmlFor="react-checkbox-privacy">{t("Radios.RadioOne")}</label>
        </div>
        <div className={s.checkbox}>
          <input
            onChange={formik.handleChange}
            name="agreeterms"
            value="agree"
            type="checkbox"
            id="react-checkbox-terms"
          />
          <div className={s.checkbox_circle}>
            <div />
          </div>
          <label htmlFor="react-checkbox-terms">{t("Radios.RadioTwo")}</label>
        </div>
      </div>
      <Button type="submit">
        {t("Buttons.Signup")} <Arrow />
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
        {t("Buttons.Signup-Google")} <Arrow />
      </Button>
    </form>
  );
};

export default SignUp;
