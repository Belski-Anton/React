import { useDispatch, useSelector } from 'react-redux'
import { IForm, formActions } from '../../store/formSlice'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './HookForms.css'
import '../inputimg/InputImg.css'
import '../radiobutton/RadioButton.css'
import { useNavigate } from 'react-router-dom'

const schema = yup
    .object({
        email: yup
            .string()
            .email('Invalid email format')
            .required('Email is required'),
        password: yup
            .string()
            .min(6, 'Password must be at least 6 characters long')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
        name: yup
            .string()
            .matches(/^[A-ZА-Я]/, 'Name must start with a capital letter')
            .required('Name is required'),

        age: yup
            .number()
            .positive('Age must be a positive number')
            .integer('Age must be an integer')
            .required('Age is required'),
        gender: yup.string().required('Gender is required'),
        image: yup.string().required('Image is required'),
        country: yup.string().required('Country is required'),
        isAgree: yup
            .boolean()
            .oneOf([true], 'You must agree to the terms and conditions'),
    })
    .required()

const HookForms = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IForm>({
        resolver: yupResolver(schema),
        defaultValues: {},
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<IForm> = (data: IForm) => {
        const formData = { ...data, image: imageBase64 }
        dispatch(formActions.addForm(formData))
        navigate(`../`)
    }

    const [imageBase64, setImageBase64] = useState('')
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
        setValue('country', value, { shouldValidate: true })
        setIsAutocompleteVisible(false)
    }

    const filteredCountries = (searchText: string) => {
        setSuggestions(
            countries.filter((el) =>
                el.toLowerCase().includes(searchText.toLowerCase())
            )
        )
    }

    const [passwordStrength, setPasswordStrength] = useState('')

    const calculatePasswordStrength = (password: string) => {
        let strength = 0
        if (password.length > 6) strength += 1
        if (password.length > 10) strength += 1
        if (/[A-Z]/.test(password)) strength += 1
        if (/[a-z]/.test(password)) strength += 1
        if (/[0-9]/.test(password)) strength += 1
        if (/[^A-Za-z0-9]/.test(password)) strength += 1

        switch (strength) {
            case 0:
            case 1:
            case 2:
                return 'Слабый'
            case 3:
            case 4:
                return 'Средний'
            case 5:
            case 6:
                return 'Сильный'
            default:
                return ''
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value
        setValue('password', newPassword, { shouldValidate: true })
        const strength = calculatePasswordStrength(newPassword)
        setPasswordStrength(strength)
    }

    return (
        <div className="wrapper_form">
            <div className="form">
                <h1>Registration</h1>
                <h2>Enter your personal details</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="wrapper_input"
                >
                    <div className="wrapper_input">
                        <input
                            type="email"
                            {...register('email')}
                            placeholder="Enter your email ..."
                            className="input"
                        />
                        <span
                            style={{
                                fontSize: '10px',
                                color: 'red',
                                position: 'absolute',
                                top: '75px',
                            }}
                        >
                            {errors.email?.message}
                        </span>
                    </div>
                    <div className="wrapper_input">
                        <input
                            type="password"
                            {...register('password')}
                            placeholder="Enter your password..."
                            className="input"
                            onChange={handlePasswordChange}
                        />
                        <span
                            style={{
                                fontSize: '10px',
                                color: 'red',
                                position: 'absolute',
                                top: '75px',
                            }}
                        >
                            {errors.password?.message}
                        </span>
                        <div
                            className={`password-strength-indicator ${passwordStrength}`}
                        >
                            {passwordStrength && (
                                <span>{passwordStrength}</span>
                            )}
                        </div>
                    </div>
                    <div className="wrapper_input">
                        <input
                            type="password"
                            {...register('confirmPassword')}
                            placeholder="Confirm the password..."
                            className="input"
                        />
                        <span
                            style={{
                                fontSize: '10px',
                                color: 'red',
                                position: 'absolute',
                                top: '75px',
                            }}
                        >
                            {errors.confirmPassword?.message}
                        </span>
                    </div>
                    <div className="wrapper_input">
                        <input
                            type="text"
                            {...register('name')}
                            placeholder="Enter your name... "
                            className="input"
                        />
                        <span
                            style={{
                                fontSize: '10px',
                                color: 'red',
                                position: 'absolute',
                                top: '75px',
                            }}
                        >
                            {errors.name?.message}
                        </span>
                    </div>
                    <div className="wrapper_input">
                        <input
                            type="text"
                            {...register('age')}
                            placeholder="Enter your age... "
                            className="input"
                        />
                        <span
                            style={{
                                fontSize: '10px',
                                color: 'red',
                                position: 'absolute',
                                top: '75px',
                            }}
                        >
                            {errors.age?.message}
                        </span>
                    </div>
                    <div
                        className="autocomplete"
                        onBlur={handleContainerBlur}
                        tabIndex={0}
                    >
                        <input
                            placeholder="Country"
                            {...register('country')}
                            onFocus={handleInputFocus}
                            onChange={(e) => {
                                filteredCountries(e.target.value)
                                setValue('country', e.target.value, {
                                    shouldValidate: true,
                                })
                            }}
                        />
                        {isAutocompleteVisible && (
                            <div className="autocomplete-items">
                                {suggestions.length ? (
                                    suggestions.map(
                                        (suggestion: string, index: number) => (
                                            <div
                                                onClick={(e) =>
                                                    onClickCountry(
                                                        e,
                                                        suggestion
                                                    )
                                                }
                                                key={index}
                                                className="autocomplete-item"
                                            >
                                                {suggestion}
                                            </div>
                                        )
                                    )
                                ) : (
                                    <div className="autocomplete-item">
                                        Not result
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="radio_button">
                        <input
                            type="radio"
                            value="male"
                            {...register('gender')}
                        />
                        <label htmlFor="male">male</label>
                        <input
                            type="radio"
                            value="female"
                            {...register('gender')}
                        />
                        <label htmlFor="female">female</label>
                    </div>

                    <div className="img_wrapper">
                        <label
                            htmlFor="file-upload"
                            className="custom-file-upload background_color"
                        >
                            Downland img
                        </label>
                        <input
                            {...register('image')}
                            id="file-upload"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                const file = e.target.files && e.target.files[0]
                                if (file) {
                                    const maxSizeInBytes = 5 * 1024 * 1024
                                    if (file.size <= maxSizeInBytes) {
                                        const reader = new FileReader()
                                        reader.onload = (event) => {
                                            setImageBase64(
                                                event.target?.result as string
                                            )
                                        }
                                        reader.readAsDataURL(file)
                                    } else {
                                        alert(
                                            'File size exceeds the maximum allowed size.'
                                        )
                                    }
                                }
                            }}
                        />
                        {errors.image?.message}
                        <img src={imageBase64} className="img" alt="" />
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            id="scales"
                            {...register('isAgree')}
                        />
                        <label htmlFor="scales">I agree</label>
                    </div>
                    <button className="button btn_center" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default HookForms
