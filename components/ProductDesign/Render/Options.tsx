import s from "./render.module.scss";
import { store } from "@/store";
import { useState } from "react";
import { useSnapshot } from "valtio";

const Options = () => {
  const { selecetedProductPriceAndQuantity } = useSnapshot(store);
  const [selectedOption, setSelectedOption] = useState("default");
  const [price, setPrice] = useState(0);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);

    let value = selecetedProductPriceAndQuantity.filter(
      (elem) => String(elem.quantity) === e.target.value
    );
    store.currentProductPrice = value[0].price;
    setPrice(value[0].price);
  };
  return (
    <div className={s.options}>
      <details className="custom-select">
        <summary className="radios">
          <input
            type="radio"
            name="quantity-cup"
            id="default"
            value="default"
            title="Select Quantity"
            onChange={handleOptionChange}
            checked={selectedOption === "default"}
          />
          {selecetedProductPriceAndQuantity.map((e, i) => {
            return (
              <input
                key={i}
                type="radio"
                name="quantity-cup"
                id={`option-${i}`}
                title={String(e.quantity)}
                value={e.quantity}
                onChange={handleOptionChange}
                checked={selectedOption === String(e.quantity)}
              />
            );
          })}
        </summary>
        <ul className="list">
          {selecetedProductPriceAndQuantity.map((e, i) => {
            return (
              <li key={i}>
                <label htmlFor={`option-${i}`}>{e.quantity}</label>
              </li>
            );
          })}
        </ul>
      </details>
      <h2>$ {price}</h2>
    </div>
  );
};

export default Options;
