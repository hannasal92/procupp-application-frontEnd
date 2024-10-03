import "react-toastify/dist/ReactToastify.css";
import "@fontsource-variable/inter";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect } from "react";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "react-use-cart";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRouter } from "next/router";
import axios from "axios";
import { getCookie, setCookie, hasCookie, deleteCookie } from "cookies-next";
import { NextIntlClientProvider } from "next-intl";
import { getLangDir } from "rtl-detect";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function App({ Component, pageProps }: AppProps) {
  const { query, locale, events } = useRouter();
  const direction = getLangDir(locale!);

  let cookie = getCookie("payload-token");

  const validateUser = async (token: string) => {
    try {
      let userInfo: {
        id: string;
        email: string;
        collection: "users" | "googleUsers";
      } = jwtDecode(token);

      if (userInfo.collection === "users") {
        let response = await axios.get(
          `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER}/api/users/${userInfo.id}`
        );
        store.user = response.data;
      } else {
        let response = await axios.get(
          `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER}/api/googleUsers/${userInfo.id}`
        );
        store.user = response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = useCallback(() => {
    if (query.token) {
      validateUser(query.token as string);
      setCookie("payload-token", query.token);
    } else if (hasCookie("payload-token")) {
      validateUser(cookie!);
    } else {
      console.log("no-user");
    }
  }, [cookie, query]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [locale, direction]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      store.currentProductPrice = 0;
      if (!(url === "/checkout" || url === "/profile")) {
        store.previousPathForAddress = "/";
      }
    };

    events.on("routeChangeStart", handleRouteChange);

    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [events]);

  return (
    <NextIntlClientProvider
      locale={locale}
      timeZone="Asia/Karachi"
      messages={pageProps.messages}
    >
      <CartProvider>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </NextIntlClientProvider>
  );
}
