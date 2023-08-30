import "../css/Question.css";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

function Question() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [index, setIndex] = useState(null);
  let preIndex = index;
  const handleAnswer = (index) => {
    setIndex(index);
    if (preIndex === index) {
      setShowAnswer(!showAnswer);
    }
    if (preIndex !== index && showAnswer) {
      setShowAnswer(true);
    }
    if (preIndex !== index && !showAnswer) {
      setShowAnswer(true);
    }
  };

  return (
    <section className="question">
      <div className="question__content">
        <h1>Frequently Asked Questions</h1>
        <ul className="question__list">
          <li className="question__item">
            <button className="question__item-title">
              <h3>What is Netflix?</h3>
              <AiOutlinePlus
                key="1"
                className={`question__item-icon ${
                  showAnswer && index === 1 && "show"
                }`}
                onClick={() => handleAnswer(1)}
              />
            </button>
            <div
              className={`question__item-answer ${
                showAnswer && index === 1 && "show"
              }`}
            >
              <h3>
                Netflix is a streaming service that offers a wide variety of
                award-winning TV shows, movies, anime, documentaries, and more
                on thousands of internet-connected devices.
                <br />
                <br />
                You can watch as much as you want, whenever you want without a
                single commercial – all for one low monthly price. There's
                always something new to discover and new TV shows and movies are
                added every week!
              </h3>
            </div>
          </li>
          <li className="question__item">
            <button className="question__item-title">
              <h3>How much does Netflix cost?</h3>
              <AiOutlinePlus
                key="2"
                className={`question__item-icon ${
                  showAnswer && index === 2 && "show"
                }`}
                onClick={() => handleAnswer(2)}
              />
            </button>
            <div
              className={`question__item-answer ${
                showAnswer && index === 2 && "show"
              }`}
            >
              <h3>
                Watch Netflix on your smartphone, tablet, Smart TV, laptop, or
                streaming device, all for one fixed monthly fee. Plans range
                from 70,000 ₫ to 260,000 ₫ a month. No extra costs, no
                contracts.
              </h3>
            </div>
          </li>
          <li className="question__item">
            <button className="question__item-title">
              <h3>Where can I watch?</h3>
              <AiOutlinePlus
                key="3"
                className={`question__item-icon ${
                  showAnswer && index === 3 && "show"
                }`}
                onClick={() => handleAnswer(3)}
              />
            </button>
            <div
              className={`question__item-answer ${
                showAnswer && index === 3 && "show"
              }`}
            >
              <h3>
                Watch anywhere, anytime. Sign in with your Netflix account to
                watch instantly on the web at netflix.com from your personal
                computer or on any internet-connected device that offers the
                Netflix app, including smart TVs, smartphones, tablets,
                streaming media players and game consoles.
                <br />
                <br />
                You can also download your favorite shows with the iOS, Android,
                or Windows 10 app. Use downloads to watch while you're on the go
                and without an internet connection. Take Netflix with you
                anywhere.
              </h3>
            </div>
          </li>
          <li className="question__item">
            <button className="question__item-title">
              <h3>How do I cancel?</h3>
              <AiOutlinePlus
                key="4"
                className={`question__item-icon ${
                  showAnswer && index === 4 && "show"
                }`}
                onClick={() => handleAnswer(4)}
              />
            </button>
            <div
              className={`question__item-answer ${
                showAnswer && index === 4 && "show"
              }`}
            >
              <h3>
                Netflix is flexible. There are no pesky contracts and no
                commitments. You can easily cancel your account online in two
                clicks. There are no cancellation fees – start or stop your
                account anytime.
              </h3>
            </div>
          </li>
          <li className="question__item">
            <button className="question__item-title">
              <h3>What can I watch on Netflix?</h3>
              <AiOutlinePlus
                key="5"
                className={`question__item-icon ${
                  showAnswer && index === 5 && "show"
                }`}
                onClick={() => handleAnswer(5)}
              />
            </button>
            <div
              className={`question__item-answer ${
                showAnswer && index === 5 && "show"
              }`}
            >
              <h3>
                Netflix has an extensive library of feature films,
                documentaries, TV shows, anime, award-winning Netflix originals,
                and more. Watch as much as you want, anytime you want.
              </h3>
            </div>
          </li>
          <li className="question__item">
            <button className="question__item-title">
              <h3>Is Netflix good for kids?</h3>
              <AiOutlinePlus
                key="6"
                className={`question__item-icon ${
                  showAnswer && index === 6 && "show"
                }`}
                onClick={() => handleAnswer(6)}
              />
            </button>
            <div
              className={`question__item-answer ${
                showAnswer && index === 6 && "show"
              }`}
            >
              <h3>
                The Netflix Kids experience is included in your membership to
                give parents control while kids enjoy family-friendly TV shows
                and movies in their own space.
                <br />
                <br />
                Kids profiles come with PIN-protected parental controls that let
                you restrict the maturity rating of content kids can watch and
                block specific titles you don’t want kids to see. anywhere.
              </h3>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Question;
