import { vi, describe, it, expect } from 'vitest'
import Pagination from './Pagination'
import { fireEvent, render, screen } from '@testing-library/react'

const mockFn = vi.fn()

describe('Pagination Component', () => {
    render(<Pagination totalPage={6} currentPage={2} changePage={mockFn} />)
    it('renders buttons', () => {
        const buttons = screen.getAllByTestId('btn-page')
        expect(buttons.length).toBe(6)
    })

    it('calls changePage when is clicked', () => {
        const button = screen.getAllByTestId('btn-page')[0]
        fireEvent.click(button)
        expect(mockFn).toHaveBeenCalledWith(1)
    })
})
