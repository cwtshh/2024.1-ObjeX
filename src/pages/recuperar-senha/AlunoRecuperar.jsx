import React, { useState } from 'react'
import NavBarLoginAdmin from '../../components/navbar/navbar-login/NavBarLoginAdmin'
import Loading from '../../components/loading/Loading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ALUNO_ENDPOINT } from '../../util/constants';
import { ToastifyNotificate } from '../../components/toast/Toastify';
import { ToastContainer } from 'react-toastify';

const AlunoRecuperar = () => {
    const [ matricula, setMatricula ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();

    const handleRecuperarSenha = async(e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const res = await axios.post(`${ALUNO_ENDPOINT}/recuperarsenha`, {
                matricula,
            });
            setIsLoading(false);
            ToastifyNotificate({ message: res.data.message, type: 'success' });
            navigate('/login/aluno');
        } catch(err) {
            ToastifyNotificate({ message: err.response.data.message, type: 'error' });
            setIsLoading(false);
        }
    }

    return (
        <div>
            <NavBarLoginAdmin />
            <div className='pl-20 pr-20 md:pt-[100px] pt-[10px] mb-[130px] flex items-center justify-center'>
                <div className="card bg-base-100 shadow-2xl">
                    <div className="card-body rounded-t-xl w-full h-[74px] items-center justify-center bg-base-content ">
                        <h2 className='text-2xl font-medium text-base-100'>Recuperar Senha - Aluno</h2>
                    </div>
                    <div className="card-body pl-[35px] pt-[35px] rounded-b-xl w-full h-1/4 bg-base-100">
                        <h2 className='text-justify'>Digite sua matricula. Um email com uma nova senha será enviado.</h2>
                        <form onSubmit={handleRecuperarSenha} className='flex flex-col mt-2'>
                            <h2 className='text-xl font-medium text-primary-content mb-2 mt-2'>Matricula</h2>
                            <label className="input bg-base-300 flex items-center gap-2 ">
                                <svg
                                viewBox="0 0 1024 1024"
                                fill="currentColor"
                                className='h-5 w-5 text-primary'
                                >
                                <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
                                </svg>
                                <input onChange={e => setMatricula(e.target.value)} type="text" required={true} className="grow pl-2" placeholder="123456789" />
                            </label>
                            <div className='flex items-center justify-start mt-3'>
                            </div>
                            <button type='submit' disabled={isLoading} className='btn btn-primary text-base-100 font-bold text-lg rounded w-1/2 h-[55px] self-center mt-6'>{isLoading ? <Loading /> : "Receber Senha"}</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AlunoRecuperar