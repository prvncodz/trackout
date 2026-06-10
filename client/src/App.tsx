import "./index.css"
import LandingPage from "./pages/LandingPage"
import HomePage from "./pages/HomePage"
import DashboardPage from "./pages/DashboardPage"
import ProfilePage from "./pages/UserProfile"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import SigninPage from "./pages/SigninPage"
import SignupPage from "./pages/SignupPage"
import { useAuth, useStats } from "./stores/user.store"
import { useEffect, useState } from "react"
import axios from "./lib/axios"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useGetUser } from "./hooks/useUser"

function App() {
    const isUserLogged = useAuth((state) => state.isUserLogged)
    const setActiveDates = useAuth((state) => state.setActiveDates)
    const setDashboardStats = useStats((state) => state.setStats)

    useEffect(() => {
        if (isUserLogged) {
            useGetUser()
        }
    }, [isUserLogged])


    useEffect(() => {
        async function getActiveDates() {
            try {
                const res = await axios.get("/user/active-dates")
                if (res.status === 200) {
                    setActiveDates(res?.data?.data?.activeDates?.map((date: string) => new Date(date)))
                }
            } catch (err: any) {
                toast.error(err?.message)
            }
        }
        async function getDashBoardStats() {
            try {
                const res = await axios.get("/dashboard/stats")
                if (res.status === 200) {
                    setDashboardStats(res?.data?.data)
                }
            } catch (err: any) {
                toast.error(err?.message)
            }
        }
        if (isUserLogged) {
            getActiveDates()
            getDashBoardStats()
        }
    }, [isUserLogged])

    return (
        <>
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={isUserLogged ? <HomePage /> : <LandingPage />} />
                    <Route path="/signin" element={<SigninPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
