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
import ProfLogin from './pages/login/ProfLogin'
import ListaGrupos from './pages/lista-grupos/lista'
import ProfessorDashboard from './pages/dashboard/ProfessorDashboard'
import Interpretador from './pages/atividades/interpretador'
import ImgUpload from './pages/atividades/img-upload'
import 'react-toastify/dist/ReactToastify.css';
// import AtividadeDeTexto from './pages/atividades/AtividadeDeTexto'
import AtividadeDeTexto from './pages/exercicio/AtividadeDeTexto'
import AtividadeDeImagem from './pages/exercicio/AtividadeDeImagem'
import AlunoAtividades from './pages/tela-cadastro/AlunoAtividades'
import AlunoGrupos from './pages/lista-grupos/AlunoGrupos'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login/admin' />} />
          {/* Rotas de professor */}
          <Route path='/login/professor' element={<ProfLogin />} />
          <Route path='/login/admin' element={<ProfAdminLogin />} />
          <Route path='/professor/dashboard' element={<ProfessorDashboard />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/professor/grupos' element={<ProfessorDashboard />} />
          <Route path='/admin/grupos' element={<ListaGrupos />} />
          {/* Rotas de aluno */}
          <Route path='/login/aluno' element={<LoginAluno />} />
          <Route path='/primeiroacesso' element={<PrimeiroAcessoAluno />} />
          <Route path='/aluno/dashboard' element={<AlunoDashboard />} />
          <Route path='/ativarconta' element={<AtivarContaAluno />} />
          <Route path='/aluno/grupos' element={<AlunoGrupos />} />
          <Route path='/aluno/atividades' element={<AlunoAtividades />} />
          {/* Rotas de exercicio */}
          <Route path='/atividade/interpretador' element={<Interpretador />} />
	        <Route path='/atividade/img-upload' element={<ImgUpload />} />
          <Route path='/atividade/texto' element={<AtividadeDeTexto/>}/>
          <Route path='/atividade/imagem' element={<AtividadeDeImagem/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
