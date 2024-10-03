import { useState } from "react";
import ShippingCard from "./ShippingCard";
import s from "./checkout.module.scss";
import { useTranslations } from "next-intl";

type Props = {
  setShipping: React.Dispatch<
    React.SetStateAction<
      | {
          price: number;
          title: string;
          date: string;
        }
      | undefined
    >
  >;
};

const Shipping: React.FC<Props> = ({ setShipping }) => {
  const t = useTranslations("Checkout.Shipping");
  const [activeId, setActiveId] = useState<number | string>(-1);

  const handleClick = (
    id: number | string,
    data: {
      price: number;
      title: string;
      date: string;
    }
  ) => {
    setShipping(data);
    setActiveId(id);
  };

  return (
    <div className={s.shipping}>
      <h1>{t("Heading")}</h1>
      <div className={s.shipping_grid}>
        {[
          { price: 0, title: `${t("Options.0")}` },
          { price: 8.5, title: `${t("Options.1")}` },
        ].map((e, i) => {
          return (
            <ShippingCard
              id={i}
              activeId={activeId}
              onClick={handleClick}
              key={i}
              price={e.price}
              title={e.title}
              date="17 Oct, 2023"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Shipping;
