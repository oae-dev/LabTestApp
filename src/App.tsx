import { Route, Routes } from 'react-router'
import './App.css'
import Auth from './screens/auth/auth'
import Home from './screens/home/home'
import ProtectedRoute from './prodectedRoute'
import MainLayout from './screens/home/MainLayout'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path='/home/:patientId?' element={<Home />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App
