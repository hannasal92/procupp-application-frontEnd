import Image from "next/image";
import { data } from "./data";
import s from "./form.module.scss";
import Button from "@/components/Common/Button";
import { Arrow } from "@/components/Header/Icons";
import { toast } from "react-toastify";
import axios from "axios";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { getLangDir } from "rtl-detect";

const Form = () => {
  const { locale } = useRouter();
  const t = useTranslations("Contact");
  const direction = getLangDir(locale!);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      message: "",
    },
    onSubmit: async (values) => {
      try {
        let response = await axios.post(
          `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER}/api/messages`,
          { ...values }
        );
        formik.resetForm();
        toast.success(`Message Send`, { theme: "dark" });
      } catch (error) {
        toast.error("Something is wrong!!", { theme: "dark" });
      }
    },
  });

  return (
    <section className={s.main}>
      <div className={s.head}>
        <h1>{t("Heading")}</h1>
        <p>{t("Paragraph")}</p>
      </div>
      <div className={s.body}>
        <div className={s.body_grid}>
          {data.map(({ iconSrc, title }, i) => {
            return (
              <div data-merge={i === 2} key={i} className={s.body_grid_card}>
                <div className={s.body_grid_card_icon}>
                  <Image src={iconSrc} alt="icon" height={25} width={25} />
                </div>
                <p>{t(`Cards.${i}.value`)}</p>
              </div>
            );
          })}
        </div>
        <form onSubmit={formik.handleSubmit} className={s.form}>
          <input
            required
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            type="text"
            placeholder={t("Inputs.Name")}
          />
          <input
            required
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            placeholder={t("Inputs.Email")}
          />
          <input
            required
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            type="number"
            placeholder={t("Inputs.Number")}
          />
          <input
            required
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            type="city"
            placeholder={t("Inputs.City")}
          />
          <textarea
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            placeholder={t("Inputs.Message")}
            rows={8}
          />
          <Button dir={direction} type="submit">
            {t("Submit-Button")} <Arrow />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Form;
