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
import { PAGE_TITLES } from '@/constants/pageTitles'
import CinemaDetail from '@/components/Cinema/DetailCinema'
import Film from '@/components/Film/Film'
import FilmDetail from '@/components/Film/FilmDetail'
import Show from '@/components/Show/Show'
import CreateFilm from '@/components/Film/CreateFilm'
import CreateScreen from '@/components/Cinema/CreateScreen'
import CinemaCreate from '@/components/Cinema/CreateCinema'

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
              <PageTitle title={PAGE_TITLES.dashboard} />
              <Dashboard />
            </DefaultLayout>
          ),
          index: true
        },
        {
          path: path.ticket,
          element: (
            <DefaultLayout>
              <PageTitle title={PAGE_TITLES.ticket} />
              <Ticket />
            </DefaultLayout>
          )
        },
        {
          path: path.user,
          element: (
            <DefaultLayout>
              <PageTitle title={PAGE_TITLES.user} />
              <User />
            </DefaultLayout>
          )
        },
        {
          path: path.voucher,
          element: (
            <DefaultLayout>
              <PageTitle title={PAGE_TITLES.voucher} />
              <Voucher />
            </DefaultLayout>
          )
        },
        {
          path: path.cinema,
          element: (
            <DefaultLayout>
              <PageTitle title={PAGE_TITLES.cinema} />
              <Cinema />
            </DefaultLayout>
          )
        },
        {
          path: path.createCinema,
          element: (
            <DefaultLayout>
              <PageTitle title={PAGE_TITLES.createCinema} />
              <CinemaCreate />
            </DefaultLayout>
          )
        },
        {
          path: path.detailCinema,
          element: (
            <DefaultLayout>
              <PageTitle title={PAGE_TITLES.detailCinema} />
              <CinemaDetail />
            </DefaultLayout>
          )
        },
        {
          path: path.createScreen,
          element: (
            <DefaultLayout>
              <PageTitle title={PAGE_TITLES.createScreen} />
              <CreateScreen isEdit={false} />
            </DefaultLayout>
          )
        },
        {
          path: path.updateScreen,
          element: (
            <DefaultLayout>
              <PageTitle title={PAGE_TITLES.createScreen} />
              <CreateScreen isEdit={true} />
            </DefaultLayout>
          )
        }
      ]
    },
    {
      path: path.film,
      element: (
        <DefaultLayout>
          <PageTitle title={PAGE_TITLES.film} />
          <Film />
        </DefaultLayout>
      )
    },
    {
      path: path.filmCreate,
      element: (
        <DefaultLayout>
          <PageTitle title={PAGE_TITLES.filmCreate} />
          <CreateFilm />
        </DefaultLayout>
      )
    },
    {
      path: path.filmDetail,
      element: (
        <DefaultLayout>
          <PageTitle title={PAGE_TITLES.filmDetail} />
          <FilmDetail />
        </DefaultLayout>
      )
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
        <DefaultLayout>
          <PageTitle title='Show | CineStar' />
          <Show />
        </DefaultLayout>
      )
    }
  ])
}
