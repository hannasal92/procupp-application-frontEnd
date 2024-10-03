import { useSnapshot } from "valtio";
import Button from "../Common/Button";
import Input from "./Input";
import s from "./profile.module.scss";
import { store } from "@/store";
import React, { useEffect, useState } from "react";
import { client } from "@/client";
import { v4 as uuidv4 } from "uuid";
import {
  CREATE_AND_UPDATE_SHIPPING,
  GOOGLE_CREATE_AND_UPDATE_SHIPPING,
} from "@/query";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

type Shipping = {
  id?: string;
  address: string;
  country: string;
  zipcode: string;
  city: string;
  state: string;
  phone: string;
};

type InputType = "address" | "country" | "zipcode" | "city" | "state" | "phone";

const Shipping = () => {
  const t = useTranslations("Profile.Shipping");
  const tb = useTranslations("Profile.Buttons");
  const { push } = useRouter();
  const { user, previousPathForAddress } = useSnapshot(store);

  const [shipping, setShipping] = useState<Shipping[]>([]);
  const [isFeildEdit, setIsFeildEdit] = useState<boolean>(false);

  const handleNewAddress = () => {
    setShipping((prev) => [
      ...prev,
      {
        id: `${uuidv4()}`,
        address: "",
        phone: "",
        country: "",
        zipcode: "",
        state: "",
        city: "",
      },
    ]);
  };

  useEffect(() => {
    if (user) {
      let nonProxyObject = user?.shippingAddress.map((e) => {
        return { ...e };
      });

      setShipping(nonProxyObject as Shipping[]);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      if (user?.shippingAddress.length !== shipping.length || isFeildEdit) {
        if (
          shipping.every(
            (e) =>
              e.address !== "" &&
              e.phone !== "" &&
              e.city !== "" &&
              e.country !== "" &&
              e.state !== "" &&
              e.zipcode !== ""
          )
        ) {
          if (user?.pictureURL) {
            let res: { updateUser: User } = await client.request(
              GOOGLE_CREATE_AND_UPDATE_SHIPPING,
              {
                id: user?.id,
                data: { shippingAddress: shipping },
              }
            );

            store.user = res.updateUser;
          } else {
            let res: { updateUser: User } = await client.request(
              CREATE_AND_UPDATE_SHIPPING,
              {
                id: user?.id,
                data: { shippingAddress: shipping },
              }
            );

            store.user = res.updateUser;
          }
          toast.success("Save your information", { theme: "dark" });
          if (previousPathForAddress === "/checkout") {
            push("/checkout");
            store.previousPathForAddress = "/";
          } else {
            push("/profile");
          }
        } else {
          toast.error("Please fill all feild", { theme: "dark" });
        }
      } else {
        toast.error("New address not found", { theme: "dark" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong", { theme: "dark" });
    }
  };

  const handleRemoveAddress = (id: string) => {
    setShipping(shipping.filter((e) => e.id !== id));
  };

  const handleEditFeild = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: InputType,
    id: number
  ) => {
    setShipping((prev) => {
      prev[id] = {
        id: prev[id].id,
        address: type === "address" ? e.target.value : shipping[id].address,
        phone: type === "phone" ? e.target.value : shipping[id].phone,
        country: type === "country" ? e.target.value : shipping[id].country,
        city: type === "city" ? e.target.value : shipping[id].city,
        state: type === "state" ? e.target.value : shipping[id].state,
        zipcode: type === "zipcode" ? e.target.value : shipping[id].zipcode,
      };
      return [...prev];
    });
  };

  const handleIsFeildEdit = () => {
    setIsFeildEdit(true);
  };

  return (
    <>
      <div className={s.detailForm}>
        <div className={s.detailForm_cover}>
          {shipping.map(
            ({ address, phone, id, city, country, state, zipcode }, i) => {
              return (
                <div className={s.detailForm_box} key={i}>
                  <Input
                    // id={`shipping-address-${i}`}
                    type="text"
                    name="address"
                    placeholder={address === "" ? t("Inputs.Address") : address}
                    isEdit
                    isEdittext={tb("Make-Change")}
                    onChange={(e) => handleEditFeild(e, "address", i)}
                    onClick={handleIsFeildEdit}
                    value={shipping[i].address}
                  />

                  <div className={s.detailForm_divide}>
                    <Input
                      type="text"
                      placeholder={
                        country === "" ? t("Inputs.Country") : country
                      }
                      isEdit
                      isEdittext={tb("Make-Change")}
                      onChange={(e) => handleEditFeild(e, "country", i)}
                      onClick={handleIsFeildEdit}
                      value={shipping[i].country}
                    />
                    <Input
                      type="text"
                      placeholder={
                        zipcode === "" ? t("Inputs.Zipcode") : zipcode
                      }
                      isEdit
                      isEdittext={tb("Make-Change")}
                      onChange={(e) => handleEditFeild(e, "zipcode", i)}
                      onClick={handleIsFeildEdit}
                      value={shipping[i].zipcode}
                    />
                  </div>
                  <div className={s.detailForm_divide}>
                    <Input
                      type="text"
                      placeholder={city === "" ? t("Inputs.City") : city}
                      isEdit
                      isEdittext={tb("Make-Change")}
                      onChange={(e) => handleEditFeild(e, "city", i)}
                      onClick={handleIsFeildEdit}
                      value={shipping[i].city}
                    />
                    <Input
                      type="text"
                      placeholder={state === "" ? t("Inputs.State") : state}
                      isEdit
                      isEdittext={tb("Make-Change")}
                      onChange={(e) => handleEditFeild(e, "state", i)}
                      onClick={handleIsFeildEdit}
                      value={shipping[i].state}
                    />
                  </div>

                  <Input
                    // id={`shipping-phone-${i}`}
                    type="tel"
                    name="phone"
                    placeholder={phone === "" ? t("Inputs.Phone") : phone}
                    isEdit
                    isEdittext={tb("Make-Change")}
                    onChange={(e) => handleEditFeild(e, "phone", i)}
                    onClick={handleIsFeildEdit}
                    value={shipping[i].phone}
                  />
                  <Button
                    onClick={() => handleRemoveAddress(id!)}
                    varients="secondary"
                  >
                    {tb("Remove")}
                  </Button>
                </div>
              );
            }
          )}
        </div>
        <Button onClick={handleNewAddress} varients="secondary">
          {tb("Add-New-Address")}
        </Button>
        <div className={s.detailButtonGroup}>
          <Button varients="secondary">{tb("Back")}</Button>
          <Button onClick={handleSave}>{tb("Save")}</Button>
        </div>
      </div>
    </>
  );
};

export default Shipping;
