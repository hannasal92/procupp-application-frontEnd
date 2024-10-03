import s from "./profile.module.scss";
import Input from "./Input";
import Button from "../Common/Button";
import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/lib/styles.scss";
import { useTranslations } from "next-intl";
import { Arrow } from "../Header/Icons";

type CardInfo = {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  focus: "number" | "name" | "expiry" | "cvc" | "";
};

type Props = {
  isForPayment?: boolean;
  handleSecondaryButton?: () => void;
  handlePrimaryButton?: () => void;
  setExternalCardDetail?: React.Dispatch<React.SetStateAction<CardInfo>>;
};

const Payments: React.FC<Props> = ({
  isForPayment = false,
  handlePrimaryButton,
  handleSecondaryButton,
  setExternalCardDetail,
}) => {
  const t = useTranslations("Profile.Payment");
  const tc = useTranslations("Checkout.Payment");
  const tb = useTranslations("Profile.Buttons");
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  //fomatting
  const formatCardNumber = (number: string): string => {
    const cleanedNumber = number.replace(/\D+/g, "");
    return cleanedNumber.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const formatCvc = (cvc: string) => {
    return cvc.replace(/\D/g, "").slice(0, 4);
  };

  const formatExpiryDate = (expiry: string) => {
    const expiryWithoutSlash = expiry.replace(/\D/g, "");
    if (expiryWithoutSlash.length >= 3) {
      return `${expiryWithoutSlash.slice(0, 2)}/${expiryWithoutSlash.slice(
        2,
        4
      )}`;
    }
    return expiryWithoutSlash;
  };

  //handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "number") {
      // if (!validateCardNumber(value)) {
      //   // Handle invalid card number case
      // }

      formattedValue = formatCardNumber(value);
    }
    if (name === "cvc") {
      formattedValue = formatCvc(value);
    }
    if (name === "expiry") {
      formattedValue = formatExpiryDate(value);
    }

    setCardInfo({ ...cardInfo, [name]: formattedValue });
    if (setExternalCardDetail) {
      setExternalCardDetail({ ...cardInfo, [name]: formattedValue });
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setCardInfo((prev) => ({
      ...prev,
      focus: e.target.name as CardInfo["focus"],
    }));
  };

  return (
    <>
      <div className={s.card}>
        <Cards
          number={cardInfo.number}
          name={cardInfo.name}
          expiry={cardInfo.expiry}
          cvc={cardInfo.cvc}
          focused={cardInfo.focus}
        />
      </div>
      <div className={s.paymentForm}>
        <Input
          onChange={handleInputChange}
          onFocus={handleFocus}
          value={cardInfo.name}
          id="payment-cardholder"
          type="text"
          name="name"
          placeholder={t("Inputs.Name")}
        />

        <Input
          onChange={handleInputChange}
          onFocus={handleFocus}
          value={cardInfo.number}
          type="tel"
          name="number"
          placeholder={t("Inputs.Number")}
          maxLength={19}
        />
        <div className={s.paymentForm_box}>
          <Input
            onChange={handleInputChange}
            onFocus={handleFocus}
            value={cardInfo.expiry}
            id="payment-exp"
            type="tel"
            name="expiry"
            placeholder={t("Inputs.Exp")}
          />
          <Input
            onChange={handleInputChange}
            onFocus={handleFocus}
            value={cardInfo.cvc}
            id="payment-cvv"
            type="tel"
            name="cvc"
            placeholder={t("Inputs.Cvv")}
          />
        </div>
        {isForPayment && (
          <div className={s.checkbox}>
            <input type="checkbox" id="react-checkbox-privacy" />
            <div className={s.checkbox_circle}>
              <div />
            </div>
            <label htmlFor="react-checkbox-privacy">
              {tc("Buttons.Same-Billing-Address")}
            </label>
          </div>
        )}
        <div className={s.detailButtonGroup}>
          <Button onClick={handleSecondaryButton} varients="secondary">
            {tb("Back")}
          </Button>
          {isForPayment ? (
            <Button onClick={handlePrimaryButton}>
              {tc("Buttons.Pay")}
              <Arrow />
            </Button>
          ) : (
            <Button onClick={handlePrimaryButton}>{tb("Save")}</Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Payments;
