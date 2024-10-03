import Button from "@/components/Common/Button";
import s from "./hero.module.scss";
import { Arrow } from "@/components/Header/Icons";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap, { Power3 } from "gsap";
import { useRouter } from "next/router";
import { getLangDir } from "rtl-detect";

type Props = {
  children: React.ReactNode;
  bgSrc?: string;
  isVideo?: boolean;
};

const Hero: React.FC<Props> = ({ children, bgSrc, isVideo }) => {
  const { locale } = useRouter();
  const direction = getLangDir(locale!);
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: Power3.easeInOut, duration: 0.3 } })
        .from(container.current, { clipPath: "inset(0% 100% 0% 0%)", delay: 1 })
        .from(".content-text", { xPercent: direction === "rtl" ? 100 : -100 });
      // .from(".btn", { clipPath: "inset(0% 100% 0% 0%)" })
      // .from(".testi", { clipPath: "inset(0% 100% 0% 0%)" });
    },
    { scope: container }
  );

  return (
    <section
      dir={direction}
      ref={container}
      style={
        isVideo ? {} : ({ "--bgImg": `url(${bgSrc})` } as React.CSSProperties)
      }
      className={s.main}
    >
      <video
        className={s.main_video}
        src="/home/hero.mp4"
        autoPlay
        playsInline
        muted
      />
      <div className={s.cover}>
        <div data-dark={isVideo} className={`content ${s.content}`}>
          <div className={`content-text ${s.content_text}`}>{children}</div>
          {/* <div className="btn">
            <Button>
              Get Started <Arrow />
            </Button>
          </div> */}
          {/* <div className={`testi ${s.testi}`}>
            <div className={s.testi_avatars}>
              {[...Array(3)].map((e, i) => {
                return (
                  <Image
                    key={i}
                    style={{ zIndex: i }}
                    className={s.testi_avatars_img}
                    src={`/home/avatars/${i}.jpeg`}
                    height={43}
                    width={43}
                    alt="avatar"
                  />
                );
              })}
            </div>
            <div className={s.testi_text}>
              <p>
                999+ people are using <span>ProCupp</span> currently.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
