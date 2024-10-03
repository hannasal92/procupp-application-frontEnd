import { useRouter } from "next/router";
import Button from "../Common/Button";
import Cart from "./Cart";
import { Arrow, ArrowDown, DoubleWalled, Globe, Paper, Plastic } from "./Icons";
import Logo from "./Logo";
import NextLink from "./NextLink";
import s from "./header.module.scss";
import Profile from "./Profile";
import { useSnapshot } from "valtio";
import { store } from "@/store";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "react-use-cart";
import { useGSAP } from "@gsap/react";
import gsap, { Power3 } from "gsap";
import { getLangDir } from "rtl-detect";
import { useTranslations } from "next-intl";

const CartCounter = () => {
  const [isClient, setIsClient] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient) {
    if (totalItems > 0) {
      return <span>{totalItems}</span>;
    } else {
      <></>;
    }
  } else {
    return <></>;
  }
};

const Header = () => {
  const t = useTranslations("Header");
  const container = useRef<HTMLDivElement>(null);

  const { user } = useSnapshot(store);

  const { push, locale } = useRouter();

  const direction = getLangDir(locale!);

  const [isLangActive, setIsLangActive] = useState<boolean>(false);

  const handleLink = (path: string) => {
    push(path);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenu = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const handleMobileLink = (path: string) => {
    push(path);
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: Power3.easeInOut, duration: 0.4 } })
        .from(".logo", { xPercent: direction === "rtl" ? 100 : -100 })
        .from(".menu a", { clipPath: "inset(100% 0% 0% 0%)", stagger: 0.1 })
        .from(".cartbtn", { scale: 0 })
        .to(".dropdown", { scale: 1 })
        .from(".btngroup", { xPercent: direction === "rtl" ? -120 : 120 });
      // .from(".subnav", { clipPath: "inset(0% 0% 0% 100%)" });
    },
    { scope: container }
  );

  const handleLang = () => {
    setIsLangActive((prev) => !prev);
  };

  return (
    <div ref={container}>
      <header className={s.main}>
        <Link href="/">
          <Logo />
        </Link>
        <div className={s.cover}>
          <nav className="menu">
            <NextLink href="/">{t("Navigations.Home")}</NextLink>
            <NextLink href="/products">{t("Navigations.Product")}</NextLink>
            <NextLink href="/about">{t("Navigations.About")}</NextLink>
            <NextLink href="/contact">{t("Navigations.Contact")}</NextLink>
          </nav>
          <Link className={`cartbtn ${s.cartbtn}`} href="/cart">
            <CartCounter />
            <Cart />
          </Link>

          <button onClick={handleLang} className={`dropdown ${s.dropdown}`}>
            <span>
              {locale === "he" ? "הוא" : locale === "en" ? "en" : locale}
            </span>
            <ArrowDown />
            <div data-active={isLangActive} className={s.dropdown_float}>
              <Link locale="en" href="">
                English
              </Link>
              <hr />
              <Link locale="he" href="">
                עִברִית
              </Link>
            </div>
          </button>

          {user ? (
            <Profile />
          ) : (
            <div className={`btngroup ${s.cover_btnGroup}`}>
              <Button onClick={() => handleLink("/login")} varients="secondary">
                {t("Buttons.Login")}
              </Button>
              <Button dir={direction} onClick={() => handleLink("/signup")}>
                {t("Buttons.Get-Started")} <Arrow />
              </Button>
            </div>
          )}
          <button
            onClick={handleMenu}
            data-active={isOpen}
            className={s.hamburger}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* <div className={`subnav ${s.subnavs}`}>
        <div className={s.subnavs_cover}>
          <h4>Products:</h4>
          <div className={s.subnavs_grid}>
            <div data-noborder className={s.subnavs_grid_box}>
              <Paper /> <p>Paper</p>
            </div>
            <div className={s.subnavs_grid_box}>
              <DoubleWalled /> <p>Double Walled</p>
            </div>
            <div className={s.subnavs_grid_box}>
              <Plastic /> <p>Plastic</p>
            </div>
          </div>
        </div>
      </div> */}
      <nav data-active={isOpen} className={s.mobileNav}>
        <NextLink onClick={handleClose} href="/">
          {t("Navigations.Home")}
        </NextLink>
        <NextLink onClick={handleClose} href="/products">
          {t("Navigations.Product")}
        </NextLink>
        <NextLink onClick={handleClose} href="/about">
          {t("Navigations.About")}
        </NextLink>
        <NextLink onClick={handleClose} href="/contact">
          {t("Navigations.Contact")}
        </NextLink>
        <Button onClick={() => handleMobileLink("/login")} varients="secondary">
          {t("Buttons.Login")}
        </Button>
        <Button onClick={() => handleMobileLink("/signup")}>
          {t("Buttons.Get-Started")} <Arrow />
        </Button>
      </nav>
    </div>
  );
};

export default Header;
