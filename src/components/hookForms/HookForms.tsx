import { useDispatch } from 'react-redux'
import { IForm, formActions } from '../../store/formSlice'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import './HookForms.css'
import '../inputimg/InputImg.css'
import '../radiobutton/RadioButton.css'

const HookForms = () => {
    const { register, handleSubmit } = useForm<IForm>({
        defaultValues: {},
    })
    const dispatch = useDispatch()
    const onSubmit: SubmitHandler<IForm> = (data: IForm) => {
        const formData = { ...data, image: imageBase64 }
        dispatch(formActions.addForm(formData))
    }
    const [imageBase64, setImageBase64] = useState('')

    return (
        <div className="wrapper_form">
            <div className="form">
                <h1>Registration</h1>
                <h2>Enter your personal details</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="wrapper_input"
                >
                    <input
                        type="email"
                        {...register('email')}
                        placeholder="Enter your email ..."
                        className="input"
                    />
                    <input
                        type="password"
                        {...register('password')}
                        placeholder="Enter your password..."
                        className="input"
                    />
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        placeholder="Confirm the password..."
                        className="input"
                    />

                    <input
                        type="text"
                        {...register('name')}
                        placeholder="Enter your name... "
                        className="input"
                    />
                    <input
                        type="text"
                        {...register('age')}
                        placeholder="Enter your age... "
                        className="input"
                    />
                    <input
                        type="text"
                        {...register('country')}
                        placeholder="Country"
                        className="input"
                    />
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
