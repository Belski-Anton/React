import React, { useState } from 'react'
import './ButtonWithError.css'

const ButtonWithError: React.FC = () => {
    const [hasError, setHasError] = useState(false)

    const handleClick = () => {
        setHasError(true)
    }

    if (hasError) {
        throw new Error('Упс! Ошибка')
    }

    return (
        <button className="errorBtn" onClick={handleClick}>
            Cause errors
        </button>
    )
}

export default ButtonWithError
