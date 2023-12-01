// import { forwardRef } from 'react'
import './InputImg.css'

interface IImageProps {
    imgRef: React.MutableRefObject<HTMLImageElement | null>
    bodyInputRef: React.MutableRefObject<HTMLInputElement | null>
}
const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const InputImg = ({ imgRef, bodyInputRef }: IImageProps) => {
    const handleCnange = () => {
        const inputElement = bodyInputRef?.current
        if (inputElement && inputElement.files && inputElement.files[0]) {
            if (inputElement.files[0].size > MAX_IMAGE_SIZE) {
                alert('Файл слишком большой. Максимальный размер 5 МБ.')
                return
            } else {
                const selectedFile = inputElement.files[0]
                convertBase64(selectedFile)
            }
        }
    }

    const convertBase64 = (file: File) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const base64Data = e.target?.result as string
            if (imgRef && imgRef.current) {
                imgRef.current.src = base64Data
                console.log(base64Data) // Вывод данных base64 в консоль
            }
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className="img_wrapper">
            <label htmlFor="file-upload" className="custom-file-upload">
                Downland img
            </label>
            <input
                onChange={handleCnange}
                ref={bodyInputRef}
                id="file-upload"
                type="file"
                accept="image/png, image/jpeg"
            />
            <img className="img" ref={imgRef} alt="" />
        </div>
    )
}

export default InputImg
