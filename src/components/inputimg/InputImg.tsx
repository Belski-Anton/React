import { useRef } from 'react'
import './InputImg.css'

const InputImg = () => {
    const bodyInputRef = useRef<HTMLInputElement | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)

    const handleCnange = () => {
        const inputElement = bodyInputRef.current
        if (inputElement && inputElement.files && inputElement.files[0]) {
            const selectedFile = inputElement.files[0]
            convertBase64(selectedFile)
        }
    }

    const convertBase64 = (file: File) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const base64Data = e.target?.result as string
            if (imgRef.current) {
                imgRef.current.src = base64Data
            }
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className="img_wrapper">
            <label htmlFor="file-upload" className="custom-file-upload">
                Загрузить
            </label>
            <input
                onChange={handleCnange}
                ref={bodyInputRef}
                id="file-upload"
                type="file"
                accept="image/png, image/jpeg"
            />
            <img ref={imgRef} alt="" />
        </div>
    )
}

export default InputImg
