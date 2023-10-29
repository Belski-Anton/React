import React from 'react'
import './ErrorBoundary.css'

interface ButtonWithErrorProps {}

interface ButtonWithErrorState {
    hasError: boolean
}

class ButtonWithError extends React.Component<
    ButtonWithErrorProps,
    ButtonWithErrorState
> {
    constructor(props: ButtonWithErrorProps) {
        super(props)
        this.state = {
            hasError: false,
        }
    }

    handleClick = () => {
        this.setState({ hasError: true })
    }

    render() {
        if (this.state.hasError) {
            throw new Error('Упс! Ошибка')
        }
        return (
            <button className="errorBtn" onClick={this.handleClick}>
                Cause errors
            </button>
        )
    }
}

export default ButtonWithError
