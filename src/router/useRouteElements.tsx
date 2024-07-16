import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { path } from './path'
import SignIn from '@/pages/Authentication/SignIn'
import DefaultLayout from '@/layout/DefaultLayout'
import Dashboard from '@/pages/Dashboard/Dashboard'
import PageTitle from '@/components/PageTitle'
import Ticket from '@/pages/Ticket'
import User from '@/pages/User'
import Voucher from '@/pages/Voucher'
import Show from '@/components/Show/Show'
import { getTokenFromLocalStorage } from '@/util/localStorage'
import Cinema from '@/components/Cinema/Cinema'
import { PAGE_TITLES } from '@/constants/pageTitles'
import CinemaCreate from '@/components/Cinema/CinemaCreate'
import CinemaDetail from '@/components/Cinema/DetailCinema'
import Film from '@/components/Film/Film'
import CreateFilm from '@/components/Film/CreateFilm'
import FilmDetail from '@/components/Film/FilmDetail'
import CreateScreen from '@/components/Cinema/CreateScreen'

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
            <DefaultLayout title={PAGE_TITLES.dashboard}>
              <Dashboard />
            </DefaultLayout>
          ),
          index: true
        },
        {
          path: path.ticket,
          element: (
            <DefaultLayout title={PAGE_TITLES.ticket}>
              <Ticket />
            </DefaultLayout>
          )
        },
        {
          path: path.user,
          element: (
            <DefaultLayout title={PAGE_TITLES.user}>
              <User />
            </DefaultLayout>
          )
        },
        {
          path: path.voucher,
          element: (
            <DefaultLayout title={PAGE_TITLES.voucher}>
              <Voucher />
            </DefaultLayout>
          )
        },
        {
          path: path.cinema,
          element: (
            <DefaultLayout title={PAGE_TITLES.cinema}>
              <Cinema />
            </DefaultLayout>
          )
        },
        {
          path: path.film,
          element: (
            <DefaultLayout title={PAGE_TITLES.film}>
              <Film />
            </DefaultLayout>
          )
        },
        {
          path: path.createCinema,
          element: (
            <DefaultLayout title={PAGE_TITLES.createCinema}>
              <CinemaCreate />
            </DefaultLayout>
          )
        },
        {
          path: path.filmCreate,
          element: (
            <DefaultLayout title={PAGE_TITLES.filmCreate}>
              <CreateFilm />
            </DefaultLayout>
          )
        },
        {
          path: path.cinemaDetail,
          element: (
            <DefaultLayout title={PAGE_TITLES.CinemaDetail}>
              <CinemaDetail />
            </DefaultLayout>
          )
        },
        {
          path: path.filmDetail,
          element: (
            <DefaultLayout title={PAGE_TITLES.filmDetail}>
              <FilmDetail />
            </DefaultLayout>
          )
        },
        {
          path: path.createScreen,
          element: (
            <DefaultLayout title={PAGE_TITLES.createScreen}>
              <CreateScreen />
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
              <PageTitle title={PAGE_TITLES.login} />
              <SignIn />
            </>
          )
        }
      ]
    },
    {
      path: path.show,
      element: (
        <DefaultLayout title={PAGE_TITLES.Show}>
          <Show />
        </DefaultLayout>
      )
    }
  ])
}
