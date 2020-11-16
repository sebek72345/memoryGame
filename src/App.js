import "./App.css";
import NewGame from "./components/NewGame";
import GameBoard from "./components/GameBoard";
import { useState } from "react";

const gererateRandomString = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

function App() {
  const [newGame, setNewGame] = useState(true);
  const [cards, setCards] = useState([]);
  const [clicks, setClicks] = useState(0);

  const generateBoard = () => {
    const numberOfPairs = 10;
    const tempCard = [];
    for (let i = 0; i < numberOfPairs; i++) {
      const id1 = gererateRandomString();
      const id2 = gererateRandomString();
      const randomPokemon = Math.floor(Math.random() * 300);
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemon}.png`;
      const card1 = {
        id: id1,
        matchesId: id2,
        image,
        flipped: false,
        guessed: false,
      };
      const card2 = {
        id: id2,
        matchesId: id1,
        image,
        flipped: false,
        guessed: false,
      };
      tempCard.push(card1);
      tempCard.push(card2);
      const shuffleCard = shuffleCards(tempCard);

      setCards(shuffleCard);
    }
  };
  const shuffleCards = (cardsToShuffle) => {
    for (let i = cardsToShuffle.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = cardsToShuffle[i];
      cardsToShuffle[i] = cardsToShuffle[j];
      cardsToShuffle[j] = temp;
    }
    return cardsToShuffle;
  };
  const initGame = () => {
    setNewGame(true);
    generateBoard();
  };

  return (
    <div>
      <div className="board-container">
        <button onClick={initGame}>stars</button>
        {newGame ? <GameBoard cards={cards} handleClick={clicks} /> : null}
      </div>
      <div className="menu">
        <NewGame start={initGame} />
      </div>
    </div>
  );
}

export default App;
