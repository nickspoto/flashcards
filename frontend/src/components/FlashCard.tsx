import { useState } from "react";

/*General style of a flash card for the website. Update as needed for different themes
or to change positioning. For now this takes a set input and generates a card, but we can make this 
depend on a typeable field. Good start for now*/

const cardStyle = {
  perspective: "1000px",
};

const flashStyle = {
  backgroundColor: "white",
  border: "solid rgba(0, 0, 0, 0.2) 1px",
  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
  borderRadius: "20px",
  height: "400px",
  width: "800px", //this is just for now - eventually phase into relative width
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "20px",
  transition: "transform .5s",
  transformStyle: "preserve-3d" as const,
};

const frontBackStyle = {
  position: "absolute" as const,
  height: "100%",
  width: "100%",
  backfaceVisibility: "hidden" as const,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "20px",
  paddingLeft: "10px",
  paddingRight: "10px",
  fontSize: "2rem",
};

const FlashCard = (front: string, back: string, flip: boolean) => {
  const [flipped, updateFlipped] = useState(flip);
  const handleFlip = () => {
    updateFlipped(!flipped);
  };
  return (
    <div onClick={handleFlip} style={cardStyle}>
      <div
        style={{
          ...flashStyle,
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          style={{
            ...frontBackStyle,
            transform: "rotateY(0deg)", // No rotation on front
          }}
        >
          {front}
        </div>
        <div
          style={{
            ...frontBackStyle,
            transform: "rotateY(180deg)", // Flip back side
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
