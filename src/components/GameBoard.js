import React, { useEffect, useState } from "react";
import MemoryCard from "./MemoryCard";
export default function GameBoard({ cards, handleClick }) {
  const countFlippedCards = () => {
    return cards.filter(({ flipped, guessed }) => flipped && !guessed).length;
  };

  const handleFlip = (id) => {
    switch (countFlippedCards()) {
      case 0:
        break;

      default:
        break;
    }
  };

  const generateCards = () => {
    return cards.map((card) => (
      <MemoryCard
        key={card.id}
        flipped={card.flipped}
        guessed={card.guessed}
        id={card.id}
        imgUrl={card.url}
        flip={handleFlip}
      />
    ));
  };

  return <div className="cards">{generateCards()}</div>;
}
