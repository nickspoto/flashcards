import { useUser } from "../UserContext";
import { SetStateAction, useEffect, useState } from "react";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import FlashCard from "../components/FlashCard";

const View = () => {
  const { user } = useUser();
  const [userCards, setUserCards] = useState<string[][]>([["", ""]]);
  const [currCard, setCurrCard] = useState([0]);
  const [flips, setFlips] = useState<boolean[]>([false]); //handles the flips for each carousel separately
  const [inputValue, setInputValue] = useState("");
  const [addMessage, setAddMessage] = useState("");

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

  //changes the name of the set input at the bottom of the page for creating new sets
  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const addSet = async (setName: string) => {
    if (user !== null) {
      const url = `http://localhost:8080/edit/${user?.email}/${setName}`;
      setAddMessage(`Adding set ${inputValue}...`);
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cards: ["", ""] }), //empty cards initially in array
        });
        console.log(response.url);
        if (!response.ok) {
          setAddMessage("Could not add this set. Please try again.");
          throw new Error("Network response was not ok");
        }
        setAddMessage(`Added set ${inputValue}. Please check above.`);
        console.log(response);
        // Handle the response data as needed
      } catch (error) {
        setAddMessage("Could not add this set. Please try again.");
        console.error(
          "There has been a problem adding a new set of cards. Please try again.",
          error
        );
      }
    } else {
      setAddMessage(`Please login to add sets.`);
    }
  };

  //imports the cards if a user is here or if addSet is called
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
  }, [user, addMessage]); //changes when the user changes or when a set is added (changes the message when a set gets added)

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
            style={{
              marginBottom: "20px",
              paddingBottom: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", //horizontal centering
            }}
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
                style={{
                  marginRight: "30px",
                  borderRadius: "20px",
                  minWidth: "100px",
                }}
              >
                Delete
              </button>

              <button
                style={{
                  borderRadius: "20px",
                  minWidth: "100px",
                }}
              >
                Edit
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
      <button
        onClick={() => addSet(inputValue)}
        style={{
          marginBottom: "20px",
          padding: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Add new set
      </button>
      <input
        placeholder="Type set name here"
        value={inputValue}
        style={{ marginBottom: "10px" }}
        onChange={handleInputChange}
      ></input>
      <div>{addMessage}</div>
    </div>
  );
};

export default View;
