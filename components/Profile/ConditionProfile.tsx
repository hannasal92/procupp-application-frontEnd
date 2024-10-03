import { useSnapshot } from "valtio";
import Payments from "./Payments";
import Personal from "./Personal";
import Shipping from "./Shipping";
import { store } from "@/store";

const ConditionProfile = () => {
  const { profileType } = useSnapshot(store);

  switch (profileType) {
    case "personal":
      return <Personal />;
    case "shipping":
      return <Shipping />;
    case "payment":
      return <Payments />;

    default:
      return <div>Enter</div>;
  }
};

export default ConditionProfile;
