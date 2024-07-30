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
import Cinema from '@/components/Cinema/Cinema'
import { PAGE_TITTLES } from '@/constants/pageTitles'
import CinemaCreate from '@/components/Cinema/CinemaCreate'
import CinemaDetail from '@/components/Cinema/DetailCinema'
import Film from '@/components/Film/Film'
import FilmDetail from '@/components/Film/FilmDetail'
import Show from '@/components/Show/Show'
import CreateFilm from '@/components/Film/CreateFilm'

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
        },
        {
          path: path.cinema,
          element: (
            <DefaultLayout>
              <PageTitle title='Cinema | CineStar' />
              <Cinema />
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
          element: <SignIn />
        }
      ]},
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
      path: `${path.cinema}/:id`,
      element: (
        <DefaultLayout>
          <PageTitle title={PAGE_TITTLES.CinemaDetail} />
          <CinemaDetail />
        </DefaultLayout>
      )
    },
    {
      path: path.film,
      element: (
        <DefaultLayout>
          <PageTitle title={PAGE_TITTLES.film} />
          <Film />
        </DefaultLayout>
      )
    },
    {
      path: `${path.film}/:id`,
      element: (
        <DefaultLayout>
          <PageTitle title={PAGE_TITTLES.film} />
          <FilmDetail/>
        </DefaultLayout>
      )
    },
    {
      path: path.show,
      element: (
        <DefaultLayout>
          <PageTitle title={PAGE_TITTLES.Show} />
          <Show />
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
