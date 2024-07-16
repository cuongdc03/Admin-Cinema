import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { path } from './path'
import SignIn from '@/pages/Authentication/SignIn'
import DefaultLayout from '@/layout/DefaultLayout'
import Dashboard from '@/pages/Dashboard/Dashboard'
import PageTitle from '@/components/PageTitle'
import Ticket from '@/pages/Ticket'
import User from '@/pages/User'
import Voucher from '@/pages/Voucher'
import { getTokenFromLocalStorage } from '@/util/localStorage'
import { PAGE_TITTLES } from '@/constants/pageTitles'

function ProtectedRoute() {
  const isAuthenticated = getTokenFromLocalStorage()
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
  const isAuthenticated = getTokenFromLocalStorage()
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.dashboard} />
}

export default function useRouteElements() {
  return useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.dashboard,
          element: (
            <DefaultLayout>
              <PageTitle title={PAGE_TITTLES.dashboard} />
              <Dashboard />
            </DefaultLayout>
          ),
          index: true
        },
        {
          path: path.ticket,
          element: (
            <DefaultLayout>
              <PageTitle title={PAGE_TITTLES.ticket} />
              <Ticket />
            </DefaultLayout>
          )
        },
        {
          path: path.user,
          element: (
            <DefaultLayout>
              <PageTitle title={PAGE_TITTLES.user} />
              <User />
            </DefaultLayout>
          )
        },
        {
          path: path.voucher,
          element: (
            <DefaultLayout>
              <PageTitle title={PAGE_TITTLES.voucher} />
              <Voucher />
            </DefaultLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <>
              <PageTitle title={PAGE_TITTLES.login} />
              <SignIn />
            </>
          )
        }
      ]
    }
  ])
}
