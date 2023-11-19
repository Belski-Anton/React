import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Search from './Search'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../store'

describe('Search Component', () => {
    it('renders correctly', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route path="/" element={<Search />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )
        const input = screen.getByTestId('search') as HTMLInputElement
        expect(input).toBeDefined()

        fireEvent.change(input, { target: { value: 'Текст для ввода' } })

        expect(input.value).toBe('Текст для ввода')
    })
})
