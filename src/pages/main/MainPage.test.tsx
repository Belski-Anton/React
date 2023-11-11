import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppContext, initialState } from './MainPage'
import MainPage from './MainPage'

describe('MainPage component', () => {
    it('renders correctly', () => {
        const contextValue = {
            state: initialState,
            setState: () => {},
        }

        render(
            <MemoryRouter initialEntries={['/']}>
                <AppContext.Provider value={contextValue}>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                    </Routes>
                </AppContext.Provider>
            </MemoryRouter>
        )

        const headerElement = screen.getByText(
            'View and search public Red Notices for wanted persons'
        )
        const searchElement = screen.getByPlaceholderText('Search...')

        expect(headerElement).toBeDefined()
        expect(searchElement).toBeDefined()
    })
})
