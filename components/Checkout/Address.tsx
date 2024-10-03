import { useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import s from "./checkout.module.scss";
import { Plus } from "./Icons";
import { useRouter } from "next/router";
import { store } from "@/store";
import { useSnapshot } from "valtio";
import { useTranslations } from "next-intl";

const Address = () => {
  const t = useTranslations("Checkout.Address");
  const { user } = useSnapshot(store);
  const { push } = useRouter();
  const [activeId, setActiveId] = useState<string>("");

  const handleClick = (
    id: string,
    data: {
      heading: string;
      tag: string;
      address: string;
      number: string;
    }
  ) => {
    store.selectedAddress = data;
    setActiveId(id);
  };

  const handleNewAddress = () => {
    store.profileType = "shipping";
    store.previousPathForAddress = "/checkout";
    push("/profile");
  };
  useEffect(() => {
    store.selectedAddress = undefined;
  }, []);

  return (
    <div className={s.address}>
      <h1>{t("Heading")}</h1>
      <div className={s.address_grid}>
        {user?.shippingAddress.map(
          ({ id, address, phone, city, country, state, zipcode }, i) => {
            return (
              <AddressCard
                activeId={activeId}
                heading={`${t("CardHeading")} ${i}`}
                tag="Home"
                address={`${address}, ${city}, ${state}, ${country}, ${zipcode}`}
                key={id}
                onClick={handleClick}
                id={id}
                number={phone}
              />
            );
          }
        )}
      </div>
      <button onClick={handleNewAddress} className={s.address_button}>
        <Plus />
        <span>{t("Add-New-Address")}</span>
      </button>
    </div>
  );
};

export default Address;
