import s from "./value.module.scss";
import Image from "next/image";
import { data } from "./data";
import { useTranslations } from "next-intl";

const Value = () => {
  const t = useTranslations("About.Our-Value-Section");
  return (
    <>
      <div className={s.banner} />
      <section className={s.main}>
        <div className={s.content}>
          <div className={s.tag_box}>
            <div className={s.tag_line} />
            <p>{t("Tag")}</p>
          </div>
          <h2>{t("Heading")}</h2>
          {/* <div className={s.content_box}>
            <p>
              Semper in dignissim aliquet lacus. Ac in non velit rutrum.
              Condimentum pretium maecenas tellus in. Massa dui eleifend sit
              praesent aliquam orci velit. Imperdiet odio quam et amet sed.
            </p>
          </div> */}
          <div className={s.grid}>
            {data.map(({ imgSrc, title }, i) => {
              return (
                <div key={i} className={s.card}>
                  <div className={s.card_icon}>
                    <Image src={imgSrc} height={24} width={24} alt="icon" />
                  </div>
                  <p>{t(`Cards.${i}.value`)}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className={s.image}>
          <div className={s.image_imgOne} />
          <div className={s.image_imgTwo} />
        </div>
      </section>
    </>
  );
};

export default Value;
