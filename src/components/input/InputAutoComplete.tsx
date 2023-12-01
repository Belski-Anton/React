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
    const country = useSelector(
        (state: { country: { countries: string[] } }) => state.country.countries
    )

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

    return (
        <div className="autocomplete" onBlur={handleContainerBlur} tabIndex={0}>
            <input ref={countryRef} {...props} onFocus={handleInputFocus} />
            {isAutocompleteVisible && (
                <div className="autocomplete-items">
                    {country.map((suggestion: string, index: number) => (
                        <div
                            onClick={(e) => onClickCountry(e, suggestion)}
                            key={index}
                            className="autocomplete-item"
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default InputAutoComplete
