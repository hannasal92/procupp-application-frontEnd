import Link from "next/link";
import Logo from "./Logo";
import s from "./footer.module.scss";
import { Facebook, Instagram, Linkdin, Twitter } from "./Icons";
import { useRef } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  const th = useTranslations("Header");
  const { asPath } = useRouter();
  const container = useRef<HTMLDivElement>(null);

  return (
    <div ref={container}>
      <div
        data-hidden={asPath === "/product-design"}
        className={`banner ${s.banner}`}
      />
      <footer
        data-hidden={asPath === "/product-design"}
        className={`section ${s.main}`}
      >
        <div className={s.cover}>
          <div className={s.detail}>
            <Logo />
            <p>{t("Description")}</p>
          </div>
          <div className={s.cover_side}>
            <div className={s.nav}>
              <Link href="/">{th("Navigations.Home")}</Link>
              <Link href="/products">{th("Navigations.Product")}</Link>
              <Link href="/about">{th("Navigations.About")}</Link>
              <Link href="/contact">{th("Navigations.Contact")}</Link>
              <Link href="/login">{th("Buttons.Login")}</Link>
              <Link href="/sign-up">{th("Buttons.Signup")}</Link>
            </div>
            <div className={s.nav}>
              <Link href="/privacy-policy">
                {th("Navigations.Privacy-Policy")}
              </Link>
              <Link href="/terms-and-condition">
                {th("Navigations.Terms-And-Conditions")}
              </Link>
            </div>
          </div>
          <div className={s.nav}>
            <div className={s.box}>
              <Link href="/">
                <Instagram />
              </Link>
              <Link href="/">
                <Facebook />
              </Link>
              <Link href="/">
                <Twitter />
              </Link>
              <Link href="/">
                <Linkdin />
              </Link>
            </div>
            <p data-center>{t("Rights")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
