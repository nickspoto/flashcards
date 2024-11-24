import path from "path";
import express, { Express } from "express";
import cors from "cors";
import fetch from "node-fetch";
const app: Express = express();
import {
  getFlashCard,
  deleteCard,
  addCardCarousel,
  addUser,
  getAllFlashCards,
} from "./cardmanager";

const hostname = "0.0.0.0";
const port = 8080;
app.use(cors());
app.use(express.json());

app.get("/edit/:id/:name", async (req, res) => {
  console.log("GET /edit was called");
  try {
    const id = req.params.id;
    const setName = req.params.name;
    const cards = await getFlashCard(id, setName); //tries to get cards from the set 'setName'
    if (cards === null) {
      res.status(404).send({
        error: `ERROR: no cards associated with set ${setName} with user id ${id} found in Firestore`,
      });
    } else {
      res.status(200).send({
        message: `SUCCESS retrieved cards from person with id: ${id} from the user collection in Firestore`,
        cards,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /edit/:id/:index endpoint: ${error}`,
    });
  }
});

app.get("/view/:id", async (req, res) => {
  console.log("GET /edit was called");
  try {
    const id = req.params.id;
    const cards = await getAllFlashCards(id); //tries to get cards from the set 'setName'
    if (cards === null) {
      res.status(404).send({
        error: `ERROR: no cards associated with user id ${id} found in Firestore`,
      });
    } else {
      res.status(200).send({
        message: `SUCCESS retrieved cards from person with id: ${id} from the user collection in Firestore`,
        cards,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /edit/:id/:index endpoint: ${error}`,
    });
  }
});

app.delete("/delete/:id/:name", async (req, res) => {
  console.log("[DELETE] /delete was called");
  const id = req.params.id;
  const setName = req.params.name;
  try {
    await deleteCard(id, setName);
    res.status(200).send({
      message: `SUCCESS deleted cards from person with id: ${id} from the user collection in Firestore.`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /delete/:id/:index endpoint: ${err}. Could not delete set ${setName} from user ${id}`,
    });
  }
});

//adds a new set of cards to the db - should be post, but it can also update cards
app.put("/edit/:id/:name", async (req, res) => {
  console.log("[PUT] entering '/edit/:id' endpoint");
  const cards = req.body.cards;
  const id = req.params.id;
  const name = req.params.name;
  console.log(cards);
  try {
    await addCardCarousel(id, cards, name);
    res.status(200).send({
      message: `SUCCESS added cards ${cards} to person with netid: ${id} to the people collection in Firestore as a new set`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /edit/:id/:name endpoint: ${err}. Tried to add ${cards} with name ${name}`,
    });
  }
});

//adds a new user to the db
app.post("/user/:id", async (req, res) => {
  console.log("[Post] entering '/user/:id' endpoint");
  const id = req.params.id;
  try {
    await addUser(id);
    res.status(200).send({
      message: `SUCCESS added person with netid: ${id} to the people collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /user/:id endpoint: ${err}`,
    });
  }
});

app.listen(port, hostname, () => {
  console.log(`Listening on port ${port}`);
});
