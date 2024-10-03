import Image from "next/image";
import s from "./cart.module.scss";
import { Close } from "./Icons";
import { useCart } from "react-use-cart";
import { useTranslations } from "next-intl";

type Props = {
  imgUrl: string;
  imgAlt: string;
  heading: string;
  id: string;
  price: number;
  quantity: number | undefined;
  isNotCancel?: boolean | undefined;
};

const Card: React.FC<Props> = ({
  heading,
  id,
  imgAlt,
  imgUrl,
  price,
  isNotCancel,
  quantity,
}) => {
  const t = useTranslations("Cart");
  const { removeItem } = useCart();

  return (
    <div data-fullwidth={isNotCancel} className={s.card}>
      <Image
        src={imgUrl}
        height={400}
        width={400}
        alt={imgAlt}
        unoptimized={true}
      />
      <div className={s.card_content}>
        <div className={s.card_content_box}>
          <h3>{heading}</h3>
          <h4>
            {t("Quantity")} : {quantity}
          </h4>
          <p>#{id}</p>
        </div>
        <div className={s.card_content_price}>
          <h2>{price}$</h2>
          {!isNotCancel && (
            <button onClick={() => removeItem(id)}>
              <Close />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
