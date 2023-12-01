import './Forms.css'
import { useRef } from 'react'
import CheckBox from '../checkbox/CheckBox'
import InputImg from '../inputimg/InputImg'
import RadioButton from '../radiobutton/RadioButton'
import Input from '../input/Input'
import Button from '../button/Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/srore'
import { formActions } from '../../store/formSlice'

const Forms = () => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null)
    const nameRef = useRef<HTMLInputElement | null>(null)
    const ageRef = useRef<HTMLInputElement | null>(null)
    const maleRef = useRef<HTMLInputElement | null>(null)
    const femaleRef = useRef<HTMLInputElement | null>(null)
    const bodyInputRef = useRef<HTMLInputElement | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const dispatch = useDispatch<AppDispatch>()

    const handleChange = () => {
        const emailValue = emailRef.current?.value || ''
        const passwordValue = passwordRef.current?.value || ''
        const confirmPasswordValue = confirmPasswordRef.current?.value || ''
        const nameValue = nameRef.current?.value || ''
        const ageValue = ageRef.current?.value || ''
        const gender = maleRef.current?.checked
            ? 'male'
            : femaleRef.current?.checked
            ? 'female'
            : ''
        const imgBased64 = imgRef.current?.src || ''
        dispatch(formActions.addEmail(emailValue))
        dispatch(formActions.addPassword(passwordValue))
        dispatch(formActions.addConfirmPassword(confirmPasswordValue))
        dispatch(formActions.addName(nameValue))
        dispatch(formActions.addAge(ageValue))
        dispatch(formActions.addGender(gender))
        dispatch(formActions.addGender(gender))
        dispatch(formActions.addImage(imgBased64))
    }

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
                <RadioButton refMale={maleRef} refFemale={femaleRef} />
                <InputImg imgRef={imgRef} bodyInputRef={bodyInputRef} />
                <CheckBox />
                <Button onClick={handleChange} />
            </div>
        </div>
    )
}

export default Forms
