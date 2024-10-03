import Image from "next/image";
import s from "./checkout.module.scss";
import { useCart } from "react-use-cart";
import { useSnapshot } from "valtio";
import { store } from "@/store";
import { useTranslations } from "next-intl";

type Props = {
  shipping:
    | {
        price: number;
        title: string;
        date: string;
      }
    | undefined;
};

const PaymentSummary: React.FC<Props> = ({ shipping }) => {
  const t = useTranslations("Checkout.Payment");
  const { selectedAddress } = useSnapshot(store);
  const { items, cartTotal } = useCart();

  return (
    <div className={s.paymentSummary}>
      <h1>{t("Summary")}</h1>
      <div className={s.paymentSummary_grid}>
        {items.map((e, i) => {
          return (
            <div key={i} className={s.paymentSummary_card}>
              <div className={s.paymentSummary_card_cover}>
                <Image
                  src={e.imgUrl}
                  height={300}
                  width={300}
                  alt="product-img"
                  unoptimized={true}
                />
                <h3>{e.name}</h3>
              </div>
              <h2>{e.price}$</h2>
            </div>
          );
        })}
      </div>
      <div className={s.paymentSummary_detail}>
        <div className={s.paymentSummary_info}>
          <h3>{t("Address")}</h3>
          <p>{selectedAddress?.address}</p>
        </div>
        <div className={s.paymentSummary_info}>
          <h3>{t("Shipping-Method")}</h3>
          <p>{shipping?.title}</p>
        </div>
      </div>
      <div className={s.paymentSummary_priceBox}>
        <h3>{t("Subtotal")}</h3>
        <p>${cartTotal}</p>
      </div>
      <div className={s.paymentSummary_box}>
        <div className={s.paymentSummary_priceBox}>
          <h3 data-light>{t("Estimated-Tax")}</h3>
          <p>$0</p>
        </div>
        <div className={s.paymentSummary_priceBox}>
          <h3 data-light>{t("Estimated-Shipped")}</h3>
          <p>${shipping?.price ? shipping.price : 0}</p>
        </div>
      </div>
      <div className={s.paymentSummary_priceBox}>
        <h3>{t("Total")}</h3>
        <p>${shipping ? cartTotal + shipping.price : cartTotal}</p>
      </div>
    </div>
  );
};

export default PaymentSummary;
