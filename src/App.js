import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import NewGame from "./components/NewGame";
import PlayAgain from "./components/PlayAgain";
import moment from "moment";
export default function App() {
  let [newGame, setNewGame] = useState(false);
  let [won, setWon] = useState(false);
  let [cards, setCards] = useState([]);
  let [clicks, setClicks] = useState(0);
  let [time, setTime] = useState([]);

  const countClicks = () => {
    setClicks(++clicks);
  };

  const generateDeck = () => {
    setCards([]);
    let amount = 10;
    let tempCards = [];
    for (let i = 1; i < amount + 1; i++) {
      let id = createId();
      let id2 = createId();
      let rand = Math.floor(Math.random() * 300) + 1;
      const card1 = {
        id: id,
        matchesId: id2,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rand}.png`,
        flipped: false,
        found: false,
      };
      const card2 = {
        id: id2,
        matchesId: id,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rand}.png`,
        flipped: false,
        found: false,
      };

      tempCards.push(card1);
      tempCards.push(card2);
    }
    shuffleCards(tempCards);
    setCards(tempCards);
  };

  const shuffleCards = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const resetGame = () => {
    setWon(false);
    setTime([]);
    setCards([]);
    setClicks(0);
    initGame();
  };

  const hasWon = () => {
    setWon(true);
    const actualTime = moment().format("h:mm:ss");
    const ms = moment(actualTime, "h:mm:ss").diff(moment(time, "h:mm:ss"));
    const timeData = moment.duration(ms)._data;
    setTime(
      `Your time : ${timeData.hours} h, ${timeData.minutes} m,  ${timeData.seconds} s`
    );
  };

  const initGame = () => {
    generateDeck();
    setNewGame(true);
  };

  return (
    <div>
      <h1 className="headline">MEMORY CARDS</h1>
      <div className="board-container">
        {newGame ? (
          <GameBoard cards={cards} won={hasWon} click={countClicks} />
        ) : null}
        {newGame && (
          <>
            <p className="message center">Total flips: {clicks}</p>
            <button className="btn" onClick={resetGame}>
              RESTART
            </button>
          </>
        )}
      </div>
      {won && (
        <div className="modal">
          <div className="won">
            <div className="message">{<h2>You win!</h2>}</div>
            <div className="message">{<h2>{time} </h2>}</div>
            <PlayAgain again={resetGame} />
          </div>
        </div>
      )}
      <div className="menu">
        <NewGame play={initGame} time={setTime} />
      </div>
    </div>
  );
}

const createId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
