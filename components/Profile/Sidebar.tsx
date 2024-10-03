import Link from "next/link";
import s from "./profile.module.scss";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

const Sidebar = () => {
  const t = useTranslations("Profile-Tabs");
  const { pathname } = useRouter();

  return (
    <div className={s.sidebar}>
      <Link data-active={pathname === "/profile"} href="/profile">
        {t("Profile")}
      </Link>
      <Link data-active={pathname === "/track-order"} href={`/track-order`}>
        {t("Track-Order")}
      </Link>
      <Link data-active={pathname === "/order-history"} href={`/order-history`}>
        {t("Order-History")}
      </Link>
    </div>
  );
};

export default Sidebar;
