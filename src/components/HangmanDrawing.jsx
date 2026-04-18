import React from 'react'

const HangmanDrawing = ({ wronGuesses, gameStatus }) => {
    return (
        <>
            {gameStatus === "won" && <h3 className='text-success'>Is Winner</h3>}

            <div className={`mt-5 ${gameStatus === "won" ? "d-none" : ""} `}>
                <div className="hangman">
                    <div className="pole-vertical"></div>
                    <div className="pole-horizontal"></div>
                    <div className="rope"></div>
                    {wronGuesses > 0 && <div className='head'></div>}
                    {wronGuesses > 1 && <div className='body'></div>}
                    {wronGuesses > 2 && <div className='arm left'></div>}
                    {wronGuesses > 3 && <div className='arm right'></div>}
                    {wronGuesses > 4 && <div className='leg left'></div>}
                    {wronGuesses > 5 && <div className='leg right'></div>}
                </div>
                <div className={`mt-5 ${gameStatus === "lose" ? "" : "d-none"} `}>
                    <h3 className='text-danger'>Game Over !!</h3>
                </div>

            </div>
        </>
    )
}

export default HangmanDrawing
