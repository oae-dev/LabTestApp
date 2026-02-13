import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './screens/auth/auth'
import Home from './screens/home/home'
import ProtectedRoute from './prodectedRoute'
import MainLayout from './screens/home/MainLayout'
import InfoForm from './screens/auth/InfoForm'
import { STORAGE_KEY_USER } from './localStorage/UserInfo'

function App() {

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Auth />} />
        <Route path='/labForm' element={<InfoForm />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path='/home/:patientId?' element={<Home />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App

const PublicRoute = () => {
  const isAuthenticated = !!localStorage.getItem(STORAGE_KEY_USER);
  return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />;
};