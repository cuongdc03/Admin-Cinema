import { useRoutes } from 'react-router-dom'
import { path } from './path'
import SignIn from '@/pages/Authentication/SignIn'
import DefaultLayout from '@/layout/DefaultLayout'
import Dashboard from '@/pages/Dashboard/Dashboard'
import PageTitle from '@/components/PageTitle'
import Ticket from '@/pages/Ticket'
import User from '@/pages/User'
import Voucher from '@/pages/Voucher'
import Film from '@/components/Film/Film'
import FilmDetail from '@/components/Film/FilmDetail'
import CreateFilm from '@/components/Film/CreateFilm'

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
      path: path.film,
      element: (
        <DefaultLayout>
          <PageTitle title='Film | CineStar' />
          <Film />
        </DefaultLayout>
      )
    },
    {
      path: `${path.film}/:id`,
      element: (
        <DefaultLayout>
          <PageTitle title='Film Detail | CineStar' />
          <FilmDetail />
        </DefaultLayout>
      )
    },
    {
      path: `${path.film}/create`,
      element: (
        <DefaultLayout>
          <PageTitle title='Create Film | CineStar' />
          <CreateFilm />
        </DefaultLayout>
      )
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
