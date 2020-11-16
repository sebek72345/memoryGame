import React, { useEffect, useState } from "react";
import MemoryCard from "./MemoryCard";

export default function GameBoard({ cards, won, click }) {
  const [memoryCards, setMemoryCards] = useState(cards);
  useEffect(() => {
    setMemoryCards(memoryCards);
    console.log("one");
  }, [memoryCards]);

  const countFlippedCards = () => {
    return memoryCards.filter(({ flipped, found }) => flipped && !found).length;
  };

  const flipCard = (id, cb) => {
    const tempCard = memoryCards.map((card) => {
      if (card.id === id) {
        card.flipped = true;
        console.log("ss");
      }
      return card;
    });
    setMemoryCards(tempCard);
    if (cb) {
      cb();
    }
  };

  const handleFlip = (id) => {
    switch (countFlippedCards()) {
      case 0:
        flipCard(id);
        break;
      case 1:
        click();
        flipCard(id, () => {
          isMatch();
        });
        break;
      default:
        break;
    }
  };

  const isMatch = () => {
    const flippedCards = memoryCards.filter(
      (card) => card.flipped && !card.found
    );
    if (
      flippedCards[0].matchesId === flippedCards[1].id ||
      flippedCards[1].matchesId === flippedCards[0].id
    ) {
      memoryCards.map((card) => {
        switch (card.id) {
          case flippedCards[0].id:
          case flippedCards[1].id:
            card.found = true;
            return card;
          default:
            return card;
        }
      });
      hasWon();
    } else {
      setTimeout(() => {
        memoryCards[memoryCards.indexOf(flippedCards[0])].flipped = false;
        memoryCards[memoryCards.indexOf(flippedCards[1])].flipped = false;
        setMemoryCards(memoryCards);
      }, 800);
    }
  };

  const hasWon = () => {
    let won = memoryCards.every((card) => card.found);
    if (won) {
      won();
    }
  };

  const createBoard = () =>
    memoryCards.map((card) => (
      <MemoryCard
        key={card.id}
        flipped={card.flipped}
        found={card.found}
        id={card.id}
        imgUrl={card.url}
        flip={handleFlip}
      />
    ));

  return <div className="cards">{createBoard()}</div>;
}
