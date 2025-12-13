//CSS
import "./App.css";

//React
import { useCallback, useEffect, useState } from "react";

//components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

//data
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);

  const [words] = useState(wordsList);

  //start the secret word game
  function startGame() {
    setGameStage(stages[1].name);
  }

  //process the letter input
  function verifyLetter() {
    setGameStage(stages[2].name);
  }

  //restarts the game
  function retry(){
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} />}
      {gameStage === "end" && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
