import { format } from "date-fns";
import s from "./order.module.scss";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { getLangDir } from "rtl-detect";

type Props = {
  step: 0 | 1 | 2 | 3;
  createdAt: string;
  deliveryDate: string;
  outOfDeliveryDate: string;
  shippedDate: string;
};

const Timeline: React.FC<Props> = ({
  step,
  createdAt,
  deliveryDate,
  outOfDeliveryDate,
  shippedDate,
}) => {
  const { locale } = useRouter();
  const direction = getLangDir(locale!);
  const t = useTranslations("Order-Card.Timeline");

  return (
    <div className={s.timeline}>
      <div className={s.timeline_box}>
        <h4 data-active={step >= 0}>{t("Order-Confirm")}</h4>
        <div data-active={step >= 0} className={s.timeline_circle} />
        <div
          data-active={step >= 1}
          style={
            direction === "rtl"
              ? { right: "71%", transform: "scaleX(1.26)" }
              : { left: "65%", transform: "scaleX(1.17)" }
          }
          className={s.timeline_line}
        />
        <p>{format(createdAt, "iii, dd MMM")}</p>
      </div>
      <div className={s.timeline_box}>
        <h4 data-active={step >= 1}>{t("Shipped")}</h4>
        <div data-active={step >= 1} className={s.timeline_circle} />
        <div
          data-active={step >= 2}
          style={
            direction === "rtl"
              ? { right: "90%", transform: "scaleX(1.59)" }
              : { left: "90%", transform: "scaleX(1.59)" }
          }
          className={s.timeline_line}
        />
        <p>
          {shippedDate ? format(shippedDate, "iii, dd MMM") : t("Processing")}
        </p>
      </div>
      <div className={s.timeline_box}>
        <h4 data-active={step >= 2}>{t("Out-of-Delivery")}</h4>
        <div data-active={step >= 2} className={s.timeline_circle} />
        <div
          data-active={step >= 3}
          style={
            direction === "rtl"
              ? { right: "82%", transform: "scaleX(1.5)" }
              : { left: "82%", transform: "scaleX(1.5)" }
          }
          className={s.timeline_line}
        />
        <p>
          {outOfDeliveryDate
            ? format(outOfDeliveryDate, "iii, dd MMM")
            : t("Processing")}
        </p>
      </div>
      <div className={s.timeline_box}>
        <h4 data-active={step >= 3}>{t("Delivered")}</h4>
        <div data-active={step >= 3} className={s.timeline_circle} />
        <p>
          {deliveryDate
            ? `Expected by, ${format(deliveryDate, "dd MMM")}`
            : t("Processing")}
        </p>
      </div>
    </div>
  );
};

export default Timeline;
