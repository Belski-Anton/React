import { describe, it, expect } from 'vitest'
import Header from './Header'
import { render } from '@testing-library/react'

describe('Render Header', () => {
    it('render text', () => {
        const { getByText } = render(<Header />)
        expect(
            getByText('View and search public Red Notices for wanted persons')
        ).toBeTruthy()
    })
})
