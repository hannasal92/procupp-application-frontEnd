import { useCart } from "react-use-cart";
import Card from "./Card";
import s from "./cart.module.scss";
import React from "react";
import { useTranslations } from "next-intl";

const Grid = () => {
  const t = useTranslations("Cart");
  const { items } = useCart();

  return (
    <div className={s.grid}>
      <h1>{t("Shopping-Cart")}</h1>
      {items.map((e, i) => {
        return (
          <React.Fragment key={i}>
            <Card
              heading={e.name}
              id={e.id}
              price={e.price}
              imgUrl={e.imgUrl}
              quantity={e.quantity}
              imgAlt="product-image"
            />
            <hr />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Grid;
