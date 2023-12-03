interface IProps {
    agreeRef: React.MutableRefObject<HTMLInputElement | null>
}

const CheckBox = ({ agreeRef }: IProps) => {
    return (
        <div>
            <input ref={agreeRef} type="checkbox" id="scales" name="scales" />
            <label htmlFor="scales">I agree</label>
        </div>
    )
}

export default CheckBox
