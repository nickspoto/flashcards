import FlashCard from "./FlashCard";
import { useState } from "react";

const Carousel = (
  cards: string[][],
  currentCard: number,
  front: string,
  back: string
) => {
  const [sampleFlipped, updateSampleFlipped] = useState(false);

  const handleSampleFlip = () => {
    updateSampleFlipped(!sampleFlipped);
  };

  return (
    <div>
      {FlashCard(
        currentCard === cards.length || cards.length === 0
          ? front
          : cards[currentCard][0],
        currentCard === cards.length ? back : cards[currentCard][1],
        sampleFlipped, //initialize flipped state
        handleSampleFlip //flip handling function
      )}
    </div>
  );
};
export default Carousel;
