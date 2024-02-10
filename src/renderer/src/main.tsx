import './assets/base.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { NextUIProvider } from '@nextui-org/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      {/* <main className="dark h-screen text-foreground bg-[#1D1D1D]"> */}
      <App />
      {/* </main> */}
    </NextUIProvider>
  </React.StrictMode>
)
