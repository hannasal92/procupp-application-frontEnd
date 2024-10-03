import Image from "next/image";
import { Logout } from "./Icons";
import s from "./header.module.scss";
import { useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { store } from "@/store";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

const Profile = () => {
  const { user } = useSnapshot(store);
  const profileRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(52);
  const { push } = useRouter();

  const handleLogout = () => {
    store.user = undefined;
    deleteCookie("payload-token");
    push("/");
  };

  const handleClick = () => {
    store.profileType = "personal";
    push("/profile");
  };

  return (
    <div
      ref={profileRef}
      style={{ width: innerWidth < 600 ? 36 : width }}
      onPointerEnter={() => {
        setWidth(profileRef.current!.scrollWidth + 52);
      }}
      onPointerLeave={() => {
        setWidth(52);
      }}
      className={s.profileCover}
    >
      <div onClick={handleClick} className={s.profile}>
        <Image
          src={
            user?.profile
              ? `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER}${user.profile.url}`
              : user?.pictureURL
              ? user.pictureURL
              : "/profile-placeholder.jpg"
          }
          height={300}
          width={300}
          alt="customer-profile"
        />
        <div className={s.profile_box}>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
      </div>
      <button onClick={handleLogout}>
        <Logout />
      </button>
    </div>
  );
};

export default Profile;
