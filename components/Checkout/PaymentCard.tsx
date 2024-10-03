import { client } from "@/client";
import s from "./checkout.module.scss";
import { CREATE_ORDER } from "@/query";
import { useSnapshot } from "valtio";
import { store } from "@/store";
import { useCart } from "react-use-cart";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Payments from "../Profile/Payments";
import { useState } from "react";
import axios from "axios";

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

type CardInfo = {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  focus: "number" | "name" | "expiry" | "cvc" | "";
};

const PaymentCard: React.FC<Props> = ({ setStep, shipping }) => {
  const [cardDetail, setCardDetail] = useState<CardInfo>({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const t = useTranslations("Checkout.Payment");
  const { cartTotal, totalItems, items, emptyCart } = useCart();
  const { user, selectedAddress } = useSnapshot(store);
  const { push } = useRouter();

  const handlePlaceOrder = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER}/api/orders/payment`,
        { status: "working", ...cardDetail } // here you can pass anything so you can get on backend req.body
      );

      await client.request(CREATE_ORDER, {
        data: {
          orderBy: {
            value: user?.id,
            relationTo: user?.sub ? "googleUsers" : "users",
          },
          address: selectedAddress?.address,
          phone: selectedAddress?.number,
          discount: 0,
          delivery: shipping?.price,
          tax: 0,
          total: cartTotal,
          cart: items.map((e) => {
            return {
              productImage: e.imgId,
              sourceImage: e.sourceImgId,
              name: e.name,
              price: e.price,
              quantity: e.quantity,
              printOnBothSide: e.printOnBothSide,
            };
          }),
        },
      });
      push("/");
      emptyCart();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handlePlaceOrderWithToast = () => {
    if (
      cardDetail.name !== "" &&
      cardDetail.cvc !== "" &&
      cardDetail.expiry !== "" &&
      cardDetail.number !== ""
    ) {
      toast.promise(
        handlePlaceOrder,
        {
          pending: "Processing... 😊",
          success: "Order Placed",
          error: "Order Failed",
        },
        { theme: "dark" }
      );
    } else {
      toast.error("Please Fill Card Detail", { theme: "dark" });
    }
  };

  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <div className={s.paymentCard}>
      <h1>{t("Payment")}</h1>
      <Payments
        isForPayment
        handlePrimaryButton={handlePlaceOrderWithToast}
        handleSecondaryButton={handleBack}
        setExternalCardDetail={setCardDetail}
      />
    </div>
  );
};

export default PaymentCard;
