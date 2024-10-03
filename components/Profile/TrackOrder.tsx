import OrderCard from "../OrderCard/OrderCard";
import s from "./profile.module.scss";

type Props = {
  data: GetOrder[];
};

const TrackOrder: React.FC<Props> = ({ data }) => {
  if (data) {
    return (
      <div className={s.section}>
        {data.length === 0 && (
          <h1 className={s.loader}>Track Order Not Found</h1>
        )}
        {data.map(
          ({
            id,
            address,
            cart,
            discount,
            delivery,
            tax,
            total,
            status,
            createdAt,
            deliveryDate,
            outOfDeliveryDate,
            shippedDate,
          }) => {
            return (
              <OrderCard
                key={id}
                orderId={id}
                products={cart}
                address={address}
                timelineStep={Number(status) as 1 | 2 | 3 | 0}
                discount={discount}
                delivery={delivery}
                tax={tax}
                total={total}
                createdAt={createdAt}
                deliveryDate={deliveryDate}
                outOfDeliveryDate={outOfDeliveryDate}
                shippedDate={shippedDate}
              />
            );
          }
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default TrackOrder;
