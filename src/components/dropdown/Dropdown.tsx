import React, { useState } from 'react'
import './Dropdown.css'
import { useSearchParams } from 'react-router-dom'

const Dropdown = () => {
    const currentParams = new URLSearchParams(window.location.search)
    const [isActive, setIsActive] = useState<boolean>(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [selected, setSelected] = useState<string>(
        searchParams.get('resultPerPage')
            ? searchParams.get('resultPerPage')!
            : 'Chose'
    )
    function handleItemClick(e: React.MouseEvent<HTMLDivElement>) {
        const target = e.target as HTMLDivElement

        setSelected(target.textContent || 'Choose one')
        setIsActive(false)
        currentParams.set('resultPerPage', String(target.textContent))
        setSearchParams(currentParams.toString())
    }
    return (
        <>
            <div className="dropdown">
                <div
                    onClick={() => {
                        setIsActive(!isActive)
                    }}
                    className="dropdown-btn"
                    data-testid="select"
                >
                    {selected}
                    <span
                        className={
                            isActive ? 'fas fa-caret-up' : 'fas fa-caret-down'
                        }
                    />
                </div>
                <div
                    data-testid="content"
                    className="dropdown-content"
                    style={{ display: isActive ? 'block' : 'none' }}
                >
                    <div
                        className="item"
                        onClick={handleItemClick}
                        data-testid="value"
                    >
                        8
                    </div>
                    <div
                        className="item"
                        onClick={handleItemClick}
                        data-testid="value"
                    >
                        12
                    </div>
                    <div
                        className="item"
                        onClick={handleItemClick}
                        data-testid="value"
                    >
                        16
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dropdown
