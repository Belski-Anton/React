import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('App Component', () => {
    it('renders NotFound component when on an unknown path', () => {
        render(
            <MemoryRouter initialEntries={['/unknown']}>
                <App />
            </MemoryRouter>
        )

        expect(screen.getByText(/Something went/i)).not.toBeNull()
    })
})
