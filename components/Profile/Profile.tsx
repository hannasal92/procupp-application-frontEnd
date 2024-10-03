import { useEffect, useState } from "react";
import s from "./profile.module.scss";
import ConditionProfile from "./ConditionProfile";
import { store } from "@/store";
import { useSnapshot } from "valtio";
import { useTranslations } from "next-intl";
import { getLangDir } from "rtl-detect";
import { useRouter } from "next/router";

const Profile = () => {
  const { locale } = useRouter();
  const t = useTranslations("Profile");
  const direction = getLangDir(locale!);
  const { profileType } = useSnapshot(store);
  const [borderPosition, setBorderPosition] = useState<number>(0);

  const handleClick = (type: "personal" | "shipping" | "payment") => {
    store.profileType = type;
  };

  useEffect(() => {
    switch (profileType) {
      case "personal":
        setBorderPosition(0);
        break;
      case "shipping":
        innerWidth < 600 ? setBorderPosition(133) : setBorderPosition(176);
        break;
      case "payment":
        innerWidth < 600 ? setBorderPosition(266) : setBorderPosition(352);
        break;

      default:
        break;
    }
  }, [profileType]);

  return (
    <div className={s.section}>
      <div className={s.profileHead}>
        <h1>{t("Heading")}</h1>
        <div className={s.profileHead_buttonGroup}>
          <span
            style={
              direction === "rtl"
                ? { right: borderPosition }
                : { left: borderPosition }
            }
          />
          <button onClick={() => handleClick("personal")}>
            {t("Tabs.Personal")}
          </button>
          <button onClick={() => handleClick("shipping")}>
            {t("Tabs.Shipping")}
          </button>
          <button onClick={() => handleClick("payment")}>
            {t("Tabs.Payment")}
          </button>
        </div>
      </div>
      <ConditionProfile />
    </div>
  );
};

export default Profile;
