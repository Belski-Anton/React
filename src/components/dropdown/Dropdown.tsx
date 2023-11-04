import React, { useState } from 'react'
import './Dropdown.css'

const Dropdown: React.FC = () => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const [selected, setSelected] = useState<string>('Choose one')

    function handleItemClick(e: React.MouseEvent<HTMLDivElement>) {
        const target = e.target as HTMLDivElement
        setSelected(target.textContent || 'Choose one')
        setIsActive(false)
    }

    return (
        <>
            <div className="dropdown">
                <div
                    onClick={() => {
                        setIsActive(!isActive)
                    }}
                    className="dropdown-btn"
                >
                    {selected}
                    <span
                        className={
                            isActive ? 'fas fa-caret-up' : 'fas fa-caret-down'
                        }
                    />
                </div>
                <div
                    className="dropdown-content"
                    style={{ display: isActive ? 'block' : 'none' }}
                >
                    <div className="item" onClick={handleItemClick}>
                        8
                    </div>
                    <div className="item" onClick={handleItemClick}>
                        12
                    </div>
                    <div className="item" onClick={handleItemClick}>
                        16
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dropdown
