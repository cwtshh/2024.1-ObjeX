import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProfAdminLogin from './pages/login/ProfAdminLogin'
import './App.css'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import AtividadeDeTexto from './pages/exercicio/AtividadeDeTexto'
import AtividadeDeImagem from './pages/exercicio/AtividadeDeImagem'


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
          {/* Rotas de aluno */}
          <Route path='/login/aluno' element={<h1>Login Aluno</h1>} />
          {/* Rotas de exercicio */}
          <Route path='/atividade/texto' element={<AtividadeDeTexto/>}/>
          <Route path='/atividade/imagem' element={<AtividadeDeImagem/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
