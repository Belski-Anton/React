import { useRef, useState } from 'react'
import './Forms.css'
import CheckBox from '../checkbox/CheckBox'
import InputImg from '../inputimg/InputImg'
import RadioButton from '../radiobutton/RadioButton'
import Input from '../input/Input'
import Button from '../button/Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { formActions } from '../../store/formSlice'
import InputAutoComplete from '../input/InputAutoComplete'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

const formSchema = yup
    .object({
        email: yup
            .string()
            .email('Invalid email format')
            .required('Email is required'),
        password: yup
            .string()
            .min(4)
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            ),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required('Password confirmation is required'),
        name: yup.string().required('Name is required'),
        age: yup
            .number()
            .positive('Age must be a positive number')
            .integer('Age must be an integer')
            .required('Age is required'),
        country: yup.string().required('Country is required'),
        gender: yup
            .string()
            .oneOf(['male', 'female'], 'Invalid gender')
            .required('Gender is required'),
        isAgree: yup
            .boolean()
            .oneOf([true], 'You must agree to continue')
            .required('You must agree to continue'),
    })
    .required()

type ErrorsType = {
    email: string
    password: string
    confirmPassword: string
    name: string
    age: string
    country: string
    gender: string
    isAgree: string
}

const Forms = () => {
    const navigate = useNavigate()
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null)
    const nameRef = useRef<HTMLInputElement | null>(null)
    const ageRef = useRef<HTMLInputElement | null>(null)
    const maleRef = useRef<HTMLInputElement | null>(null)
    const femaleRef = useRef<HTMLInputElement | null>(null)
    const bodyInputRef = useRef<HTMLInputElement | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const countryRef = useRef<HTMLInputElement | null>(null)
    const agreeRef = useRef<HTMLInputElement | null>(null)
    const dispatch = useDispatch<AppDispatch>()

    const [errors, setErrors] = useState<ErrorsType>({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        age: '',
        country: '',
        gender: '',
        isAgree: '',
    })

    const handleChange = async () => {
        const formData = {
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
            confirmPassword: confirmPasswordRef.current?.value || '',
            name: nameRef.current?.value || '',
            age: ageRef.current ? parseInt(ageRef.current.value, 10) : 0,
            gender: maleRef.current?.checked
                ? 'male'
                : femaleRef.current?.checked
                ? 'female'
                : '',
            image: imgRef.current?.src || '',
            country: countryRef.current?.value || '',
            isAgree: agreeRef.current?.checked || false,
        }

        try {
            await formSchema.validate(formData, { abortEarly: false })
            dispatch(formActions.addForm(formData))
            navigate(`../`)
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const newErrors: ErrorsType = {
                    email: '',
                    password: '',
                    confirmPassword: '',
                    name: '',
                    age: '',
                    country: '',
                    gender: '',
                    isAgree: '',
                }

                err.inner.forEach((error) => {
                    if (
                        typeof error.path === 'string' &&
                        error.path in newErrors
                    ) {
                        newErrors[error.path as keyof ErrorsType] =
                            error.message
                    }
                })

                setErrors(newErrors)
            }
        }
    }

    return (
        <div className="wrapper_form">
            <div className="form">
                <h1>Registration</h1>
                <h2>Enter your personal details</h2>
                <form className="wrapper_input">
                    <div className="wrapper_input">
                        <Input
                            ref={emailRef}
                            type="email"
                            name="email"
                            placeholder="Enter your email ..."
                        />
                        {errors.email && (
                            <div
                                style={{
                                    fontSize: '10px',
                                    color: 'red',
                                    position: 'absolute',
                                    top: '75px',
                                }}
                                className="error-message"
                            >
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div className="wrapper_input">
                        <Input
                            ref={passwordRef}
                            type="password"
                            name="password"
                            placeholder="Enter your password..."
                        />
                        {errors.password && (
                            <div
                                style={{
                                    fontSize: '10px',
                                    color: 'red',
                                    position: 'absolute',
                                    top: '75px',
                                }}
                                className="error-message"
                            >
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <div className="wrapper_input">
                        <Input
                            ref={confirmPasswordRef}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm the password..."
                        />
                        {errors.confirmPassword && (
                            <div
                                style={{
                                    fontSize: '10px',
                                    color: 'red',
                                    position: 'absolute',
                                    top: '75px',
                                }}
                                className="error-message"
                            >
                                {errors.confirmPassword}
                            </div>
                        )}
                    </div>
                    <div className="wrapper_input">
                        <Input
                            ref={nameRef}
                            type="text"
                            name="name"
                            placeholder="Enter your name... "
                        />
                        {errors.name && (
                            <div
                                style={{
                                    fontSize: '10px',
                                    color: 'red',
                                    position: 'absolute',
                                    top: '75px',
                                }}
                                className="error-message"
                            >
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="wrapper_input">
                        <Input
                            ref={ageRef}
                            type="text"
                            name="age"
                            placeholder="Enter your age... "
                        />
                        {errors.age && (
                            <div
                                style={{
                                    fontSize: '10px',
                                    color: 'red',
                                    position: 'absolute',
                                    top: '75px',
                                }}
                                className="error-message"
                            >
                                {errors.age}
                            </div>
                        )}
                    </div>
                    <div className="wrapper_input">
                        <InputAutoComplete
                            countryRef={countryRef}
                            type="text"
                            name="country"
                            placeholder="Country"
                        />
                        {errors.country && (
                            <div
                                style={{
                                    fontSize: '10px',
                                    color: 'red',
                                    position: 'absolute',
                                    top: '75px',
                                }}
                                className="error-message"
                            >
                                {errors.country}
                            </div>
                        )}
                    </div>
                </form>
                <RadioButton refMale={maleRef} refFemale={femaleRef} />
                <InputImg imgRef={imgRef} bodyInputRef={bodyInputRef} />
                <CheckBox agreeRef={agreeRef} />
                <Button onClick={handleChange} />
            </div>
        </div>
    )
}

export default Forms
