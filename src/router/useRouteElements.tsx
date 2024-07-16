import { useRoutes } from 'react-router-dom';
import { path } from './path';
import SignIn from '@/pages/Authentication/SignIn';
import DefaultLayout from '@/layout/DefaultLayout';
import Dashboard from '@/pages/Dashboard/Dashboard';
import PageTitle from '@/components/PageTitle';
import Ticket from '@/pages/Ticket';
import User from '@/pages/User';
import Voucher from '@/pages/Voucher';

export default function useRouteElements() {
  return useRoutes([
    {
      path: path.login,
      element: <SignIn />
    },
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: path.dashboard,
          element: (
            <>
              <PageTitle title='Dashboard | Cinestar' />
              <Dashboard />
            </>
          ),
          index: true
        },
        {
          path: path.ticket,
          element: (
            <>
              <PageTitle title='Ticket | CineStar' />
              <Ticket />
            </>
          )
        },
        {
          path: path.user,
          element: (
            <>
              <PageTitle title='User | CineStar' />
              <User />
            </>
          )
        },
        {
          path: path.voucher,
          element: (
            <>
              <PageTitle title='Voucher | CineStar' />
              <Voucher />
            </>
          )
        }
      ]
    }
  ]);
}
