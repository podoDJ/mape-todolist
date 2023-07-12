import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Router from './shared/Router';
import { AuthProvider } from './api/AuthContex';

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <Router/>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
