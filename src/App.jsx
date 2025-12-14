//CSS
import "./App.css";

//React
import { useEffect, useState } from "react";

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

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);

  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessdLetters, setGuessdLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    //pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category);

    //pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    console.log(word);

    return { word, category };
  };

  //start the secret word game
  function startGame() {
    //pick word and pick game
    const { word, category } = pickWordAndCategory();

    //create an array of latters
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word, category);
    console.log(wordLetters);

    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }

  //process the letter input
  function verifyLetter(letter) {
    const normalzedLetter = letter.toLowerCase();

    //check if letter has already been utilized
    if (
      guessdLetters.includes(normalzedLetter) ||
      wrongLetters.includes(normalzedLetter)
    ) {
      return;
    }

    //push guessed letter or remove a guess
    if (letters.includes(normalzedLetter)) {
      setGuessdLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalzedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalzedLetter,
      ]);

      setGuesses((actualGuesse) => actualGuesse - 1);
    }
  }

  function clearLetterState() {
    setGuessdLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {
    if (guesses <= 0) {
      //reset all states
      clearLetterState();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  //restarts the game
  function retry() {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessdLetters={guessdLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
