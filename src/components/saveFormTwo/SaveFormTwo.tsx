import './SaveFormTwo.css'
import { useSelector } from 'react-redux'

const SaveFormTwo = () => {
    const email = useSelector(
        (state: { user: { email: string } }) => state.user.email
    )
    const password = useSelector(
        (state: { user: { password: string } }) => state.user.password
    )
    const confirmPassword = useSelector(
        (state: { user: { confirmPassword: string } }) =>
            state.user.confirmPassword
    )
    const name = useSelector(
        (state: { user: { name: string } }) => state.user.name
    )
    const age = useSelector(
        (state: { user: { age: string } }) => state.user.age
    )
    const gender = useSelector(
        (state: { user: { gender: string } }) => state.user.gender
    )
    return (
        <div className="form_two">
            <div>Email: {email}</div>
            <div>Password: {password}</div>
            <div>Password: {confirmPassword}</div>
            <div>Name: {name}</div>
            <div>Age: {age}</div>
            <div>Gender: {gender}</div>
        </div>
    )
}

export default SaveFormTwo
