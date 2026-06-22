import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/app/instrumentation'

import { App } from '@/app/App'
import { AppProviders } from '@/app/providers/AppProviders'
import { bootstrapAuth } from '@/bootstrap'
import { store } from '@/store'
import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

bootstrapAuth(store)

createRoot(root).render(
  <StrictMode>
    <AppProviders store={store}>
      <App />
    </AppProviders>
  </StrictMode>,
)
