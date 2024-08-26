import React, { useState } from 'react'
import NavBarLoginAdmin from '../../components/navbar/navbar-login/NavBarLoginAdmin'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ALUNO_ENDPOINT } from '../../util/constants';
import ErrorAlert from '../../components/alert/error/ErrorAlert';

const PrimeiroAcessoAluno = () => {
    const [ matricula, setMatricula ] = useState('');
    const [ email, setEmail ] = useState('');
    const navigate = useNavigate();
    const [ error, setError ] = useState(false);

    const handleFirstAccess = async(e) => {
        e.preventDefault();
        if(!matricula || !email) {
            alert('Preencha todos os campos');
            return;
        }
        // Enviar email com senha temporária     
        localStorage.setItem('matricula@primeiroAcesso', matricula);  
        try {
            const res = await axios.post(`${ALUNO_ENDPOINT}/register/primeiroacesso`, {
                matricula,
                email
            });
            console.log(res);
            navigate('/ativarconta');       
        } catch(err) {
            setError(true);
            console.log(err);
        }
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
                        <h2 className='text-2xl font-medium text-base-100'>Primeiro Acesso</h2>
                    </div>
                    <div className="card-body pl-[35px] pt-[35px] rounded-b-xl w-full h-1/4 bg-base-100">
                        <h2 className='text-justify'>Digite sua matricula e um email válido para receber sua senha de acesso temporário.</h2>
                        <form onSubmit={handleFirstAccess} className='flex flex-col mt-6'>
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
                            <input onChange={e => setEmail(e.target.value)} type="text" className="grow pl-2" placeholder="email@domain.com" />
                        </label>
                        <h2 className='text-xl font-medium text-primary-content mb-2 mt-4'>Matricula</h2>
                        <label className="input bg-base-300 flex items-center gap-2 ">
                            <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            className='h-5 w-5 text-primary'
                            >
                            <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
                            </svg>
                            <input onChange={e => setMatricula(e.target.value)} type="text" className="grow pl-2" placeholder="123456789" />
                        </label>
                        <button type='submit' className='btn btn-primary font-medium w-1/2 h-[55px] self-center mt-6'>Recebar Senha</button>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                {error && <ErrorAlert message='Aluno não encontrado.' />}
            </div>
        </div>
    )
}

export default PrimeiroAcessoAluno