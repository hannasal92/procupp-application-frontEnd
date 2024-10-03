import { useEffect, useRef, useState } from "react";
import Card from "../Cart/Card";
import Button from "../Common/Button";
import Timeline from "./Timeline";
import s from "./order.module.scss";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

type Props = {
  orderId: string;
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    productImage: {
      url: string;
    };
  }[];
  address: string;
  timelineStep: 0 | 1 | 2 | 3 | 4 | 5;
  discount: number;
  delivery: number;
  tax: number;
  total: number;
  createdAt: string;
  deliveryDate: string;
  outOfDeliveryDate: string;
  shippedDate: string;
};

const OrderCard: React.FC<Props> = ({
  orderId,
  products,
  address,
  timelineStep,
  delivery,
  discount,
  tax,
  total,
  createdAt,
  deliveryDate,
  outOfDeliveryDate,
  shippedDate,
}) => {
  const t = useTranslations("Order-Card");
  const [height, setHeight] = useState<number>(0);

  const [isMoreView, setIsMoreView] = useState<boolean>(false);

  const main = useRef<HTMLDivElement>(null);

  const handleMoreView = () => {
    setIsMoreView(true);
  };

  useEffect(() => {
    if (timelineStep === 3) {
      if (isMoreView) {
        setHeight(main.current!.scrollHeight);
      } else {
        if (innerWidth < 600) {
          setHeight(526);
        } else {
          setHeight(418);
        }
      }
    } else {
      if (isMoreView) {
        setHeight(main.current!.scrollHeight);
      } else {
        if (innerWidth < 600) {
          setHeight(446);
        } else {
          setHeight(338);
        }
      }
    }
  }, [isMoreView, timelineStep]);

  return (
    <div ref={main} style={{ height }} className={s.main}>
      <div className={s.head}>
        <h1>
          {t("Order-ID")} <span>{orderId}</span>
        </h1>
        <div className={s.head_box}>
          <button data-outline>{t("Buttons.Invoice")}</button>
          <button>{t("Buttons.Track-Order")}</button>
        </div>
      </div>
      <div className={s.date}>
        <h3>
          {t("Order-Date")}
          <br /> <span>{format(createdAt, "MMM dd, yyy")}</span>
        </h3>
        <hr />
        <h3>
          {t("Estimated-Delivery")}
          <br />{" "}
          <span>
            {deliveryDate
              ? format(deliveryDate, "MMM dd, yyy")
              : timelineStep === 4
              ? t("Order-Cancel")
              : timelineStep === 5
              ? t("Order-Refund")
              : t("Show-After-Shipped")}
          </span>
        </h3>
      </div>
      <Timeline
        createdAt={createdAt}
        deliveryDate={deliveryDate}
        outOfDeliveryDate={outOfDeliveryDate}
        shippedDate={shippedDate}
        step={timelineStep <= 3 ? (timelineStep as 0 | 1 | 2 | 3) : 0}
      />
      {!isMoreView && (
        <>
          <Button onClick={handleMoreView} varients="secondary">
            {t("Buttons.Click")}
          </Button>
          {timelineStep === 3 && (
            <Button varients="black">{t("Buttons.Order-Again")}</Button>
          )}
        </>
      )}
      <div className={s.grid}>
        {products.map((e, i) => {
          return (
            <Card
              key={i}
              heading={e.name}
              id={e.id}
              price={e.price}
              imgUrl={`${process.env.NEXT_PUBLIC_PAYLOAD_SERVER}${e.productImage.url}`}
              imgAlt="product-image"
              quantity={e.quantity}
              isNotCancel
            />
          );
        })}
      </div>
      <div className={s.detail}>
        <div className={s.detail_box}>
          <h3>{t("Details.Payment")}</h3>
          <h4>Visa **56</h4>
        </div>
        <div className={s.detail_box}>
          <h3>{t("Details.Delivery")}</h3>
          <h4>{t("Details.Address")}</h4>
          <p>{address}</p>
        </div>
      </div>
      <div className={s.summary}>
        <h3>{t("Details.Order-Summary")}</h3>
        <div className={s.summary_box}>
          <h4>{t("Details.Discount")}</h4>
          <h4>${discount}</h4>
        </div>
        <div className={s.summary_box}>
          <h4>{t("Details.Delivery")}</h4>
          <h4>${delivery}</h4>
        </div>
        <div className={s.summary_box}>
          <h4>{t("Details.Tax")}</h4>
          <h4>${tax}</h4>
        </div>
        <div className={s.summary_total}>
          <h2 data-light>{t("Details.Total")}</h2>
          <h2>${total}</h2>
        </div>
      </div>
      {timelineStep === 3 && (
        <Button varients="black">{t("Buttons.Order-Again")}</Button>
      )}
    </div>
  );
};

export default OrderCard;
