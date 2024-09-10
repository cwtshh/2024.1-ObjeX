import React from 'react'
import { formatDateTime } from '../../util/date-util/ConverterData'
import AtividadeVerModalAdmin from './AtividadeVerModalAdmin'
import DeletarAtividadeModalAdmin from './DeletarAtividadeModalAdmin'
import { Link } from 'react-router-dom'
import AtividadeVisModal from './AtividadeVisModal'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AtividadeCard = ({ atividade, trigger_reload }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <li className="list-none p-4 m-2 bg-base-300 rounded-lg">
            <div className="flex md:flex-row flex-col md:justify-between justify-between md:items-center items-middle">
                <div className='flex flex-col md:w-[13vw] pb-4'>
                    <h2 className="text-xl font-bold truncate">{atividade.nome}</h2>
                    <p className="opacity-70">{atividade.type === 'text' ? "Texto" : atividade.type === 'image' ? "Imagem" : "Código"}</p>
                    <p>{atividade.professor == undefined ? 'Sem Professor' : atividade.professor.nome}</p>
                </div>
                <div className='flex flex-col md:w-[20vw] pb-4'>
                    <p className="truncate">{atividade.enunciado}</p>
                    <p className="truncate">{atividade.turma == undefined ? 'Sem Turma' : atividade.turma.nome}</p>
                    {/* <p className="truncate opacity-70">{atividade}</p> */}
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
                        {/* <p className="truncate">{formatDateTime(atividade.data_abertura)}</p> */}
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
                <div className='flex md:flex-row flex-col md:w-[20vw] justify-between'>
                    <div className='flex flex-row justify-between md:mb-0 mb-4'>
                        <Link onClick={()=>document.getElementById(`${atividade._id}_ver`).showModal()}>
                            <svg
                                viewBox="0 0 1024 1024"
                                fill="currentColor"
                                className='text-primary md:w-10 md:h-10 md:mt-1 w-9 h-9 mt-2 cursor-pointer hover:text-neutral'
                                >
                                <path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
                            </svg>
                        </Link>
                    </div>
                    <div className='flex flex-row justify-between md:gap-x-7'>
                        {user.role === 'professor' ? (
                            <button className='btn btn-neutral text-base-100 rounded-lg' disabled={atividade._id == undefined} onClick={() => navigate(`/professor/submissoes/${atividade._id}`)}>Submissões</button>
                        ) : (
                            <></>
                        )}
                        <div className='btn btn-neutral text-base-100 rounded-lg' onClick={() => document.getElementById(atividade._id).showModal()}>Editar</div>
                        <div className='btn btn-error text-base-100 rounded-lg' onClick={() => document.getElementById(`${atividade._id}_delete`).showModal()}>Excluir</div>
                    </div>
                </div>
            </div>
            <AtividadeVisModal atividade={atividade} />
            <AtividadeVerModalAdmin atividade={atividade} trigger_reload={trigger_reload} />
            <DeletarAtividadeModalAdmin atividade={atividade} trigger_relaod={trigger_reload} />
        </li>
    )
}

export default AtividadeCard