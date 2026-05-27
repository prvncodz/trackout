import "./index.css";
import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProfilePage from "./pages/UserProfile.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SigninPage from "./pages/SigninPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { useAuth } from "./stores/user.store.js";
import { useEffect } from "react";
import userService from "./services/user.service.js"

function App() {
    const setIsUserLogged = useAuth((state) => state.setIsUserLogged);
    const setUser = useAuth((state) => state.setUser)
    const isUserLogged = useAuth((state) => state.isUserLogged);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await userService.getUser();
                if (res.status === 200) {
                    setUser(res?.data?.data)
                    setIsUserLogged(true)
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchUser()
    }, []);

    useEffect(() => { }, [isUserLogged])
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={isUserLogged ? <HomePage /> : <LandingPage />}
                />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard/:id" element={<DashboardPage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
