import React, { useState } from 'react'
import NavBarLoginAdmin from '../../components/navbar/navbar-login/NavBarLoginAdmin'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ToastifyNotificate } from '../../components/toast/Toastify';

const ProfAdminLogin = () => {
  // variaveis para armazenar email e senha digitados
  // useState é um hook do React que permite adicionar estado a componentes funcionais
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    // previne a página de recarregar ao enviar o formulário
    e.preventDefault();
    if(!email || !senha) {
      alert('Preencha todos os campos');
      return;
    }
    const login_action = await login({ email, senha }, 'admin');
    console.log(login_action.passou)
    if(login_action.passou === true) {
      navigate('/admin/dashboard');
      return;
    }
    ToastifyNotificate({ message: login_action.retorno, type: 'error' });
  }

  const handleForgot = async(e) => {
    e.preventDefault();
    alert('Contate o administrador do sistema para redefinir sua senha');
  }

  return (
    <div>
      <NavBarLoginAdmin />

      <div>
        <svg className="absolute bottom-0 z-[-5] inset-y-0 right-0 w-full h-full">
          <ellipse cx="65%" cy="50%" rx="20%" ry="50%" fill="#d8dee9"/>
          <rect x="65%" width="50%" height="100%" fill="#d8dee9"/>
        </svg>
      </div>
        
      <div className='pl-20 pr-20 pt-[100px] flex items-center justify-center'>
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body rounded-t-xl w-full h-[74px] items-center justify-center bg-base-content ">
            <h2 className='text-2xl font-medium text-base-100'>Login Admin</h2>
          </div>
          <div className="card-body pl-[35px] pt-[35px] rounded-b-xl w-full h-1/4 bg-base-100">
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <h2 className='text-xl font-medium text-primary-content mb-2'>Email</h2>
              <label className="input bg-base-300 flex items-center gap-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-5 w-5 text-primary">
                  <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input onChange={e => setEmail(e.target.value)}  type="email" className="grow pl-2" placeholder="email@domain.com" />
              </label>
              <h2 className='text-xl font-medium text-primary-content mb-2 mt-4'>Senha</h2>
              <label className="input bg-base-300 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-5 w-5 text-primary">
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input onChange={e => setSenha(e.target.value)} type="password" className="grow pl-2" placeholder="senha" />
              </label>
              <a href='' onClick={handleForgot} className='text-accent mt-2 mb-[35px] w-1/2'>Esqueceu a senha?</a>
              <button type='submit' className='btn btn-primary font-medium w-1/2 h-[55px] self-center'>Logar</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ProfAdminLogin