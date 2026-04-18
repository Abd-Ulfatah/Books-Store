import { useEffect, useState } from 'react'
import './App.css'
import HangmanDrawing from './components/HangmanDrawing'
import WordDisplay from './components/WordDisplay'
import Keyboard from './components/Keyboard'

function App() {
  // Variables : 
  const [words, setWords] = useState([
    "java",
    "html",
    "php",
    "python",
    "javascript",
    "react"
  ])

  const MAX_WRONG = 6
  const [word, setWord] = useState("")
  const [guessedLitters, setGuessedLitters] = useState([])
  const [wronGuesses, setWronGuesses] = useState(0)
  const [gameStatus, setGameStatus] = useState("playing")

  // First Run Befor Loaded Page  :
  useEffect(() => {
    resetGame()
  }, [])

  // Functions :

  // Reset Game :
  const resetGame = () => {
    const rnd = words[Math.floor(Math.random() * words.length)]
    setWord(rnd)
    setGuessedLitters([])
    setWronGuesses(0)
    setGameStatus("playing")

  }

  // Handle Guess :

  const handleGuess = (letter) => {
    if (gameStatus !== "playing") return
    if (guessedLitters.includes(letter)) return

    setGuessedLitters((prev) => [...prev, letter])

    if (!word.includes(letter)) {
      setWronGuesses((wrong) => wrong + 1)
    }

  }

  //won Or lose : 
  useEffect(() => {
    if (!word) return
    const isWinner = word.split("").every((letter) => guessedLitters.includes(letter))

    if (isWinner) setGameStatus("won")

    if (wronGuesses >= MAX_WRONG) setGameStatus("lose")

  }, [guessedLitters, wronGuesses, word])


  return (
    <>
      <div className="container text-center mt-5">
        <div className='d-flex justify-content-between'>
          <h3>Status : {gameStatus}</h3>
          <h3 className='text-danger'> Guesses : {MAX_WRONG}/{wronGuesses}</h3>
        </div>
        <h1>Hangman Game</h1>

        <HangmanDrawing wronGuesses={wronGuesses} gameStatus={gameStatus} />
        <WordDisplay word={word} guessedLitters={guessedLitters} />
        <Keyboard guessedLitters={guessedLitters} onGuess={handleGuess} disabled={gameStatus != "playing"} />
        <button className='btn btn-danger mt-5' onClick={resetGame}>Reset Game</button>
      </div>


    </>
  )
}

export default App
