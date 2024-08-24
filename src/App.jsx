import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProfAdminLogin from './pages/login/ProfAdminLogin'
import './App.css'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import LoginAluno from './pages/login/LoginAluno'
import AlunoDashboard from './pages/dashboard/AlunoDashboard'
import PrimeiroAcessoAluno from './pages/primeiro-acesso/PrimeiroAcessoAluno'
import AtivarContaAluno from './pages/ativar-conta/AtivarContaAluno'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login/admin' />} />
          {/* Rotas de professor */}
          <Route path='/login/professor' element={<h1>Login Professor</h1>} />
          <Route path='/login/admin' element={<ProfAdminLogin />} />
          <Route path='/professor/admin/dashboard' element={<ProtectedRoute roles={['admin']} component={AdminDashboard} />} />
          {/* Rotas de aluno */}
          <Route path='/login/aluno' element={<LoginAluno />} />
          <Route path='/primeiroacesso' element={<PrimeiroAcessoAluno />} />
          <Route path='/aluno/dashboard' element={<AlunoDashboard />} />
          <Route path='/ativarconta' element={<AtivarContaAluno />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
