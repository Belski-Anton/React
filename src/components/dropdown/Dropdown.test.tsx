import Dropdown from './Dropdown'
import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

describe('Render Dropdown', () => {
    it('render text', () => {
        const { getByTestId, getAllByTestId } = render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Dropdown />} />
                </Routes>
            </MemoryRouter>
        )
        const chooseValue = getByTestId('select')
        expect(chooseValue).toBeDefined()

        fireEvent.click(chooseValue)

        const child = getAllByTestId('value')[0]

        fireEvent.click(child)
        expect(chooseValue.textContent).toBe('8')
    })
})
