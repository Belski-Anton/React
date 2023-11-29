import './RadioButton.css'

const RadioButton = () => {
    return (
        <div className="radio_button">
            <input type="radio" name="gender" value="male" />
            <label htmlFor="male">male</label>
            <input type="radio" name="gender" value="female" />
            <label htmlFor="female">female</label>
        </div>
    )
}

export default RadioButton
