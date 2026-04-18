import React from 'react'

const Keyboard = ({ disabled, onGuess, guessedLitters }) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
    return (
        <div>
            <div className="mt-4">
                {alphabet.map((letter) =>

                    <button key={letter}
                        disabled={guessedLitters.includes(letter) || disabled}
                        onClick={() => { onGuess(letter) }}
                        className='btn btn-outline-dark mx-1' >{letter.toUpperCase()}</button>
                )}
            </div>
        </div>
    )
}

export default Keyboard
