import React, { useState, useEffect } from 'react'
import './Main.css'

interface Person {
    name: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    birth_year: string
    gender: string
}

interface MainProps {}

const Main: React.FC<MainProps> = () => {
    const [error, setError] = useState<Error | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState<Person[]>([])

    useEffect(() => {
        const savedValue = localStorage.getItem('inputValue')
        console.log(savedValue)
        window.addEventListener('storage', (event) => console.log(event))
        if (savedValue) {
            fetch(`https://swapi.dev/api/people/?search=${savedValue}`)
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true)
                        setItems(result.results)
                    },
                    (error) => {
                        setIsLoaded(true)
                        setError(error)
                    }
                )
        } else {
            fetch('https://swapi.dev/api/people/')
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true)
                        setItems(result.results)
                    },
                    (error) => {
                        setIsLoaded(true)
                        setError(error)
                    }
                )
        }
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div className="load">Loading...</div>
    } else {
        return (
            <div className="wrapperMain">
                {items.map((item, index) => (
                    <div key={index} className="card">
                        <p>Name: {item.name}</p>
                        <p>Height: {item.height}</p>
                        <p>Mass: {item.mass}</p>
                        <p>Birth Year: {item.birth_year}</p>
                        <p>Gender: {item.gender}</p>
                    </div>
                ))}
            </div>
        )
    }
}

export default Main
