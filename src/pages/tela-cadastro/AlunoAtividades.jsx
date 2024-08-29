import React, { useEffect, useState } from 'react'
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu'
import SideBar from '../../components/sidebar/SideBar';
import { formatDateTime } from '../../util/date-util/ConverterData';
import { ATIVIDADE_ENDPOINT } from "../../util/constants";
import axios from "axios";
import { useAuth } from '../../context/AuthContext';

const AlunoAtividades = () => {
  const { token, user } = useAuth();

  const [atividades, setAtividades] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    // Pegando atividades do banco de dados
    axios.get(`${ATIVIDADE_ENDPOINT}/get/${user.turma._id}`, {
    }).then((response) => {
      setAtividades(response.data);
    }).catch((error) => {
      setErro(error.response.data.message);
    });
  }, []);

  return (
    <div className='bg-base-200'>

      <NavBarMenu />
      <div className='flex md:relative justify-center pt-[75px]'>
            <div className='flex justify-center items-center md:items-stretch flex-col md:flex-row md:left-[50px] md:w-[92vw]'>
                <div className='z-[1] md:absolute md:left-0 md:ml-[62px] mb-6'>
                    <SideBar user_role={'aluno'} />
                </div>

                <div className="bg-base-100 md:ml-[280px] w-[85vw] h-[85vh] shadow z-[1] rounded-xl mb-8">
                    <div className="bg-[#2e3440] md:h-[45px] rounded-t-xl flex flex-col items-center justify-center">
                        <h2 className='text-2xl font-medium text-base-100'>Atividades</h2>
                    </div>

                    <label className="input input-bordered m-6 md:w-1/2 border-transparent flex items-center bg-base-300 gap-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-6 w-6 opacity-50 text-primary-content">
                            <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                        </svg>
                        <input type="text" className="grow" placeholder="Pesquisar..." />
                    </label>

                    {erro ? <p className='text-center text-error font-extrabold text-3xl mt-16'>{erro}</p> : (
                        <ul className="list-none overflow-y-auto h-[68vh] bg-base-100 md:pl-4 md:pr-2 pl-4 pr-4 rounded-lg">
                            {atividades.map(atividade => (
                                <li key={atividade._id} className="p-4 m-2 bg-base-300 rounded-lg">
                                    <div className="flex md:flex-row flex-col md:justify-between justify-between md:items-center items-middle">
                                        <div className='flex flex-col md:w-[15vw] pb-4'>
                                            <h2 className="text-xl font-bold truncate">{atividade.nome}</h2>
                                            <p className="opacity-70">{atividade.type === 'text' ? "Texto" : atividade.type === 'image' ? "Imagem" : "Código"}</p>
                                        </div>
                                        <div className='flex flex-col md:w-[30vw] pb-4'>
                                            <p className="truncate">{atividade.enunciado}</p>
                                            <p className="truncate opacity-70">{atividade.turma.nome}</p>
                                        </div>
                                        <div className='flex flex-col md:w-[10vw] pb-4'>
                                            <div className='flex flex-row gap-2 mb-1'>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className='text-success w-6 h-6'
                                                    >
                                                    <path d="M18 10H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3h2c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-7.939 5.499A2.002 2.002 0 0114 16a1.99 1.99 0 01-1 1.723V20h-2v-2.277a1.992 1.992 0 01-.939-2.224z" />
                                                </svg>
                                                <p className="truncate">{formatDateTime(atividade.data_abertura)}</p>
                                            </div>
                                            <div className='flex flex-row gap-2 mt-1'>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className='text-error w-6 h-6'
                                                    >
                                                    <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 01.567-3.677A2.001 2.001 0 0114 16a1.99 1.99 0 01-1 1.723z" />
                                                </svg>
                                                <p className="truncate">{formatDateTime(atividade.data_encerramento)}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-row md:w-[10vw] justify-between'>
                                            <a /* TODO aqui abre modal tarefa, para visualizar href={}*/>
                                                <svg
                                                    viewBox="0 0 1024 1024"
                                                    fill="currentColor"
                                                    className='text-primary md:w-10 md:h-10 md:mt-1 w-9 h-9 mt-3 cursor-pointer hover:text-neutral'
                                                    >
                                                    <path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
                                                </svg>
                                            </a>
                                            <div className='btn btn-primary text-base-100 rounded-lg'>Submeter</div>
                                        </div>
                                    </div>
                                </li>
                            ))} 
                        </ul>
                    )}

                </div>
            </div>
        </div>

        <div className="z-[-1]">
            <svg className="fixed bottom-0 left-0 w-full h-1/3">
                <ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="#d8dee9"/>
                <rect x="0" y="50%" width="100%" height="50%" fill="#d8dee9"/>
            </svg>
        </div>

    </div>
  )
}

export default AlunoAtividades