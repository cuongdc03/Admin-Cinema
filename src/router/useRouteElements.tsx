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
import CinemaCreate from '@/components/Cinema/CinemaCreate'
import { PAGE_TITTLES } from '@/constants/pageTitles'

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
      path: path.cinema,
      element: (
        <DefaultLayout>
          <PageTitle title={PAGE_TITTLES.cinema} />
          <Cinema />
        </DefaultLayout>
      )
    },
    {
      path: `${path.cinema}/create`,
      element: (
        <DefaultLayout>
          <PageTitle title={PAGE_TITTLES.createCinema} />
          <CinemaCreate />
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
  ])
}
