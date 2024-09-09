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
import ListaGruposAdmin from './pages/lista-grupos/lista-admin'
import ProfessorDashboard from './pages/dashboard/ProfessorDashboard'
import Interpretador from './pages/atividades/interpretador'
import ImgUpload from './pages/atividades/img-upload'
import 'react-toastify/dist/ReactToastify.css';
import AtividadeDeTexto from './pages/exercicio/AtividadeDeTexto'
import AtividadeDeImagem from './pages/exercicio/AtividadeDeImagem'
import ListaAtividadesAdmin from './pages/atividades/ListaAtividadesAdmin'
import EditarAtividade from './pages/atividades/EditarAtividade'
import ProfessorAtvSubmetidas from './pages/atividades/ProfessorAtvSubmetidas'
import ListaAtividadesProfessor from './pages/atividades/ListaAtividadesProfessor'
import AlunoAtividades from './pages/lista-atividades/AlunoAtividades'
import AlunoGrupos from './pages/lista-grupos/AlunoGrupos'
import ListaGruposProf from './pages/lista-grupos/lista-prof'
import AlunosParaAdmin from './pages/lista-alunos/AlunosParaAdmin'
import AlunosParaProfessor from './pages/lista-alunos/AlunosParaProfessor'
import Turmas from './pages/turmas/Turmas'
import ListaDeProfessores from './pages/lista-professores/ListaDeProfessores'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login/aluno' />} />
          {/* Rotas de professor */}
          <Route path='/login/professor' element={<ProfLogin />} />
          <Route path='/professor/dashboard' element={<ProtectedRoute roles={['professor']} element={ProfessorDashboard} />} />
          <Route path='/professor/alunos' element={<ProtectedRoute roles={['professor']} element={AlunosParaProfessor} />}/>
          <Route path='/professor/atividades' element={<ProtectedRoute roles={['professor']} element={ListaAtividadesProfessor} />} />
          <Route path='/professor/submissoes/:id' element={<ProtectedRoute roles={['professor']} element={ProfessorAtvSubmetidas} />} />
          <Route path='/professor/grupos' element={<ProtectedRoute roles={['professor']} element={ListaGruposProf} />} />
          {/* Rotas de admin */}
          <Route path='/login/admin' element={<ProfAdminLogin />} />
          <Route path='/admin/dashboard' element={<ProtectedRoute roles={['admin']} element={AdminDashboard} />} />
          <Route path='/admin/alunos' element={<ProtectedRoute roles={['admin']} element={AlunosParaAdmin} />}/>
          <Route path='/admin/turmas' element={<ProtectedRoute roles={['admin']} element={Turmas} />} />
          <Route path='/admin/grupos' element={<ProtectedRoute roles={['admin']} element={ListaGruposAdmin} />} />
          <Route path='/admin/professores' element={<ProtectedRoute roles={['admin']} element={ListaDeProfessores} />}/>
          <Route path='/admin/atividades' element={<ProtectedRoute roles={['admin']} element={ListaAtividadesAdmin} />} />
          <Route path='/admin/atividade/editar/:id' element={<ProtectedRoute roles={['admin']} element={EditarAtividade} />} />
          {/* Rotas de aluno */}
          <Route path='/login/aluno' element={<LoginAluno />} />
          <Route path='/primeiroacesso' element={<ProtectedRoute roles={['aluno']} element={PrimeiroAcessoAluno} />} />
          <Route path='/ativarconta' element={<ProtectedRoute roles={['aluno']} element={AtivarContaAluno} />} />
          <Route path='/aluno/dashboard' element={<ProtectedRoute roles={['aluno']} element={AlunoDashboard} />} />
          <Route path='/aluno/grupos' element={<ProtectedRoute roles={['aluno']} element={AlunoGrupos} />} />
          <Route path='/aluno/atividades' element={<ProtectedRoute roles={['aluno']} element={AlunoAtividades} />} />
          {/* Rotas de exercicio */}
          <Route path='/atividade/interpretador/:id' element={<ProtectedRoute roles={['aluno']} element={Interpretador} />} />
          <Route path='/atividade/texto/:id' element={<ProtectedRoute roles={['aluno']} element={AtividadeDeTexto} />}/>
          <Route path='/atividade/imagem/:id' element={<ProtectedRoute roles={['aluno']} element={AtividadeDeImagem} />}/>
	        <Route path='/atividade/img-upload' element={<ProtectedRoute roles={['aluno']} element={ImgUpload} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
