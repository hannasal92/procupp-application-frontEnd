import { useTranslations } from "next-intl";
import s from "./checkout.module.scss";

type Props = {
  step: number;
};

const Header: React.FC<Props> = ({ step }) => {
  const t = useTranslations("Checkout.Header");

  return (
    <div className={s.header}>
      <div data-active={step >= 0} className={s.header_box}>
        <div>
          <h4>{t("StepOne")}</h4>
          <h3>{t("Address")}</h3>
        </div>
      </div>
      <div className={s.header_line} />
      <div data-active={step >= 1} className={s.header_box}>
        <div>
          <h4>{t("StepTwo")}</h4>
          <h3>{t("Shipping")}</h3>
        </div>
      </div>
      <div className={s.header_line} />
      <div data-active={step >= 2} className={s.header_box}>
        <div>
          <h4>{t("StepThree")}</h4>
          <h3>{t("Payment")}</h3>
        </div>
      </div>
    </div>
  );
};

export default Header;
