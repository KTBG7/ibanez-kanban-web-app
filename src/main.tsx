import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Demo from './pages/Demo.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/Login.js';
import Kanban from './pages/Kanban.js';
import AuthContextProvider from './contexts/AuthContextProvider.js';
import SignUp from './pages/SignUp.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/demo',
    element: <Demo />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/kanban',
    element: <Kanban />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 60,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
