import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProfAdminLogin from './pages/login/ProfAdminLogin'
import './App.css'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import AdminGrupos from './pages/grupos/AdminGrupos'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login/admin' />} />
          {/* Rotas de professor */}
          <Route path='/login/professor' element={<h1>Login Professor</h1>} />
          <Route path='/login/admin' element={<ProfAdminLogin />} />
          <Route path='/professor/admin/dashboard' element={<ProtectedRoute roles={['admin']} component={AdminDashboard} />} />
          <Route path='/professor/grupos' element={<AdminGrupos />} />
          {/* Rotas de aluno */}
          <Route path='/login/aluno' element={<h1>Login Aluno</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
