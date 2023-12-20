import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@deque/cauldron-styles'
import '@deque/cauldron-react/lib/cauldron.css'
import { ThemeProvider } from '@deque/cauldron-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider initialTheme="light">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
