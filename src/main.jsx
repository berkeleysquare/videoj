import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import {Provider} from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
import App from './App.jsx'
import configureStore from './store/store'

const theme = createTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={configureStore(configureStore({'resources': {}}))}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
