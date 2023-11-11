import { vi, describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import Pagination from './Pagination'

const mockChangePage = vi.fn()

describe('Pagination Component', () => {
    render(
        <Pagination totalPage={9} currentPage={3} changePage={mockChangePage} />
    )
    const pageNumbers = screen.getAllByTestId('page-number')
    it('renders buttons', () => {
        expect(pageNumbers.length).toBe(9)
    })

    it('calls changePage with the correct page number when a page number is clicked', () => {
        fireEvent.click(pageNumbers[0])
        expect(mockChangePage).toHaveBeenCalledWith(1)
    })
})
