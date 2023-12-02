import { useDispatch } from 'react-redux'
import { IForm, formActions } from '../../store/formSlice'
import './HookForms.css'
import { useForm, SubmitHandler } from 'react-hook-form'

const HookForms = () => {
    const { register, handleSubmit } = useForm<IForm>({
        defaultValues: {},
    })
    const dispatch = useDispatch()
    const onSubmit: SubmitHandler<IForm> = (data: IForm) => {
        dispatch(formActions.addForm(data))
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
                    <div className="btn ">
                        <button className="button">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HookForms
