import { data } from "./data";
import s from "./question.module.scss";

const Questions = () => {
  return (
    <section className={s.main}>
      <div className={s.cover}>
        {data.map(({ answer, question }, i) => {
          return (
            <div className={s.card} key={i}>
              <h4>{question}</h4>
              <p>{answer}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Questions;
