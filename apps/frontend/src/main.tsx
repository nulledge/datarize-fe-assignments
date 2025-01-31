import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@apis/queryClient.ts'

import axios from "axios";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// axios 기본 URL 설정
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
)
