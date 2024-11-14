import { useState } from "react";
import FlashCard from "../components/FlashCard";

const Editing = () => {
  const [cards, setCards] = useState<{ front: string; back: string }[]>([
    { front: "Starter card. Press add card below to add more.", back: "" },
  ]);
  const [flips, setFlips] = useState<boolean[]>([false]); //handles the flips for each card separately
  const [user, setUser] = useState("");
  const [index, setIndex] = useState("");

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

  const addApiCard = async (user: string, index: string) => {
    const url = `http://localhost:8080/edit/${user}/${index}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      console.log(response.url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const cards = await response.json();
      return cards.cards;
      // Handle the response data as needed
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  const importCards = async () => {
    //convert to front, back
    const cards = await addApiCard(user, index);
    const frontBackConverter = [];
    for (let i = 0; i < cards.length - 1; i += 2) {
      const front = cards[i];
      const back = cards[i + 1];
      frontBackConverter.push({ front: front, back: back });
    }
    setCards(frontBackConverter);
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
        id="import"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
          gap: "20px",
        }}
      >
        <input
          type="text"
          placeholder="User"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="Index or all"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />
      </div>
      <button
        onClick={importCards}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "40%",
          marginBottom: "20px",
        }}
      >
        Import cards from user and index
      </button>
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
