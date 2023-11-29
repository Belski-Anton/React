import { HTMLInputTypeAttribute } from 'react'
import './Input.css'
interface InputProps {
    type: HTMLInputTypeAttribute
    name: string
    placeholder: string
    value: string | number
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ type, name, placeholder, value, onChange }: InputProps) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

export default Input
