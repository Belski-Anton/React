import './InputImg.css'
const InputImg = () => {
    return (
        <div>
            <label htmlFor="file-upload" className="custom-file-upload">
                Download
            </label>
            <input id="file-upload" type="file" />
        </div>
    )
}

export default InputImg
