import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GRUPO_ENDPOINT, API_BASE_URL } from '../../util/constants';
import { ToastifyNotificate } from '../../components/toast/Toastify';
import axios from 'axios';
import ProfessorConfirmacaoModal from './ProfessorConfirmacaoModal';
import ProfessorGrupoVerModal from './ProfessorGrupoVerModal';
import ProfessorGrupoEditarModal from './ProfessorGrupoEditarModal';

const ProfessorGrupoCard = ({ grupo, reload_trigger }) => {
    const { token } = useAuth();

    const delete_grupo = async() => {
        await axios.delete(`${API_BASE_URL}/grupo/`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id: grupo._id
            }
        }).then(res => {
            reload_trigger();
            ToastifyNotificate({message:'Grupo excluído com sucesso!', type:'success'});
        }).catch(err => {
            ToastifyNotificate({message:'Erro ao excluir grupo!', type:'error'});
        })
    };

    const reload = () => {
        reload_trigger();
    }

    return (
        <li key={grupo._id} className="p-4 m-2 bg-base-300 rounded-lg">
            <div className="flex md:flex-row flex-col justify-between md:items-start items-start">
                <div className='flex flex-col md:w-[13vw] md:pb-0 pb-4'>
                    <h2 className="text-xl font-bold truncate">{grupo.nome}</h2>
                    <h2 className='truncate'>{grupo.turma.nome}</h2>
                </div>
                <div className='flex flex-col md:w-[25vw] md:pb-0 pb-4'>
                    <p className="truncate italic">{grupo.descricao}</p>
                </div>
                <div className='flex flex-row md:w-[8vw] pb-2 pt-2 gap-3 md:mb-0 md:mx-0 mx-8 mb-4 bg-neutral rounded-lg justify-center'>
                    <p className="truncate md:text-4xl text-2xl text-neutral-content">{grupo.membros.length}</p>
                    <p className="truncate md:text-4xl text-2xl text-neutral-content">|</p>
                    <p className="truncate md:text-4xl text-2xl text-neutral-content">{grupo.capacidade}</p>
                </div>
                <div className='flex flex-row md:w-[13vw] justify-between'>
                    <Link onClick={()=>document.getElementById(grupo._id).showModal()}>
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            className='text-primary md:w-10 md:h-10 md:mt-1 w-9 h-9 mt-2 cursor-pointer hover:text-neutral'
                            >
                            <path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
                        </svg>
                    </Link>

                    <button onClick={()=>document.getElementById(`${grupo._id}_editar`).showModal()} className="btn btn-primary text-base-100 rounded-lg w-20">Editar</button>
                    <button onClick={()=>document.getElementById(`${grupo._id}_confirmation`).showModal()} className="btn btn-error text-base-100 rounded-lg w-20">Excluir</button>
                
                    
                </div>
            </div>
            <ProfessorGrupoVerModal grupo={grupo} />
            <ProfessorGrupoEditarModal grupo={grupo} reload_trigger={reload} />
            <ProfessorConfirmacaoModal grupo={grupo} cb={delete_grupo} msg='Realmente deseja excluir o Grupo?' />
        </li>
    )
}

export default ProfessorGrupoCard