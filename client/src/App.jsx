import "./index.css"
import LandingPage from "./pages/LandingPage.jsx"
import HomePage from "./pages/HomePage.jsx"
import DashboardPage from "./pages/DashboardPage.jsx"
import ProfilePage from "./pages/UserProfile.jsx"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import SigninPage from "./pages/SigninPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import { useAuth, useStats } from "./stores/user.store.js"
import { useEffect, useState } from "react"
import axios from "./lib/axios.js"
import { Toaster } from "@/components/ui/sonner.jsx"

function App() {
  const setIsUserLogged = useAuth((state) => state.setIsUserLogged)
  const setUser = useAuth((state) => state.setUser)
  const isUserLogged = useAuth((state) => state.isUserLogged)
  const setActiveDates = useAuth((state) => state.setActiveDates)
  const setDashboardStats = useStats((state) => state.setStats)
  const [isTokenReceived, setIsTokenReceived] = useState(false)

  useEffect(() => {
    async function loginUser() {
      try {
        const response = await axios.get("/user/current-user")
        if (response.status === 200) {
          setUser(response?.data?.data)
          setIsUserLogged(true)
        }
      } catch (error) {
        setUser({})
        setIsUserLogged(false)
        try {
          if (error.status === 500) {
            const res = await axios.get("/user/refresh-tokens")
            if (res.status == 200) {
              setIsTokenReceived(true)
            }
          }
        } catch (error) {
          console.log(error?.response?.data?.message || error?.message)
        }
      }
    }
    loginUser()
  }, [isTokenReceived])

  useEffect(() => {}, [isUserLogged])

  useEffect(() => {
    async function getActiveDates() {
      try {
        const res = await axios.get("/user/active-dates")
        if (res.status === 200) {
          setActiveDates(res?.data?.data?.activeDates?.map((date) => new Date(date)))
        }
      } catch (err) {
        console.log(err)
      }
    }
    async function getDashBoardStats() {
      try {
        const res = await axios.get("/dashboard/stats")
        if (res.status === 200) {
          setDashboardStats(res?.data?.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getActiveDates()
    getDashBoardStats()
  }, [])

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isUserLogged ? <HomePage /> : <LandingPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard/:id" element={<DashboardPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
