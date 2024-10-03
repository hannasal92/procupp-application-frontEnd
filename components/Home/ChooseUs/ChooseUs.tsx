import Image from "next/image";
import s from "./choose.module.scss";
import { data } from "./data";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap, { Power3 } from "gsap";
import { useTranslations } from "next-intl";
import { getLangDir } from "rtl-detect";
import { useRouter } from "next/router";

const ChooseUs = () => {
  const { locale } = useRouter();
  const direction = getLangDir(locale!);
  const t = useTranslations("Home.Why-Procupp-Section");
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
          },
          defaults: { ease: Power3.easeInOut, duration: 0.3 },
        })
        .from(".image", { yPercent: 100 })
        .from(".tag", { clipPath: "inset(0% 0% 0% 100%)" })
        .from(".heading", { clipPath: "inset(0% 0% 0% 100%)" })
        // .from(".para", { clipPath: "inset(0% 0% 0% 100%)" })
        .from(".card", { yPercent: 100, opacity: 0, stagger: 0.06 });
    },
    { scope: container }
  );
  return (
    <section dir={direction} ref={container} className={s.main}>
      <div className={s.cover}>
        <Image
          className={`image ${s.image}`}
          src="/home/choose-image.png"
          alt="product-image"
          height={800}
          width={600}
        />
        <div className={s.content}>
          <div className={s.header}>
            <div className={`tag ${s.header_box}`}>
              <div className={s.header_line} />
              <p>{t("Tag")}</p>
            </div>
            <h1 className="heading">{t("Heading")}</h1>
            {/* <p className="para">
              Semper in dignissim aliquet lacus. Ac in non velit rutrum.
              Condimentum pretium maecenas tellus in. Massa dui eleifend sit
              praesent aliquam orci velit. Imperdiet odio quam et amet sed.
            </p> */}
          </div>
          <div className={s.grid}>
            {data.map(({ imgSrc }, i) => {
              return (
                <div key={i} className={`card ${s.card}`}>
                  <div className={s.card_icon}>
                    <Image src={imgSrc} height={24} width={24} alt="icon" />
                  </div>
                  <p>{t(`Cards.${i}.value`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
