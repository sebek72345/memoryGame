import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";

const cardBack = {
  background: "#b326cf",
  borderRadius: "20%",
};

export default function MemoryCard({ id, imgUrl, flipped, guessed, flip }) {
  const [gameStart, setgameStart] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setgameStart(!gameStart);
    }, 2000);
  }, []);
  const flipCard = (e) => {
    if (guessed || flipped) return;
    flip(e.target.id);
  };

  return (
    <div className="card">
      <ReactCardFlip
        isFlipped={gameStart ? gameStart : flipped}
        flipDirection="horizontal"
      >
        <div
          id={id}
          className="memoryCard front"
          style={cardBack}
          key="front"
          onClick={flipCard}
        />
        <div
          className="memoryCard back"
          key="back"
          onClick={flipCard}
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundColor: guessed ? "green" : "#3b2980",
            cursor: guessed ? "" : "pointer",
          }}
        ></div>
      </ReactCardFlip>
    </div>
  );
}
