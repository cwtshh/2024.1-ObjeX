import React, { useState } from 'react'
import NavBarLoginAdmin from '../../components/navbar/navbar-login/NavBarLoginAdmin'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfLogin = () => {
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
    
    if(await login({ email, senha }, 'professor')) {
      navigate('/professor/dashboard');
      return;
    }
    alert('Email ou senha incorretos');
  }

  return (
    <div>
      <NavBarLoginAdmin />
        
      <div className='p-20 flex items-center justify-center'>
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body rounded-t-[10px] w-[430px] h-[74px] items-center justify-center bg-base-content ">
            <h2 className='text-2xl font-medium text-base-100'>Login Professor</h2>
          </div>
          <div className="card-body pl-[35px] pt-[59px] rounded-b-xl w-[430px] h-[430px] bg-base-100">
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
                <input onChange={e => setEmail(e.target.value)}  type="text" className="grow pl-2" placeholder="email@domain.com" />
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
              <a href='' className='text-accent mt-2 mb-[55px] w-[135px]'>Esqueceu a senha?</a>
              <button type='submit' className='btn btn-primary font-medium w-[280px] h-[63px] self-center'>Logar</button>
            </form>
          </div>
        </div>
      </div>
        
    </div>
  )
}

export default ProfLogin