import './index.css'
import LandingPage from './pages/LandingPage.jsx'
import HomePage from './pages/HomePage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ProfilePage from './pages/UserProfile.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import SigninPage from './pages/SigninPage.jsx'
import SignupPage from './pages/SignupPage.jsx'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/home/:id" element={<HomePage />} />
                <Route path="/dashboard/:id" element={<DashboardPage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
