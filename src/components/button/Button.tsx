import './Button.css'

interface ButtonProps {
    onClick: () => void
}

const Button = ({ onClick }: ButtonProps) => {
    return (
        <div className="btn">
            <button onClick={onClick}>Submit</button>
        </div>
    )
}

export default Button
