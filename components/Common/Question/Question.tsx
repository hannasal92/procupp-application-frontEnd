import Button from "@/components/Common/Button";
import s from "./question.module.scss";
import { Arrow } from "@/components/Header/Icons";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap, { Power3 } from "gsap";

type Props = {
  heading: string;
  children: React.ReactNode;
  imgSrcOne: string;
  imgSrcTwo: string;
};

const Question: React.FC<Props> = ({
  children,
  heading,
  imgSrcOne,
  imgSrcTwo,
}) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
          },
          defaults: { ease: Power3.easeInOut, duration: 0.4 },
        })
        .from(".banner", { clipPath: "inset(100% 0% 0% 0%)" })
        .from(".section", { yPercent: 100 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "32% 80%",
          },
          defaults: { ease: Power3.easeInOut, duration: 0.4 },
        })
        .from(".image-1", { xPercent: 120 })
        .from(".image-2", { yPercent: 100 })
        .from(".content", { xPercent: -120 })
        .from(".btn", { clipPath: "inset(0% 100% 0% 0%)" });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <div className={`banner ${s.banner}`} />
      <section className={`section ${s.main}`}>
        <div className={`content ${s.content}`}>
          <h2>{heading}</h2>
          <div className={`${s.content_box}`}>{children}</div>
          <div className="btn">
            <Button>
              Get Started <Arrow />
            </Button>
          </div>
        </div>
        <div className={s.image}>
          <div
            style={{ backgroundImage: `url(${imgSrcOne})` }}
            className={`image-1 ${s.image_imgOne}`}
          />
          <div
            style={{ backgroundImage: `url(${imgSrcTwo})` }}
            className={`image-2 ${s.image_imgTwo}`}
          />
        </div>
      </section>
    </div>
  );
};

export default Question;
