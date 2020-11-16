import React from "react";
import ReactCardFlip from "react-card-flip";

const cardBack = {
  background: "#3700B3",
};

export default function MemoryCard({ id, imgUrl, flipped, guessed, flip }) {
  const flipCard = (e) => {
    if (guessed || flipped) return;
    flip(e.target.id);
  };
  return (
    <div className="card">
      <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
        <div
          id={id}
          className="memoryCard front"
          style={cardBack}
          key="front"
          onClick={flipCard}
        />
        <div
          className="memoryCard"
          key="back"
          onClick={flipCard}
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundColor: guessed ? "green" : "#3700B3",
            cursor: guessed ? "" : "pointer",
          }}
        ></div>
      </ReactCardFlip>
    </div>
  );
}
