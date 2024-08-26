import React, { useState, useEffect } from 'react'
import NavBarLoginAdmin from '../../components/navbar/navbar-login/NavBarLoginAdmin'
import Loading from '../../components/loading/Loading';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginAluno = () => {
    const [ matricula, setMatricula ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ error, setError ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async(e) => {
        e.preventDefault();
        if(!matricula || !senha) {
            setError('Preencha todos os campos!');
            return;
        }
        setIsLoading(true);
        if(await login({ matricula, senha }, 'estudante')) {
            navigate('/aluno/dashboard');
            return;
        }
        setIsLoading(false);
        setError('Credenciais inválidas!');
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
                        <h2 className='text-2xl font-medium text-base-100'>Login Aluno</h2>
                    </div>
                    <div className="card-body pl-[35px] pt-[35px] rounded-b-xl w-full h-1/4 bg-base-100">
                        <form className='flex flex-col' onSubmit={handleLogin}>
                        <h2 className='text-xl font-medium text-primary-content mb-2'>Matricula</h2>
                        <label className="input bg-base-300 flex items-center gap-2 ">
                            <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            className='h-5 w-5 text-primary'
                            >
                            <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
                            </svg>
                            <input onChange={e => setMatricula(e.target.value)} type="text" className="grow pl-2" placeholder="123456789" />
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
                        <a href='' className='text-accent mt-2 mb-3 w-1/2'>Esqueceu a senha?</a>
                        <div className='flex items-center justify-start'>
                          {error !== '' ? <p className='text-error text-base font-bold mb-2'>{error}</p> : <div className="mb-8"></div>}
                        </div>
                        <button type='submit' className='btn btn-primary mt-4 font-medium w-1/2 h-[55px] self-center'>{isLoading ? <Loading /> : "Logar"}</button>
                        </form>
                    </div>
                </div>
                
            </div>

            <div className='pl-8 pr-8 pt-[16px] mb-[100px] flex items-center justify-center'>
                <div className="pl-5 pr-5 card bg-base-100 shadow-2xl">
                    <div className='flex flex-col items-center p-5 gap-4'> 
                        <h2 className='font-bold'>Primeira vez acessando o ObjeX?</h2>
                        <button onClick={() => navigate('/primeiroacesso')} className='btn btn-secondary mb-1'>{isLoading ? <Loading /> : "Primeiro acesso"}</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default LoginAluno;