import { useState } from "react";
import FlashCard from "../components/FlashCard";
// import { db } from "./firebase.ts";
// const userCollectionRef = db.collection("users");
//import "C:/Users/nicon/Web-trends/flashcards/backend/server.ts";

const Editing = () => {
  const [cards, setCards] = useState<{ front: string; back: string }[]>([
    { front: "Starter card. Press add card below to add more.", back: "" },
  ]);
  const [flips, setFlips] = useState<boolean[]>([false]); //handles the flips for each card separately

  const fetchEditData = async () =>
    fetch("https://randomuser.me/api") //this will be the get function - but replace with
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });

  fetchEditData();

  const addCard = () => {
    setCards([...cards, { front: "", back: "" }]);
    setFlips([...flips, false]);
  };

  const handleFlip = (index: number) => {
    const newFlips = [...flips];
    newFlips[index] = !newFlips[index];
    setFlips(newFlips);
  };

  const updateCard = (index: number, front: string, back: string) => {
    const newCards = cards.map((card, i) =>
      i === index ? { front, back } : card
    );
    setCards(newCards);
  };

  const formatSample = () => {
    let newStr = "";
    for (const card of cards) {
      newStr += "[";
      newStr += card.front;
      newStr += ", ";
      newStr += card.back;
      newStr += "], ";
    }
    return newStr;
  };

  return (
    <div style={{ paddingLeft: "15px" }}>
      <h1>
        Edit your cards in this tab. For now, this is just an empty flashcard,
        but you will eventually be able to navigate to this page by clicking a
        button on a flashcard to edit it.
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingRight: "20px",
          paddingLeft: "20px",
          gap: "30px",
        }}
      >
        {cards.map((card, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            {FlashCard(card.front, card.back, flips[index], () =>
              handleFlip(index)
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
                gap: "20px",
              }}
            >
              {" "}
              {/*input buttons here*/}
              <input
                type="text"
                placeholder="Front"
                value={card.front}
                onChange={(e) => updateCard(index, e.target.value, card.back)}
              />
              <input
                type="text"
                placeholder="Back"
                value={card.back}
                onChange={(e) => updateCard(index, card.front, e.target.value)}
              />
            </div>
          </div>
        ))}
        <button onClick={addCard}>Add Card</button>
        <div>Current cards: {formatSample()}</div>
      </div>
    </div>
  );
};

export default Editing;
