import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Loader from './common/Loader'
import 'react-toastify/dist/ReactToastify.css'
import useRouteElements from './router/useRouteElements'
import { ToastContainer } from 'react-toastify'
function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const { pathname } = useLocation()
  const routeElements = useRouteElements()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timeout)
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer />
      {routeElements}
    </>
  )
}

export default App
