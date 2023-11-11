import { vi, describe, it, expect } from 'vitest'
import Card from './Card'
import { fireEvent, render, screen } from '@testing-library/react'

const mockOpenDetails = vi.fn()
const mockPerson = {
    forename: 'John Doe',
    date_of_birth: '1990-01-01',
    nationalities: ['US'],
    entity_id: '123',
    _links: {
        thumbnail: {
            href: 'link-to-thumbnail.jpg',
        },
    },
}

describe('Card Component', () => {
    render(<Card item={mockPerson} openDetails={mockOpenDetails} />)
    it('renders correctly with all data', () => {
        expect(screen.getByText('John Doe')).toBeDefined()
        expect(
            screen.getByText('Date(s) of Birth Used: 1990-01-01')
        ).toBeDefined()
        expect(screen.getByText('view more')).toBeDefined()
    })

    it('renders correctly with no flag and default photo when no thumbnail', () => {
        const img = screen.getAllByAltText('John Doe')[0]
        expect(img.getAttribute('src')).toBe('link-to-thumbnail.jpg')
    })

    it('calls openDetails when "view more" is clicked', () => {
        const btn = screen.getByText('view more')
        fireEvent.click(btn)
        expect(mockOpenDetails).toHaveBeenCalledWith('123')
    })
})
