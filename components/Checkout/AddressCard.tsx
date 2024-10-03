import { store } from "@/store";
import { Close, Edit } from "./Icons";
import s from "./checkout.module.scss";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { client } from "@/client";
import { CREATE_AND_UPDATE_SHIPPING } from "@/query";
import { toast } from "react-toastify";

type Props = {
  id: string;
  activeId: number | string;
  heading: string;
  tag: string;
  address: string;
  number: string;
  onClick: (
    id: string,
    data: {
      heading: string;
      tag: string;
      address: string;
      number: string;
    }
  ) => void;
};

const AddressCard: React.FC<Props> = ({
  id,
  activeId,
  address,
  heading,
  number,
  onClick,
  tag,
}) => {
  const { user } = useSnapshot(store);
  const { push } = useRouter();
  const handleEditAddress = () => {
    store.profileType = "shipping";
    push("/profile");
  };

  const handleDelete = async () => {
    try {
      let normalizeData = user?.shippingAddress.map((e) => {
        return { id: e.id, address: e.address, phone: e.phone };
      });
      let filterData = normalizeData!.filter((e) => e.id !== id);
      let res: { updateUser: User } = await client.request(
        CREATE_AND_UPDATE_SHIPPING,
        {
          id: user?.id,
          data: { shippingAddress: filterData },
        }
      );
      store.user = res.updateUser;
      toast.success("Address delete successfully", { theme: "dark" });
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong", { theme: "dark" });
    }
  };

  return (
    <div className={s.addressCard}>
      <div
        onClick={() => onClick(id, { address, heading, number, tag })}
        className={s.addressCard_cover}
      >
        <div data-active={id === activeId} className={s.addressCard_check}>
          <div />
        </div>
        <div className={s.addressCard_detail}>
          <div className={s.addressCard_detail_box}>
            <h2>{heading}</h2>
            <p>{tag}</p>
          </div>
          <div className={s.addressCard_text}>
            <p>{address}</p>
            <p>{number}</p>
          </div>
        </div>
      </div>
      <div className={s.addressCard_control}>
        <button onClick={handleEditAddress}>
          <Edit />
        </button>
        <button onClick={handleDelete}>
          <Close />
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
