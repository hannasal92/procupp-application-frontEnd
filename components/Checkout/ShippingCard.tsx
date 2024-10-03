import s from "./checkout.module.scss";

type Props = {
  id: number;
  activeId: number | string;
  price: number;
  title: string;
  date: string;
  onClick: (
    id: number | string,
    data: {
      price: number;
      title: string;
      date: string;
    }
  ) => void;
};

const ShippingCard: React.FC<Props> = ({
  id,
  activeId,
  date,
  price,
  title,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(id, { price, title, date })}
      className={s.shippingCard}
    >
      <div className={s.shippingCard_box}>
        <div data-active={id === activeId} className={s.shippingCard_check}>
          <div />
        </div>
        <h3>{price === 0 ? "FREE" : `$${price}`}</h3>
        <p>{title}</p>
      </div>
      <p>{date}</p>
    </div>
  );
};

export default ShippingCard;
