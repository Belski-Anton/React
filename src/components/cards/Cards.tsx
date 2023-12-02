import { IForm } from '../../store/formSlice'
import './Cards.css'
import { useSelector } from 'react-redux'

const Cards = () => {
    const items = useSelector(
        (state: { user: { items: IForm[] } }) => state.user.items
    )

    return (
        <>
            {items.map((el, idx) => (
                <div
                    className={`form_two ${
                        idx === items.length - 1 ? 'last' : ''
                    }`}
                    key={`${idx}`}
                >
                    <div>Email: {el.email}</div>
                    <div>Password: {el.password}</div>
                    <div>Password: {el.confirmPassword}</div>
                    <div>Name: {el.name}</div>
                    <div>Age: {el.age}</div>
                    <div>Gender: {el.gender}</div>
                    <div>
                        Img: <img className="img" src={el.image} alt="" />
                    </div>
                    <div>Country: {el.country}</div>
                </div>
            ))}
        </>
    )
}

export default Cards
