import { useRoutes } from 'react-router-dom'
import { path } from './path'
import SignIn from '@/pages/Authentication/SignIn'
import DefaultLayout from '@/layout/DefaultLayout'
import Dashboard from '@/pages/Dashboard/Dashboard'
import PageTitle from '@/components/PageTitle'
import Ticket from '@/pages/Ticket'
import User from '@/pages/User'
import Voucher from '@/pages/Voucher'
import Cinema from '@/components/Cinema/Cinema'

export default function useRouteElements() {
  return useRoutes([
    {
      path: path.login,
      element: <SignIn />
    },
    {
      path: path.dashboard,
      element: (
        <DefaultLayout>
          <PageTitle title='Dashboard | Cinestar' />
          <Dashboard />
        </DefaultLayout>
      ),
      index: true
    },
    {
      path: path.ticket,
      element: (
        <DefaultLayout>
          <PageTitle title='Ticket | CineStar' />
          <Ticket />
        </DefaultLayout>
      )
    },
    {
      path: path.cinema,
      element: (
        <DefaultLayout>
          <PageTitle title='Cinema | CineStar' />
          <Cinema />
        </DefaultLayout>
      )
    },
    {
      path: path.user,
      element: (
        <DefaultLayout>
          <PageTitle title='User | CineStar' />
          <User />
        </DefaultLayout>
      )
    },
    {
      path: path.voucher,
      element: (
        <DefaultLayout>
          <PageTitle title='Voucher | CineStar' />
          <Voucher />
        </DefaultLayout>
      )
    }
  ])
}
