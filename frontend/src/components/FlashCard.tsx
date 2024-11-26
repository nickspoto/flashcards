/*General style of a flash card for the website. Update as needed for different themes
or to change positioning. For now this takes a set input and generates a card, but we can make this 
depend on a typeable field. Good start for now*/

import { MouseEventHandler } from "react";

const cardStyle = {
  perspective: "1000px",
  overflowWrap: "break-word" as const,
  wordWrap: "break-word" as const,
};

const flashStyle = {
  backgroundColor: "white",
  border: "solid rgba(0, 0, 0, 0.2) 1px",
  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
  borderRadius: "20px",
  minHeight: "400px",
  height: "auto",
  width: "800px",
  maxWidth: "800px", //this is just for now - eventually phase into relative width
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "20px",
  transition: "transform .5s",
  transformStyle: "preserve-3d" as const,
  overflowWrap: "break-word" as const,
  wordWrap: "break-word" as const,
};

const frontBackStyle = {
  position: "absolute" as const,
  height: "auto",
  width: "100%", // Ensure it takes the full width of the container
  maxWidth: "90%", // Limit the width to 90% to ensure padding space
  backfaceVisibility: "hidden" as const,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "20px",
  padding: "10px", // Combined padding for simplicity
  fontSize: "2rem",
  overflowWrap: "break-word" as const,
  wordWrap: "break-word" as const,
  whiteSpace: "normal" as const, // Ensure normal white space handling
  textAlign: "center" as const, // Center text alignment for better wrapping
};

const FlashCard = (
  front: string,
  back: string,
  flipped: boolean,
  onFlip: MouseEventHandler<HTMLDivElement> | undefined
) => {
  return (
    <div onClick={onFlip} style={cardStyle}>
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
