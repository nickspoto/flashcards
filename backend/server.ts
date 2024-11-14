import path from "path";
import express, { Express } from "express";
import cors from "cors";
import fetch from "node-fetch";
const app: Express = express();
import { getFlashCard, addCard } from "./cardmanager";

const hostname = "0.0.0.0";
const port = 8080;
app.use(cors());
app.use(express.json());

app.get("/edit/:id/:index", async (req, res) => {
  console.log("GET /edit was called");
  try {
    const id = req.params.id;
    const index = req.params.index;
    const cards = await getFlashCard(id, index);
    if (cards === null) {
      res.status(404).send({
        error: `ERROR: person with id: ${id} not found in Firestore`,
      });
    } else {
      res.status(200).send({
        message: `SUCCESS retrieved cards from person with id: ${id} from the user collection in Firestore.`,
        cards,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /edit/:id/:index endpoint: ${error}`,
    });
  }
});

app.put("/edit/:id", async (req, res) => {
  console.log("[PUT] entering '/edit/:id' endpoint");
  const card: string[] = req.body;
  const id = req.params.id;
  try {
    await addCard(id, card);
    res.status(200).send({
      message: `SUCCESS added card ${card} to person with netid: ${id} to the people collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /edit/:id endpoint: ${err}`,
    });
  }
});

app.listen(port, hostname, () => {
  console.log(`Listening on port ${port}`);
});
