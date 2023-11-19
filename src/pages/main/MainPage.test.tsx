import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import MainPage from './MainPage'
import { store } from '../../store'
import { Provider } from 'react-redux'

describe('MainPage component', () => {
    it('renders correctly', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        const headerElement = screen.getByText(
            'View and search public Red Notices for wanted persons'
        )
        const searchElement = screen.getByPlaceholderText('Search...')

        expect(headerElement).toBeDefined()
        expect(searchElement).toBeDefined()
    })
})
