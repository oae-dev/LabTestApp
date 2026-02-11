import { Route, Routes } from 'react-router'
import './App.css'
import Auth from './screens/auth/auth'
import Home from './screens/home/home'
import ProtectedRoute from './prodectedRoute'
import MainLayout from './screens/home/MainLayout'
import InfoForm from './screens/auth/InfoForm'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path='/labForm' element={< InfoForm />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path='/home/:patientId?' element={<Home />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App
