import { db } from "./firebase";

const userCollectionRef = db.collection("users");

//gets flashcard set associated with a user
export const getFlashCard = async (user: string, setName: string) => {
  const personRef = userCollectionRef.doc(user); //loads the specific user
  const sets = personRef.collection("cardSets"); //get all the sets from the user
  const requestedSet = sets.doc(setName);
  const cardsData = await requestedSet.get();
  return (await cardsData.data()?.cards) ?? null;
};

//returns all flashcard sets associated with a user
export const getAllFlashCards = async (user: string) => {
  const personRef = userCollectionRef.doc(user); //loads the specific user
  const sets = personRef.collection("cardSets"); //get all the sets from the user
  let cardCollection: string[][] = [];
  await sets.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      cardCollection.push(doc.data().cards); //push each set seperately
    });
  });
  return cardCollection;
};

//delete flashcard set associated with a user
export const deleteCard = async (user: string, setName: string) => {
  const personRef = userCollectionRef.doc(user); //loads the specific user
  const sets = personRef.collection("cardSets"); //get all the sets from the user
  const requestedSet = sets.doc(setName);
  return await requestedSet.delete(); //try to delete the card set
};

//adds or updates the set corresponding to this setName
export const addCardCarousel = async (
  id: string,
  cards: string[],
  setName: string
) => {
  const personRef = userCollectionRef.doc(id); //gets the unique user
  const sets = personRef.collection("cardSets"); //gets the cards from the person
  return await sets.doc(setName).set({ cards: cards }); // Add the document with the provided setName as the document ID
};

//adds user to server
export const addUser = async (id: string) => {
  return await userCollectionRef.doc(id);
};

export const addFlashCard = async (user: string, card: string[]) => {};
