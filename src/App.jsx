import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProfAdminLogin from './pages/login/ProfAdminLogin'
import './App.css'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import ProfLogin from './pages/login/ProfLogin'
import ListaGrupos from './pages/lista-grupos/lista'
import ProfessorDashboard from './pages/dashboard/ProfessorDashboard'
import Interpretador from './pages/aluno/interpretador'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login/admin' />} />
          {/* Rotas de professor */}
          <Route path='/login/professor' element={<ProfLogin />} />
          <Route path='/login/admin' element={<ProfAdminLogin />} />
          <Route path='/professor/dashboard' element={<ProfessorDashboard />} /> // TODO mudar para ProfessorDashboard depois
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/professor/grupos' element={<ProfessorDashboard />} />
          <Route path='/admin/grupos' element={<ListaGrupos />} />
          {/* Rotas de aluno */}
          <Route path='/login/aluno' element={<h1>Login Aluno</h1>} />
          <Route path='/aluno/interpretador' element={<Interpretador />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
