import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import s from "./profile.module.scss";
import Profile from "./Profile";
import TrackOrder from "./TrackOrder";
import OrderHistory from "./OrderHistory";
import Loader from "./Loader";

type Props = {
  data?: GetOrder[];
  isLoading?: boolean;
};

const ProfileContainer: React.FC<Props> = ({ data, isLoading }) => {
  const { pathname } = useRouter();

  return (
    <section className={s.main}>
      <Sidebar />
      {isLoading ? (
        <Loader />
      ) : pathname === "/profile" ? (
        <Profile />
      ) : pathname === "/track-order" ? (
        <TrackOrder data={data!} />
      ) : (
        <OrderHistory data={data!} />
      )}
    </section>
  );
};

export default ProfileContainer;
