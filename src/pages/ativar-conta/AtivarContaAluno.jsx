import React, { useEffect, useState } from 'react'
import NavBarLoginAdmin from '../../components/navbar/navbar-login/NavBarLoginAdmin'
import Loading from '../../components/loading/Loading';
import NotifyToast from '../../components/toast/NotifyToast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ALUNO_ENDPOINT } from '../../util/constants';

const AtivarContaAluno = () => {
    const [ senhaAcesso, setSenhaAcesso ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ confirmarSenha, setConfirmarSenha ] = useState('');
    const [ DiffPassError, setDiffPassError ] = useState(false);
    const [ error, setError ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault();
      if(!senhaAcesso || !senha || !confirmarSenha) {
        console.log(senhaAcesso, senha, confirmarSenha)
        setError('Preencha todos os campos');
        return;
      }
      setIsLoading(true);
      try {
        const res = await axios.post(`${ALUNO_ENDPOINT}/register/activate`, {
          senha_antiga: senhaAcesso,
          nova_senha: senha,
          matricula: localStorage.getItem('matricula@primeiroAcesso')
        });
        console.log(res);
        localStorage.removeItem('matricula@primeiroAcesso');
        navigate('/login/aluno');
      } catch(err) {
        if(err.response.data.message) {
          setError(err.response.data.message);
        }
        if(err.response.data.errors) {
          setError(err.response.data.errors[0]);
        }
      } finally {
        setIsLoading(false);
      }
    }

    useEffect(() => { 
      if(senha !== confirmarSenha) {
        setDiffPassError(true);
      } else {
        setDiffPassError(false);
      }
      console.log(DiffPassError)
    }, [senha, confirmarSenha])

    // Para atualizar o estado do Toast de erro:
    useEffect(() => { 
      if(error) {
        setTimeout(() => {
          setError('');
        }, 5000);
      }
    }, [error])

    return (
      <div>
            <NavBarLoginAdmin />
            <div>
                <svg className="absolute bottom-0 z-[-5] inset-y-0 right-0 w-full h-full">
                <ellipse cx="65%" cy="50%" rx="20%" ry="50%" fill="#d8dee9"/>
                <rect x="65%" width="50%" height="100%" fill="#d8dee9"/>
                </svg>
            </div>
            <div className='pl-20 pr-20 pt-[100px] mb-[100px] flex items-center justify-center'>
                <div className="card bg-base-100 shadow-2xl">
                    <div className="card-body rounded-t-xl w-full h-[74px] items-center justify-center bg-base-content ">
                        <h2 className='text-2xl font-medium text-base-100'>Primeiro Acesso</h2>
                    </div>
                    <div className="card-body pl-[35px] pt-[35px] rounded-b-xl w-full h-1/4 bg-base-100">
                        <h2 className='text-justify'>Digite a senha de acesso que você recebeu no seu email e cadastre sua senha definitiva.</h2>
                        <form onSubmit={handleSubmit} className='flex flex-col mt-6'>
                        <h2 className='text-xl font-medium text-primary-content mb-2'>Senha de acesso</h2>
                        <label className="input bg-base-300 flex items-center gap-2 ">
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
                          <input onChange={e => setSenhaAcesso(e.target.value)} type="text" className="grow pl-2" placeholder="senha" />
                        </label>
                        <h2 className='text-xl font-medium text-primary-content mb-2 mt-4'>Senha</h2>
                        <label className="input bg-base-300 flex items-center gap-2 ">
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
                        <h2 className='text-xl font-medium text-primary-content mb-2 mt-4'>Confirmar Senha</h2>
                        <label className="input bg-base-300 flex items-center gap-2 ">
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
                          <input onChange={e => setConfirmarSenha(e.target.value)} type="password" className="grow pl-2" placeholder="senha" />
                        </label>
                        <div className='flex items-center justify-start'>
                          {DiffPassError ? <p className='text-error text-lg font-bold mt-4'>As senhas não conferem!</p> : <div className="mt-11"></div>}
                        </div>
                          {error ? <NotifyToast message={error} toast_type='erro' /> : <></>}
                        <button type='submit' disabled={DiffPassError ? 'disabled' : ''} className='btn btn-primary font-medium w-1/2 h-[55px] self-center mt-6'>{isLoading ? <Loading /> : "Cadastrar Senha"}</button>
                        </form>
                    </div>
                </div> 
            </div>
            
        </div>
    )
}

export default AtivarContaAluno