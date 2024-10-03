import Image from "next/image";
import s from "./work.module.scss";
import { Data } from "./data";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Power3 } from "gsap";
import gsap from "gsap";
import { useTranslations } from "next-intl";

type Props = {
  data: Data[];
  heading: string;
  tag: string;
  t: any;
};

const Work: React.FC<Props> = ({ data, heading, tag, t }) => {
  // const t = useTranslations("Home.How-It-Work-Section");
  const container = useRef<HTMLElement>(null);

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
        .from(".tag", { clipPath: "inset(0% 100% 0% 0%)" })
        .from(".heading", { clipPath: "inset(0% 100% 0% 0%)" })
        .from(".card", { yPercent: 100, opacity: 0, stagger: 0.06 });
    },
    { scope: container }
  );

  return (
    <section ref={container} className={s.main}>
      <div className={s.header}>
        <div className={`tag ${s.header_box}`}>
          <div className={s.header_line} />
          <p>{tag}</p>
        </div>
        <h1 className="heading">{heading}</h1>
      </div>
      <div className={s.grid}>
        {data.map(({ imgSrc }, i) => {
          return (
            <div key={i} className={`card ${s.card}`}>
              <div className={s.card_icon}>
                <Image src={imgSrc} height={24} width={24} alt="icon" />
              </div>
              <h3>{t(`Cards.${i}.value`)}</h3>
              {/* <p>{desc}</p> */}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Work;
