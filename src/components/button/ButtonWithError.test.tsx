import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ButtonWithError from './ButtonWithError'

describe('ButtonWithError Component', () => {
    render(<ButtonWithError />)

    const button = screen.getByText('Cause errors')
    it('renders button without errors', () => {
        expect(button).not.toBeNull()
    })
})
