import { db } from "./firebase";

const userCollectionRef = db.collection("users");

//gets flashcards associated with a user
export const getFlashCard = async (user: string, index: string) => {
  const personRef = userCollectionRef.doc(user); //loads the specific user
  const snapshot = await personRef.get(); //gets the user
  if (snapshot.exists) {
    const cards = snapshot.data()?.cards || []; //some cards associated or none
    if (cards[parseInt(index)] != null && cards[parseInt(index) + 1] != null) {
      return [cards[parseInt(index)], cards[parseInt(index) + 1]];
    } else {
      //anything other than a specific index inquiry just returns all the cards
      return cards;
    }
  }
};

//adds cards to a user
export const addCard = async (id: string, card: string[]) => {
  const personRef = userCollectionRef.doc(id); //gets the unique user
  const snapshot = await personRef.get(); //gets the data from the person
  const existingCards = snapshot.data()?.cards || [];
  if (existingCards === null) {
    return await personRef.update({ cards: card });
  }
  const newCards = [...existingCards, ...card]; //add new cards
  return await personRef.update({ cards: newCards }); //creates a new user with no name
};

export const addFlashCard = async (user: string, card: string[]) => {};
