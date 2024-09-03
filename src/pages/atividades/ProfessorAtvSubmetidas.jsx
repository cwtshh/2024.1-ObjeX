import React, { useEffect, useState } from 'react'
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu'
import SideBar from '../../components/sidebar/SideBar';
import { formatDateTime } from '../../util/date-util/ConverterData';
import { ATIVIDADE_ENDPOINT } from "../../util/constants";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';

const ProfessorAtvSubmetidas = () => {
    const { id } = useParams();

    const [ atividade, setAtividade ] = useState([]);
    const [ erro, setErro ] = useState('');

    const getAtividade = async () => {
        try {
            // Pegando atividade do banco de dados
            axios.get(`${ATIVIDADE_ENDPOINT}/get/atividade/${id}`, {
            }).then((response) => {
                setAtividade(response.data[0]);
            }).catch((error) => {
                setErro(error.response.data.message);
            });
        } catch (error) {
            setErro(error.response.data.message);
        }
    }

    const getRespostas = async () => {
        try {
            // Pegando respostas do banco de dados
            axios.get(`${ATIVIDADE_ENDPOINT}/get/respostas/${id}`, {
            }).then((response) => {
                console.log(response.data);
            }).catch((error) => {
                setErro(error.response.data.message);
            });
        } catch (error) {
            setErro(error.response.data.message);
        }
    }

    useEffect(() => {
        getAtividade();

        if(atividade.type !== undefined) {
            getRespostas();
        }
    }, []);

    return (
        <div className='bg-base-200'>

        <NavBarMenu />
        <div className='flex md:relative justify-center pt-[75px]'>
                <div className='flex justify-center items-center md:items-stretch flex-col md:flex-row md:left-[50px] md:w-[92vw]'>
                    <div className='z-[1] md:absolute md:left-0 md:ml-[62px] mb-6'>
                        <SideBar user_role={'professor'} />
                    </div>

                    <div className="bg-base-100 md:ml-[280px] w-[85vw] h-[85vh] shadow z-[1] rounded-xl mb-8 items-center align-middle justify-center">
                        <div className="bg-[#2e3440] h-[45px] rounded-t-xl flex flex-row">
                            <h2 className='md:text-2xl text-xl font-medium text-base-100 m-auto'>{atividade.nome}</h2>
                        </div>

                        <div className="flex md:flex-row flex-col justify-between md:items-center items-middle bg-base-300 md:p-4 p-2">
                            <div className='flex flex-col md:w-[65vw]'>
                                <p className="truncate md:text-lg md:pb-3 pb-1">{atividade.enunciado}</p>
                                <div className='flex flex-row md:pb-2 pb-4'>
                                    <p className="md:text-lg">{atividade.turma === undefined ? '' : atividade.turma.nome}</p>
                                    <p className="text-success-content md:text-lg md:mx-3 mx-2">•</p>
                                    <p className="md:text-lg">{atividade.type === 'text' ? "Texto" : atividade.type === 'image' ? "Imagem" : "Código"}</p>
                                </div>
                            </div>
                            <div className='flex flex-col pb-2 md:pr-4'>
                                <div className='flex flex-row gap-2 md:mb-2 mb-1'>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className='text-success w-6 h-6'
                                        >
                                        <path d="M18 10H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3h2c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-7.939 5.499A2.002 2.002 0 0114 16a1.99 1.99 0 01-1 1.723V20h-2v-2.277a1.992 1.992 0 01-.939-2.224z" />
                                    </svg>
                                    <p className="truncate font-bold opacity-80 mt-px">{formatDateTime(atividade.data_abertura)}</p>
                                </div>
                                <div className='flex flex-row gap-2 md:mt-2 mt-1'>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className='text-error w-6 h-6'
                                        >
                                        <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 01.567-3.677A2.001 2.001 0 0114 16a1.99 1.99 0 01-1 1.723z" />
                                    </svg>
                                    <p className="truncate font-bold opacity-80 mt-px">{formatDateTime(atividade.data_encerramento)}</p>
                                </div>
                            </div>
                        </div>

                        {erro ? <p className='text-center text-error font-extrabold text-3xl mt-16'>{erro}</p> : <></>}

                        <ul className="list-none overflow-y-auto h-[68vh] bg-base-100 md:pl-4 md:pr-2 pl-4 pr-4 rounded-lg">
                            {/* {filteredAtividades.length > 0 ? (filteredAtividades.map((atividade, index) => {
                                return (
                                    <AlunoAtividadeCard key={index} atividade={atividade} />
                                )
                            })) : (
                                <div className='flex justify-center items-center'><p className='md:text-2xl md:mt-16 text-lg mt-6 text-primary font-bold opacity-80'>Nenhuma atividade encontrada...</p></div>
                            )} */}
                        </ul>

                    </div>
                </div>
            </div>

            <div className="z-[-1]">
                <svg className="fixed bottom-0 left-0 w-full h-1/3">
                    <ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="#d8dee9"/>
                    <rect x="0" y="50%" width="100%" height="50%" fill="#d8dee9"/>
                </svg>
            </div>

            <ToastContainer className='mt-20 flex flex-col align-center items-center gap-y-2 md:gap-y-0' />
        </div>
    )
}

export default ProfessorAtvSubmetidas