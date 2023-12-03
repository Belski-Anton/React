import { HTMLInputTypeAttribute, useState } from 'react'
import './Input.css'
import { useSelector } from 'react-redux'

interface InputProps {
    type: HTMLInputTypeAttribute
    name: string
    placeholder: string
    countryRef: React.MutableRefObject<HTMLInputElement | null>
}

const InputAutoComplete = ({ countryRef, ...props }: InputProps) => {
    const countries = useSelector(
        (state: { country: { countries: string[] } }) => state.country.countries
    )
    const [suggestions, setSuggestions] = useState<string[]>(countries)

    const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false)

    const handleInputFocus = () => {
        setIsAutocompleteVisible(true)
    }

    const handleContainerBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (
            e.relatedTarget &&
            e.currentTarget.contains(e.relatedTarget as Node)
        ) {
            return
        }
        setIsAutocompleteVisible(false)
    }

    const onClickCountry = (
        e: React.MouseEvent<HTMLDivElement>,
        value: string
    ) => {
        e.stopPropagation()
        if (countryRef && countryRef.current) {
            countryRef.current.value = value
            setIsAutocompleteVisible(false)
        }
    }

    const filteredCountries = (searchText: string) => {
        setSuggestions(
            countries.filter(
                (el) =>
                    el.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
            )
        )
    }

    return (
        <div className="autocomplete" onBlur={handleContainerBlur} tabIndex={0}>
            <input
                ref={countryRef}
                {...props}
                onFocus={handleInputFocus}
                onChange={(e) => filteredCountries(e.target.value)}
            />
            {isAutocompleteVisible && (
                <div className="autocomplete-items">
                    {suggestions.length ? (
                        suggestions.map((suggestion: string, index: number) => (
                            <div
                                onClick={(e) => onClickCountry(e, suggestion)}
                                key={index}
                                className="autocomplete-item"
                            >
                                {suggestion}
                            </div>
                        ))
                    ) : (
                        <div className="autocomplete-item">Not result</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default InputAutoComplete
