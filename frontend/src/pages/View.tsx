import { useUser } from "../UserContext";
import { useEffect, useState } from "react";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import FlashCard from "../components/FlashCard";

const View = () => {
  const { user } = useUser();
  const [userCards, setUserCards] = useState<string[][]>([["", ""]]);
  const [currCard, setCurrCard] = useState([0]);
  const [flips, setFlips] = useState<boolean[]>([false]); //handles the flips for each carousel separately

  let currUser = null;
  if (user !== null) {
    currUser = user.email;
    //get all card sets associated with this user
  }

  const loadCards = async (user: string) => {
    const url = `http://localhost:8080/view/${user}`;
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
      return cards.cards;
      // Handle the response data as needed
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  /*converts an array of cards unordered (ex. ["front", "back", "front2", "back2"]) to front back pairs 
  (ex. [["front", "back"], ["front2", "back2"]])*/
  const convertCards3d = (cards: string[]) => {
    const array3d: string[][] = [];
    for (let i = 0; i < cards.length; i += 2) {
      array3d.push([cards[i], cards[i + 1]]);
    }
    return array3d;
  };

  const handleIncrement = (index: number) => {
    const converted = convertCards3d(userCards[index]);
    if (currCard[index] < converted.length - 1) {
      //don't let it increment past the last one
      setCurrCard((prev) => {
        const newCurrCards = [...prev];
        newCurrCards[index] += 1;
        return newCurrCards;
      });
    }
    //reset the flip to false on switching
    const newFlips = [...flips];
    newFlips[index] = false;
    setFlips(newFlips);
  };

  const handleDecrement = (index: number) => {
    if (currCard[index] > 0) {
      setCurrCard((prev) => {
        const newCurrCards = [...prev];
        newCurrCards[index] -= 1;
        return newCurrCards;
      });
    }
    //reset the flip to false on switching
    const newFlips = [...flips];
    newFlips[index] = false;
    setFlips(newFlips);
  };

  const handleFlip = (index: number) => {
    const newFlips = [...flips];
    newFlips[index] = !newFlips[index];
    setFlips(newFlips);
  };

  //imports the cards if a user is here
  useEffect(() => {
    const importCards = async () => {
      console.log(`importing cards from ${user}}...`);
      const cards = await loadCards(user?.email ?? "");
      if (cards != null) {
        setUserCards(cards);
        setFlips(Array(cards.length).fill(false)); //initializes all carousel flips to false
        setCurrCard(Array(cards.length).fill(0)); //initializes all current cards to 0
      }
    };
    if (user) {
      importCards();
    }
  }, [user]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column" as const,
        paddingRight: "20px",
        paddingLeft: "20px",
      }}
    >
      <h1>
        {currUser !== null
          ? `You are currently logged in as user ${user?.email}. Your flash card sets are displayed below in their carousels.   `
          : "You are not currently logged in. Please navigate to the login tab and login to view all your flashcard sets below."}
      </h1>
      <div>
        {userCards.map((cards, index) => (
          <div
            key={index}
            style={{ marginBottom: "20px", paddingBottom: "40px" }}
          >
            {FlashCard(
              convertCards3d(cards)[currCard[index]][0],
              convertCards3d(cards)[currCard[index]][1],
              flips[index],
              () => handleFlip(index)
            )}
            <div
              style={{
                paddingTop: "40px",
                paddingLeft: "15px",
                paddingRight: "15px",
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => handleDecrement(index)}
                style={{ marginRight: "100px", borderRadius: "50px" }}
              >
                <ChevronLeftCircle size={64} width={"200px"} />
              </button>
              <button
                onClick={() => handleIncrement(index)}
                style={{ marginLeft: "100px", borderRadius: "50px" }}
              >
                <ChevronRightCircle size={64} width={"200px"} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View;
