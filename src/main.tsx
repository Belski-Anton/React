import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App.tsx'
import './index.css'
import ErrorBoundary from './utils/ErrorBoundary.tsx'
import { BrowserRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>
)
