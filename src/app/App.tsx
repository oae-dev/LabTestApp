import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from '../layouts/home'
import MainLayout from '../layouts/MainLayout'
import { STORAGE_KEY_USER } from '../services/localStorage/UserInfo'
import Auth from '../layouts/auth'
import ProtectedRoute from './prodectedRoute'
import LabInfoForm from '../features/auth/components/LabInfoForm'

function App() {

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Auth />} />
        <Route path='/labForm' element={<LabInfoForm />} />
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