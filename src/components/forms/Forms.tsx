import './Forms.css'
import { useState, ChangeEvent } from 'react'
import CheckBox from '../checkbox/CheckBox'
import InputImg from '../inputimg/InputImg'
import RadioButton from '../radiobutton/RadioButton'
import Input from '../input/Input'

const Forms = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        age: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    return (
        <div className="wrapper_form">
            <div className="form">
                <h1>Registration</h1>
                <h2>Enter your personal details</h2>
                <form className="wrapper_input">
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email ..."
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm the password..."
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        name="name"
                        placeholder="Enter your name... "
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        name="age"
                        placeholder="Enter your age... "
                        value={formData.age}
                        onChange={handleChange}
                    />
                </form>
                <RadioButton />
                <InputImg />
                <CheckBox />
            </div>
        </div>
    )
}

export default Forms
