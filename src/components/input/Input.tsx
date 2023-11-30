import React, { HTMLInputTypeAttribute, forwardRef } from 'react'
import './Input.css'

interface InputProps {
    type: HTMLInputTypeAttribute
    name: string
    placeholder: string
}

const Input = forwardRef(
    (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
        return <input ref={ref} {...props} />
    }
)

export default Input
