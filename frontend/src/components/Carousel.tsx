import FlashCard from "./FlashCard";
import { useState } from "react";

const Carousel = (cards: string[][], currentCard: number) => {
  const [flipped, updateFlipped] = useState(false);

  const handleFlip = () => {
    updateFlipped(!flipped);
  };

  return (
    <div>
      {FlashCard(
        cards[currentCard][0],
        cards[currentCard][1],
        flipped, //initialize flipped state
        handleFlip //flip handling function
      )}
    </div>
  );
};
export default Carousel;
