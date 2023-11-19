import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import { expect, it, describe } from 'vitest'

describe('enders footer component', () => {
    it('render text', () => {
        render(<Footer />)

        const textElement = screen.getByText(
            'REST API taken from a public GitHub repository'
        )
        expect(textElement).toBeDefined()

        const imageElement = screen.getByAltText('link')
        expect(imageElement).toBeDefined()
    })
})
