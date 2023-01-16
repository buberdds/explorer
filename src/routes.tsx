import { RouteObject } from 'react-router-dom'
import { HomePage } from './app/pages/HomePage'
import { BlocksPage } from './app/pages/BlocksPage'
import { TransactionsPage } from './app/pages/TransactionsPage'
import { TransactionDetailPage } from './app/pages/TransactionDetailPage'
import { DashboardPage } from './app/pages/DashboardPage'
import { BlockDetailPage } from './app/pages/BlockDetailPage'
import { AccountDetailsPage } from './app/pages/AccountDetailsPage'
import { RouteUtils } from './app/utils/route-utils'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  ...RouteUtils.getEnabledParaTimes()
    .map(paraTime => [
      {
        path: `/${paraTime}`,
        element: <DashboardPage />,
      },
      {
        path: `/${paraTime}/blocks`,
        element: <BlocksPage />,
      },
      {
        path: `/${paraTime}/blocks/:blockHeight`,
        element: <BlockDetailPage />,
      },
      {
        path: `${paraTime}/account/:address`,
        element: <AccountDetailsPage />,
      },
      {
        path: `/${paraTime}/transactions`,
        element: <TransactionsPage />,
      },
      {
        path: `${paraTime}/transactions/:hash`,
        element: <TransactionDetailPage />,
      },
    ])
    .flat(),
  {
    path: `/blocks/:blockHeight`,
    element: <BlockDetailPage />,
  },
]
