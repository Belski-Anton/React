import React, { Component } from 'react'
import './ErrorBoundary.css'
interface ButtonWithErrorProps {}

interface ButtonWithErrorState {
    hasError: boolean
}

class ButtonWithError extends Component<
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
                cause errors
            </button>
        )
    }
}

export default ButtonWithError
