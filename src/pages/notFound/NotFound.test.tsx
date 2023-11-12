import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import NotFound from './NotFound'

describe('NotFound component', () => {
    it('renders 404 error', () => {
        const { getByText } = render(<NotFound />)
        const errorMessage = getByText(/Something went/i)
        expect(errorMessage).toBeDefined()
    })
})
