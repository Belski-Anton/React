import './Forms.css'
import { useRef } from 'react'
import CheckBox from '../checkbox/CheckBox'
import InputImg from '../inputimg/InputImg'
import RadioButton from '../radiobutton/RadioButton'
import Input from '../input/Input'
import Button from '../button/Button'

const Forms = () => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null)
    const nameRef = useRef<HTMLInputElement | null>(null)
    const ageRef = useRef<HTMLInputElement | null>(null)

    return (
        <div className="wrapper_form">
            <div className="form">
                <h1>Registration</h1>
                <h2>Enter your personal details</h2>
                <form className="wrapper_input">
                    <Input
                        ref={emailRef}
                        type="email"
                        name="email"
                        placeholder="Enter your email ..."
                    />
                    <Input
                        ref={passwordRef}
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                    />
                    <Input
                        ref={confirmPasswordRef}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm the password..."
                    />
                    <Input
                        ref={nameRef}
                        type="text"
                        name="name"
                        placeholder="Enter your name... "
                    />
                    <Input
                        ref={ageRef}
                        type="text"
                        name="age"
                        placeholder="Enter your age... "
                    />
                </form>
                <RadioButton />
                <InputImg />
                <CheckBox />
                <Button />
            </div>
        </div>
    )
}

export default Forms
