import FlashCard from "../components/FlashCard";
import Carousel from "../components/Carousel";
import { SetStateAction, useState } from "react";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

const HomePage = () => {
  const [currentCard, updateCurrent] = useState(0);
  const [flipped, updateFlipped] = useState(false);
  const [frontInputValue, setFrontInputValue] = useState(""); //below this is for the carousel
  const [backInputValue, setBackInputValue] = useState("");
  const [currentCardSample, updateCurrentSample] = useState(0);
  const [sampleCards, setSampleCards] = useState<string[][]>([]);

  const cards = [
    [
      "Here is an example of one of our cards. Click the buttons below to move back and forth between the cards.",
      "Here it is flipped. For now there is a limit on the height and width.",
    ],
    ["Click on any of these cards to flip them!", "Nice job!"],
    ["Let me know if any of this looks off.", "Flip me back over."],
  ];

  const handleIncrement = () => {
    if (currentCard < cards.length - 1) {
      //don't let it increment past the last one
      updateCurrent(currentCard + 1);
    }
    updateFlipped(false);
  };
  const handleDecrement = () => {
    if (currentCard > 0) {
      updateCurrent(currentCard - 1);
    }
    updateFlipped(false);
  };

  const handleIncrementSample = () => {
    if (currentCardSample < sampleCards.length) {
      //don't let it increment past the last one
      updateCurrentSample(currentCardSample + 1);
    }
    updateFlipped(false);
  };
  const handleDecrementSample = () => {
    if (currentCardSample > 0) {
      updateCurrentSample(currentCardSample - 1);
    }
    updateFlipped(false);
  };

  const handleFlip = () => {
    updateFlipped(!flipped);
  };

  const handleFrontInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setFrontInputValue(event.target.value);
  };

  const handleBackInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setBackInputValue(event.target.value);
  };

  const addCard = (front: string, back: string) => {
    const newCards = [...sampleCards, [front, back]];
    setSampleCards(newCards);
    setBackInputValue("");
    setFrontInputValue(""); //add the cards and then reset the values
  };

  const formatSample = () => {
    let newStr = "";
    for (const card of sampleCards) {
      newStr += "[";
      newStr += card[0];
      newStr += ", ";
      newStr += card[1];
      newStr += "], ";
    }
    return newStr;
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
      <p
        style={{
          textAlign: "left",
          marginLeft: "40px",
          marginRight: "40px",
          fontSize: "1.5rem",
        }}
      >
        This is our flashcard web app. In it, you can make sets of flashcards
        with any information to study for your upcoming tests. Right now, I am
        typing to fill this space with useless text. See below for more
        information.
      </p>
      <div style={{ paddingBottom: "40px" }}>
        {FlashCard(
          cards[currentCard][0], //front
          cards[currentCard][1], //back
          flipped, //initialize flipped state
          handleFlip //flip handling function
        )}
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
      <p style={{ paddingBottom: "20px", fontSize: "1.5rem" }}>
        Now you try! Type into the input boxes below to generate your own card.
        Click the add button when you are finished to add the card to a new
        carousel.
      </p>
      <input
        placeholder="front"
        value={frontInputValue}
        style={{ marginBottom: "10px" }}
        onChange={handleFrontInputChange}
      ></input>
      <input
        placeholder="back"
        value={backInputValue}
        style={{ marginBottom: "10px" }}
        onChange={handleBackInputChange}
      ></input>
      <div style={{ paddingBottom: "40px" }}>
        {Carousel(
          sampleCards,
          currentCardSample,
          frontInputValue,
          backInputValue
        )}
      </div>
      <div>
        <button
          onClick={handleDecrementSample}
          style={{ marginRight: "100px", borderRadius: "50px" }}
        >
          <ChevronLeftCircle size={64} width={"200px"} />
        </button>
        <button
          onClick={handleIncrementSample}
          style={{ marginLeft: "100px", borderRadius: "50px" }}
        >
          <ChevronRightCircle size={64} width={"200px"} />
        </button>
      </div>
      <button
        onClick={() => {
          addCard(frontInputValue, backInputValue);
        }}
      >
        add
      </button>
      <div>Current cards: {formatSample()}</div>
    </center>
  );
};

export default HomePage;
