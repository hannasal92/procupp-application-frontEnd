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
import forge from 'node-forge';

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

const encryptData = (data : CardInfo) => {
  const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1V0adlzsoVYYs4CbEdvk
y9U3rwoZjz6YV4/P9fVdStyP7CNOGRKHp786dtOyzKVv4HxTxnlTmeLf/3wmK97L
0QXIXreBVT5KH6ev+rE3Sfse7yWeRT5x3zAncghiFDhjWPs19smmBpwKzPPnCMmg
yKcC/48wncEFzmDCPpuLJSlvGhBVOS13TfgFLTVm1XjKcLzEC5zS3WBwz/jgcZ1/
cWi7B9RqdSbjqhxUiBGLzXrmGkByrOGJfK+XHOwVymzbjNpA2RcfZ1XKDmDLQQl8
l1qq4zf9u5gfcS4QfQn7nhSvq2/hcdT6oi18V0JD31Nxbgw2jqLTF/wjE02MHKHY
9wIDAQAB
-----END PUBLIC KEY-----`
  if (!publicKey) return;

  // Convert public key PEM to forge public key object
  const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);

  // Encrypt the data (credit card details) using RSA-OAEP
  const encrypted = publicKeyObj.encrypt(JSON.stringify(data), 'RSA-OAEP', {
    md: forge.md.sha256.create(),
  });
  console.log(encrypted)

  // Encode the encrypted data in base64
  return forge.util.encode64(encrypted);
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
      const cardDetailsEncrypted = JSON.stringify({ encryptedData: encryptData(cardDetail) });
      const data = {
        user: user,
        address: selectedAddress?.address,
        phone: selectedAddress?.number,
        cardDetails : cardDetailsEncrypted,
        delivery: shipping?.price,
        total: cartTotal,
      }
      await axios.post(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER}/api/orders/payment`,
        { status: "working", data } // here you can pass anything so you can get on backend req.body
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
