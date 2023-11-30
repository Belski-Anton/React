import './RadioButton.css'

interface RadioButtonProps {
    refMale: React.Ref<HTMLInputElement>
    refFemale: React.Ref<HTMLInputElement>
}

const RadioButton = ({ refMale, refFemale }: RadioButtonProps) => {
    return (
        <div className="radio_button">
            <input type="radio" name="gender" value="male" ref={refMale} />
            <label htmlFor="male">male</label>
            <input type="radio" name="gender" value="female" ref={refFemale} />
            <label htmlFor="female">female</label>
        </div>
    )
}

export default RadioButton
