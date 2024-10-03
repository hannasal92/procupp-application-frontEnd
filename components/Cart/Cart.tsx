import { useEffect, useState } from "react";
import Bill from "./Bill";
import Grid from "./Grid";
import s from "./cart.module.scss";

const Cart = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient) {
    return (
      <section className={s.main}>
        <Grid />
        <Bill />
      </section>
    );
  } else {
    return <></>;
  }
};

export default Cart;
