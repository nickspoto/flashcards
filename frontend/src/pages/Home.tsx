import FlashCard from "../components/FlashCard";
import { useState } from "react";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

const HomePage = () => {
  const [currentCard, updateCurrent] = useState(0);
  const cards = [
    [
      "Here is an example of one of our cards. Click the buttons below to move back and forth between the cards.",
      "Here it is flipped. For now there is a limit on the height and width.",
    ],
    ["Click on any of these cards to flip them!", "Nice job!"],
    [
      "Let me know if any of this looks off. Eventually you will be able to type your own info here.",
      "Flip me back over.",
    ],
  ];

  const handleIncrement = () => {
    if (currentCard < cards.length - 1) {
      //don't let it increment past the last one
      updateCurrent(currentCard + 1);
      console.log(currentCard);
    }
  };
  const handleDecrement = () => {
    if (currentCard > 0) {
      updateCurrent(currentCard - 1);
    }
  };

  return (
    <center
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column" as const,
        paddingRight: "20px",
        paddingLeft: "20px",
      }}
    >
      <h1>Welcome!</h1>
      <p style={{ textAlign: "left" }}>
        This is our flashcard web app. In it, you can make sets of flashcards
        with any information to study for your upcoming tests. Right now, I am
        typing to fill this space with useless text. See below for more
        information.
      </p>
      <div style={{ paddingBottom: "40px" }}>
        {FlashCard(cards[currentCard][0], cards[currentCard][1], false)}
      </div>
      <div style={{ paddingBottom: "40px" }}>
        <button
          onClick={handleDecrement}
          style={{ marginRight: "100px", borderRadius: "50px" }}
        >
          <ChevronLeftCircle size={64} width={"200px"} />
        </button>
        <button
          onClick={handleIncrement}
          style={{ marginLeft: "100px", borderRadius: "50px" }}
        >
          <ChevronRightCircle size={64} width={"200px"} />
        </button>
      </div>
    </center>
  );
};

export default HomePage;
