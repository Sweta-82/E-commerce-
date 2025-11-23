
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// used for binding
import {Provider} from 'react-redux'
import { store } from './app/store.js'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <ToastContainer/>
  </Provider>

)
