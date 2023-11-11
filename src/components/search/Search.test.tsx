import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Search from './Search'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

describe('Search Component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Search />} />
                </Routes>
            </MemoryRouter>
        )
        const input = screen.getByTestId('search') as HTMLInputElement
        expect(input).toBeDefined()

        fireEvent.change(input, { target: { value: 'Текст для ввода' } })

        expect(input.value).toBe('Текст для ввода')
    })
})
