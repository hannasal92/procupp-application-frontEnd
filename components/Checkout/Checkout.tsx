import { useState } from "react";
import Header from "./Header";
import s from "./checkout.module.scss";
import Address from "./Address";
import Button from "../Common/Button";
import { Arrow } from "../Header/Icons";
import Shipping from "./Shipping";
import Payment from "./Payment";
import { useSnapshot } from "valtio";
import { store } from "@/store";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const Checkout = () => {
  const t = useTranslations("Checkout.Buttons");
  const { selectedAddress } = useSnapshot(store);

  const [step, setStep] = useState<number>(0);

  const [shipping, setShipping] = useState<{
    price: number;
    title: string;
    date: string;
  }>();

  const handleNext = () => {
    if (selectedAddress) {
      setStep(1);
      if (shipping) {
        setStep(2);
      } else {
        step >= 1 &&
          toast.error("Please select shipping method", { theme: "dark" });
      }
    } else {
      toast.error("Please select address", { theme: "dark" });
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className={s.main}>
      <Header step={step} />
      {step === 0 ? (
        <Address />
      ) : step === 1 ? (
        <Shipping setShipping={setShipping} />
      ) : (
        <Payment shipping={shipping} setStep={setStep} />
      )}
      {step <= 1 && (
        <div className={s.main_control}>
          {step >= 1 && (
            <Button onClick={handleBack} varients="secondary">
              {t("Back")}
            </Button>
          )}
          <Button onClick={handleNext}>
            {t("Next")} <Arrow />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
