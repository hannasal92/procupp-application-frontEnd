import PaymentCard from "./PaymentCard";
import PaymentSummary from "./PaymentSummary";
import s from "./checkout.module.scss";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  shipping:
    | {
        price: number;
        title: string;
        date: string;
      }
    | undefined;
};

const Payment: React.FC<Props> = ({ setStep, shipping }) => {
  return (
    <div className={s.payment}>
      <PaymentSummary shipping={shipping} />
      <PaymentCard setStep={setStep} shipping={shipping} />
    </div>
  );
};

export default Payment;
