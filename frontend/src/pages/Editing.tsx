import { useState } from "react";
import FlashCard from "../components/FlashCard";
import { useUser } from "../UserContext";

const Editing = () => {
  const { user } = useUser();
  const [cards, setCards] = useState<{ front: string; back: string }[]>([
    {
      front:
        "Starter card. Press add card below to add more or import a set above.",
      back: `You are logged in as user ${user?.email ?? "anonymous"}.`,
    },
  ]);
  const [importMessage, setImportMessage] = useState<string>(
    "No set imported yet."
  );
  const [flips, setFlips] = useState<boolean[]>([false]); //handles the flips for each card separately
  const [setName, setSetName] = useState("");

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

  const loadCards = async (user: string, setName: string) => {
    const url = `http://localhost:8080/edit/${user}/${setName}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      console.log(response.url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response);
      const cards = await response.json();
      console.log(cards);
      setImportMessage(`Imported ${setName}.`);
      return cards.cards;
      // Handle the response data as needed
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      setImportMessage(`Could not import ${setName}.`);
    }
  };

  const importCards = async () => {
    //convert to front, back
    console.log(`importing ${setName}...`);
    const cards = await loadCards(user?.email ?? "", setName);
    const frontBackConverter = [];
    for (let i = 0; i < cards.length - 1; i += 2) {
      const front = cards[i];
      const back = cards[i + 1];
      frontBackConverter.push({ front: front, back: back });
    }
    setCards(frontBackConverter);
  };

  const saveEdits = async () => {
    console.log(`saving cards ${setName}...`);
    const url = `http://localhost:8080/edit/${user?.email ?? ""}/${setName}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cards: convertCardsToSingleArray(cards) }), //cards
      });
      console.log(response.url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(
        `You updated set ${setName} to ${JSON.stringify({
          cards: convertCardsToSingleArray(cards),
        })} under user ${user?.email}`
      );
      console.log(response);
      // Handle the response data as needed
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation. Could not save: ",
        error
      );
    }
  };

  const convertCardsToSingleArray = (
    cardList: { front: string; back: string }[]
  ) => {
    const result: string[] = [];

    cardList.forEach((card) => {
      result.push(card.front, card.back); // Push front followed by back
    });

    return result;
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
    <div
      style={{ paddingLeft: "15px", display: "flex", flexDirection: "column" }}
    >
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
          placeholder="Flashcard set name"
          value={setName}
          onChange={(e) => setSetName(e.target.value)}
        />
      </div>
      <button
        onClick={importCards}
        style={{
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
          marginBottom: "20px",
          width: "25%",
        }}
      >
        Import cards from current user and setName
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
        <div>{importMessage}</div>
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
        <button
          onClick={saveEdits}
          style={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            marginBottom: "20px",
            width: "25%",
          }}
        >
          Save edits
        </button>
        <div>Current cards: {formatSample()}</div>
      </div>
    </div>
  );
};

export default Editing;
