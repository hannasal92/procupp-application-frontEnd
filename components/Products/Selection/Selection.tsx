import { useEffect, useState } from "react";
import Card from "./Card";
import s from "./selection.module.scss";
import { data } from "./data";
import { store } from "@/store";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

type Options = {
  heading: string;
  imageUrl: string;
  detail?: { quantity: string; price: number }[];
}[];

type Props = {
  removePadding?: boolean;
};

const Selection: React.FC<Props> = ({ removePadding = false }) => {
  const t = useTranslations("Home.Product-We-Offer-Section");
  const { push } = useRouter();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [type, setType] = useState<string>("plastic");
  const [optiontype, setOptionType] = useState<string>();
  const [selectedOptions, setSelectedOptions] = useState<Options>([]);

  const handleClick = (options: Options, type: string, size: string) => {
    setOptionType(size);
    if (options.length > 0) {
      setSelectedOptions(options);
    } else {
      store.selectedProduct = `${type} ${size}`;
      store.cartProduct = `${type} ${size}`;
      push("/product-design");
    }
  };

  const handleOptionsClick = (type: string, size: string) => {
    store.selectedProduct =
      optiontype === "crystal cup v2" || optiontype === "crystal cup v1"
        ? `${type} ${optiontype.slice(12, 14)} ${size}`
        : `${type} ${size}`;
    store.cartProduct = `${type} ${optiontype} ${size}`;
    push("/product-design");
  };

  const handleTabClick = (id: number, title: string) => {
    setActiveTab(id);
    setSelectedOptions([]);
    setType(title.toLowerCase());
  };

  return (
    <div data-remove-padding={removePadding} className={s.main}>
      <h1>{t("Heading")}</h1>
      <div className={s.tabs}>
        {["Plastic", "Paper"].map((e, i) => {
          return (
            <button
              key={i}
              data-active={i === activeTab}
              onClick={() => handleTabClick(i, e)}
            >
              {t(`Tabs.${i}.value`)}
            </button>
          );
        })}
      </div>
      <div className={s.grid}>
        <div className={s.grid_cover}>
          {selectedOptions.length > 0
            ? selectedOptions.map((e, i) => {
                return (
                  <Card
                    key={i}
                    heading={e.heading}
                    imageUrl={e.imageUrl}
                    btnClick={() => {
                      handleOptionsClick(type, e.heading.toLowerCase());
                      if (e.detail) {
                        store.selecetedProductPriceAndQuantity = e.detail;
                      }
                    }}
                  />
                );
              })
            : data[activeTab].map((e, i) => {
                return (
                  <Card
                    key={i}
                    heading={e.heading}
                    imageUrl={e.imageUrl}
                    btnClick={() => {
                      handleClick(e.options, type, e.heading.toLowerCase());
                      if (e.detail) {
                        store.selecetedProductPriceAndQuantity = e.detail;
                      }
                    }}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Selection;
