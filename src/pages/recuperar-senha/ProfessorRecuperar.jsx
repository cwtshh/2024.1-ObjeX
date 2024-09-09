import React, { useState } from 'react'
import NavBarLoginAdmin from '../../components/navbar/navbar-login/NavBarLoginAdmin'
import Loading from '../../components/loading/Loading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PROFESSOR_ENDPOINT } from '../../util/constants';
import { ToastContainer } from 'react-toastify';
import { ToastifyNotificate } from '../../components/toast/Toastify';

const ProfessorRecuperar = () => {
    const [ email, setEmail ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();

    const handleRecuperarSenha = async(e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const res = await axios.post(`${PROFESSOR_ENDPOINT}/recuperarsenha`, {
                email
            });
            setIsLoading(false);
            ToastifyNotificate({ message: res.data.message, type: 'success' });
            navigate('/login/professor');
        } catch(err) {
            setIsLoading(false);
            ToastifyNotificate({ message: err.response.data.message, type: 'error' });
        }
    }

    return (
        <div>
            <NavBarLoginAdmin />
            <div className='pl-20 pr-20 md:pt-[100px] pt-[10px] mb-[130px] flex items-center justify-center'>
                <div className="card bg-base-100 shadow-2xl">
                    <div className="card-body rounded-t-xl w-full h-[74px] items-center justify-center bg-base-content ">
                        <h2 className='text-2xl font-medium text-base-100'>Recuperar Senha - Professor</h2>
                    </div>
                    <div className="card-body pl-[35px] pt-[35px] rounded-b-xl w-full h-1/4 bg-base-100">
                        <h2 className='text-justify'>Digite seu Email. Uma nova senha será enviada.</h2>
                        <form onSubmit={handleRecuperarSenha} className='flex flex-col mt-3'>
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
                            <input onChange={e => setEmail(e.target.value)} type="email" className="grow pl-2" required={true} placeholder="email@domain.com" />
                        </label>
                        <div className='flex items-center justify-start mt-3'>
                        </div>
                        <button type='submit' disabled={isLoading} className='btn btn-primary font-bold text-base-100 text-lg w-1/2 h-[55px] self-center mt-3'>{isLoading ? <Loading /> : "Receber Senha"}</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ProfessorRecuperar