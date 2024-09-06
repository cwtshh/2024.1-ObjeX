import React from 'react'
import { formatDateTime } from '../../util/date-util/ConverterData';
import { Icons, toast } from 'react-toastify';
import { ATIVIDADE_ENDPOINT } from "../../util/constants";
import axios from "axios";
import SubmissaoVerModal from './SubmissaoVerModal';

const SubmissaoCard = ({ resposta, atividade }) => {
    const [ erro, setErro ] = React.useState('');
    console.log(resposta)

    const notify = (status, message) => {
        if(status === 'error') {
            toast.warning(`${message}`, {
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              className: 'bg-base-100 md:w-[15vw] w-[75vw]',
              bodyClassName: 'font-bold text-warning-content opacity-60',
              closeButton: false,
              progressClassName: 'bg-warning',
              icon: Icons.info,
            });
        }
        if(status === 'success') {
            toast.success(`${message}`, {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: 'bg-base-100 md:w-[15vw] w-[75vw]',
            bodyClassName: 'font-bold text-warning-content opacity-60',
            closeButton: false,
            progressClassName: 'bg-success',
            icon: Icons.success,
            });
        }
    }

    const downloadCode = () => {
        if(resposta.code === '') {
            return notify('error', 'Resposta em branco!');
        }

        const blob = new Blob([resposta.code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', `${atividade.nome}--${resposta.aluno_id._id}--${formatDateTime(resposta.updatedAt)}.py`);

        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
    }

    const downloadText = () => {
        if(resposta.resposta === '') {
            return notify('error', 'Resposta em branco!');
        }

        const blob = new Blob([resposta.resposta], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', `${atividade.nome}--${resposta.aluno_id._id}--${formatDateTime(resposta.updatedAt)}.txt`);

        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
    }

    const downloadImage = async () => {
        if(resposta.image_url === '') {
            return notify('error', 'URL vazia!');
        }

        // Pegando imagem do banco de dados
        const imagem = await axios.get(`${ATIVIDADE_ENDPOINT}/imagem?atividade_id=${resposta.atividade_id}&aluno_id=${resposta.aluno_id._id}`, {
            responseType: 'blob',
        }).catch((error) => {
            setErro(error.response.data.message);
        });
        
        const url = URL.createObjectURL(imagem.data);

        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', `${atividade.nome}--${resposta.aluno_id._id}--${formatDateTime(resposta.updatedAt)}.png`);

        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
    }

    return (
        <li key={resposta._id} className="p-2 m-2 bg-base-300 rounded-lg">
            <div className="flex md:flex-row flex-col justify-between md:items-center align-middle">
                <div className='flex flex-col md:w-1/2 md:pb-0 pb-4 px-2'>
                    <h2 className="text-xl font-bold truncate">{resposta.aluno_id == undefined ? 'ERROR' : resposta.aluno_id.nome}</h2>
                </div>
                <div className='flex flex-col md:w-1/4 md:pb-0 pb-4 px-2'>
                    <div className='flex flex-row gap-2 mt-1'>
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className='text-neutral w-6 h-6'
                            >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M22 13.126A6 6 0 0013.303 21H3a1 1 0 01-1-1V4a1 1 0 011-1h7.414l2 2H21a1 1 0 011 1v7.126zM20 17h3v2h-3v3.5L15 18l5-4.5V17z" />
                        </svg>
                        <p className="truncate font-bold opacity-80 mt-px">{formatDateTime(resposta.updatedAt)}</p>
                    </div>
                </div>
                <div className='flex flex-row justify-between md:w-2/12'>
                    <div className='md:pb-0 pb-4'>
                        {atividade.type === 'text' ? (
                            <button onClick={downloadText}>
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    className='text-neutral w-9 h-9 mt-3 cursor-pointer hover:text-base-content'
                                    >
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                                </svg>
                            </button>
                        ) : atividade.type === 'image' ? (
                            <button onClick={downloadImage}>
                                <svg
                                    viewBox="0 0 384 512"
                                    fill="currentColor"
                                    className='text-neutral w-9 h-9 mt-3 cursor-pointer hover:text-base-content'
                                    >
                                    <path d="M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zm192 0v128h128L256 0zM128 256c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm88 32c5.3 0 10.2 2.6 13.2 6.9l88 128c3.4 4.9 3.7 11.3 1 16.5S310 448 304 448H80c-5.8 0-11.1-3.1-13.9-8.1s-2.8-11.2.2-16.1l48-80c2.9-4.8 8.1-7.8 13.7-7.8s10.8 2.9 13.7 7.8l12.8 21.4 48.3-70.2c3-4.3 7.9-6.9 13.2-6.9z" />
                                </svg>
                            </button>
                        ) : atividade.type === 'code' ? (
                            resposta.passed ? (
                                <button onClick={downloadCode}>
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        className='rounded-xl text-success md:w-16 md:h-16 w-14 h-14 mt-1 cursor-pointer hover:text-neutral'
                                        >
                                        <path d="M10.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L4.324 8.384a.75.75 0 111.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 01.02-.022z" />
                                    </svg>
                                </button>
                            ) : (
                                <button onClick={downloadCode}>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className='rounded-xl text-error md:w-16 md:h-16 w-14 h-14 mt-1 cursor-pointer hover:text-neutral'
                                        >
                                        <path d="M13.41 12l4.3-4.29a1 1 0 10-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 00-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 000 1.42 1 1 0 001.42 0l4.29-4.3 4.29 4.3a1 1 0 001.42 0 1 1 0 000-1.42z" />
                                    </svg>
                                </button>
                            )
                        ) : (
                            <p className='text-center text-error font-extrabold text-3xl mt-1'>Erro!</p>
                        )}
                    </div>
                    <div className='md:pb-0 pb-4 md:mt-3 md:pr-8 pr-6'>
                        <button onClick={()=>document.getElementById(resposta._id).showModal()}>
                            <svg
                                viewBox="0 0 1024 1024"
                                fill="currentColor"
                                className='text-primary w-10 h-10 md:mt-1 mt-4 cursor-pointer hover:text-neutral'
                                >
                                <path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <SubmissaoVerModal resposta={resposta} atividade={atividade} />
        </li>
    )
}

export default SubmissaoCard