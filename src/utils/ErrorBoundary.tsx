import React, { Component, ErrorInfo } from 'react'
import img from '../assets/img/star-wars-yoda-may-the-force-be-with-you-i28977.jpg'
interface Props {
    children: React.ReactNode
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error: ', error, errorInfo)
        this.setState({ hasError: true })
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <h1>Something went wrong.</h1>

                    <img
                        src={img}
                        alt="Error"
                        style={{ margin: '0 auto', display: 'block' }}
                    />
                </>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
