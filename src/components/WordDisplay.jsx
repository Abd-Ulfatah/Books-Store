import React from 'react'

const WordDisplay = ({ guessedLitters, word }) => {
    return (
        <div className='fs-2 letter-spacing mt-4'>
            {word.split("").map((letter, i) => (
                <span key={i} className='mx-2 border-bottom border-dark d-' style={{width:"25px", display:"inline-block"}}>{
                    guessedLitters.includes(letter) ? letter : "_"
                }</span>
            ))}
        </div>
    )
}

export default WordDisplay
