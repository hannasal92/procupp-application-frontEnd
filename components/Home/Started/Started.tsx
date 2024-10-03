import { useRef } from "react";
import s from "./started.module.scss";
import { useGSAP } from "@gsap/react";
import gsap, { Power3 } from "gsap";

type Props = {
  children: React.ReactNode;
  direction?: "left" | "right";
  imgSrcOne: string;
  imgSrcTwo: string;
};
const Started: React.FC<Props> = ({
  children,
  direction = "left",
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
        .from(".image-1", { xPercent: -100 })
        .from(".image-2", { yPercent: 100 })
        .from(".content", { xPercent: 120 });
    },
    { scope: container }
  );

  return (
    <section ref={container} data-direction={direction} className={s.main}>
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
      <div className={`content ${s.content}`}>{children}</div>
    </section>
  );
};

export default Started;
