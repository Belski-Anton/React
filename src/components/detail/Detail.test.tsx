import { vi, describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Detail from './Detail'

import 'whatwg-fetch'
import { Provider } from 'react-redux'
import { store } from '../../store'

global.fetch = vi.fn(() =>
    Promise.resolve(
        new Response(
            JSON.stringify({
                arrest_warrants: [
                    {
                        charge: 'This was the last recorded test before the error was thrown, if error originated after test finished its execution',
                    },
                ],
                weight: 85,
                height: 186,
                sex_id: 'man',
                place_of_birth: '18.01.1991',
                name: 'Nick',
                distinguishing_marks: '',
            })
        )
    )
)

describe('Detail Component', () => {
    it('renders correctly when data is loaded', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/detail/123']}>
                    <Routes>
                        <Route path="/detail/:id" element={<Detail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText('Loading...')).toBeDefined()

        await screen.findByText(/Arrest warrant/i)
        await screen.findByText(/Place of Birth/i)
        await screen.findByText(/Height/i)
        await screen.findByText(/Place of Birth/i)
        await screen.findByText(/Age/i)
    })
    it('click for button close', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/detail/123']}>
                    <Routes>
                        <Route path="/detail/:id" element={<Detail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        const button = screen.getAllByTestId('close')
        fireEvent.click(button[0])
    })
})
