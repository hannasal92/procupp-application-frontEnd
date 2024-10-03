import { useCart } from "react-use-cart";
import Button from "../Common/Button";
import { Arrow } from "../Header/Icons";
import s from "./cart.module.scss";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useSnapshot } from "valtio";
import { store } from "@/store";

const Bill = () => {
  const { user } = useSnapshot(store);
  const t = useTranslations("Cart");
  const { push } = useRouter();

  const { cartTotal, isEmpty } = useCart();

  const handleClick = () => {
    if (user) {
      if (isEmpty) {
        toast.error("Cart is empty...!", { theme: "dark" });
      } else {
        push("/checkout");
      }
    } else {
      push("/login");
    }
  };

  return (
    <div className={s.bill}>
      <h1>{t("Order-Summary")}</h1>
      <div className={s.billCover}>
        <div className={s.input}>
          <label htmlFor="bill-discount">{t("Input-Labels.Code")}</label>
          <div className={s.input_box}>
            <input
              placeholder={t("Inputs.Code")}
              type="text"
              id="bill-discount"
            />
          </div>
        </div>
        <div className={s.input}>
          <label htmlFor="bill-bonus-card">
            {t("Input-Labels.Bonus-Card")}
          </label>
          <div className={s.input_box}>
            <input
              placeholder={t("Inputs.Bonus-Card")}
              type="text"
              id="bill-bonus-card"
            />
            <button>{t("Buttons.Apply")}</button>
          </div>
        </div>

        <div className={s.detail}>
          <div className={s.detail_tag}>
            <h3>{t("Subtotal")}</h3>
            <p>${cartTotal}</p>
          </div>
          <div className={s.detail_box}>
            <div className={s.detail_tag}>
              <h3 data-light>{t("Estimated-Tax")}</h3>
              <p>$0</p>
            </div>
            <div className={s.detail_tag}>
              <h3 data-light>{t("Estimated-Shipped")}</h3>
              <p>$0</p>
            </div>
          </div>
          <div className={s.detail_tag}>
            <h3>{t("Total")}</h3>
            <p>${cartTotal}</p>
          </div>
          <Button onClick={handleClick}>
            {t("Buttons.Checkout")} <Arrow />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Bill;
