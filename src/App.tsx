import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Film from './components/Film/Film';
import Show from './components/Show/Show'
import Ticket from './pages/Ticket';
import User from './pages/User';
import Voucher from './pages/Voucher';
import FilmDetail from './components/Film/FilmDetail';
import CinemaDetail from './components/Cinema/CinemaDetail';
import Cinema from './components/Cinema/Cinema';
import CinemaCreate from './components/Cinema/CinemaCreate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilmCreate from './components/Film/FilmCreate';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <ToastContainer />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | Cinestar" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/cinema"
          element={
            <>
              <PageTitle title="Cinema | CineStar" />
              <Cinema />
            </>
          }
        />
        <Route
          path="/cinema/:id"
          element={
            <>
              <PageTitle title="Cinema Detail | CineStar" />
              <CinemaDetail />
            </>
          }
        />
        <Route
          path="/cinema/create"
          element={
            <>
              <PageTitle title="Create Cinema | CineStar" />
              <CinemaCreate />
            </>
          }
        />
        <Route
          path="/film"
          element={
            <>
              <PageTitle title="Film | CineStar" />
              <Film />
            </>
          }
        />
        <Route
          path="/film/:id"
          element={
            <>
              <PageTitle title="Film Detail | CineStar" />
              <FilmDetail />
            </>
          }
        />
          <Route
          path="/film/Create"
          element={
            <>
              <PageTitle title="Film Create | CineStar" />
              <FilmCreate />
            </>
          }
        />
        <Route
          path="/show"
          element={
            <>
              <PageTitle title="Show | CineStar" />
              <Show />
            </>
          }
        />
        <Route
          path="/ticket"
          element={
            <>
              <PageTitle title="Ticket | CineStar" />
              <Ticket />
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <PageTitle title="User | CineStar" />
              <User />
            </>
          }
        />
        <Route
          path="/voucher"
          element={
            <>
              <PageTitle title="Voucher | CineStar" />
              <Voucher />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
