import { useEffect, useState } from "react";
import FlashCard from "../components/FlashCard";
import { useUser } from "../UserContext";
import { useParams } from "react-router-dom";

const Editing = () => {
  const { user } = useUser();
  const { setName } = useParams<{ setName: string }>();
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
    const url = `http://flashcards-ms4f.netlify.app/edit/${user}/${setName}`;
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

  const importCards = async (setName: string) => {
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

  useEffect(() => {
    if (setName && user) {
      importCards(setName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setName, user]);

  const saveEdits = async () => {
    console.log(`saving cards ${setName}...`);
    const url = `http://flashcards-ms4f.netlify.app/edit/${
      user?.email ?? ""
    }/${setName}`;
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

  const deleteCard = (index: number) => {
    const newCards = cards.filter((_, i) => i !== index);
    const newFlips = flips.filter((_, i) => i !== index);
    setCards(newCards);
    setFlips(newFlips);
    console.log(`current cards: ${formatSample()}`);
  };

  return (
    <div
      style={{ paddingLeft: "15px", display: "flex", flexDirection: "column" }}
    >
      <h1>
        Edit your cards in this tab. You can get here from any of your flashcard
        sets in the view tab. Make sure to save your edits below!
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
        <div>{importMessage}</div>
        {cards.map((card, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            {FlashCard(card.front, card.back, flips[index], () =>
              handleFlip(index)
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
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
                  onChange={(e) =>
                    updateCard(index, card.front, e.target.value)
                  }
                />
              </div>
              <button
                onClick={() => deleteCard(index)}
                style={{
                  borderRadius: "10px",
                  minWidth: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                Delete
              </button>
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
