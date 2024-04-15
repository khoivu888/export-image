import { createBrowserRouter } from 'react-router-dom'
import { Default } from './layout/Default'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      {
        index: true,
        path: '/',
        lazy: async () => {
          const { default: Component } = await import('./pages/shopify')
          return {
            Component,
          }
        },
      },
      {
        path: 'shopbase',
        lazy: async () => {
          const { default: Component } = await import('./pages/shopbase')
          return {
            Component,
          }
        },
      },
    ],
  },
])
