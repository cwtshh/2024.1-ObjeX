import React from 'react'
import { Link } from 'react-router-dom';
import GrupoVerModal from './GrupoVerModal';
import { Icons, toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { GRUPO_ENDPOINT } from '../../util/constants';
import axios from 'axios';

const AlunoGrupoCard = ({ grupo }) => {
    const { user } = useAuth();

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
            toast.warning(`${message}`, {
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

    const entrarGrupo = () => {
        axios.post(`${GRUPO_ENDPOINT}/entrar/`, {
            id_grupo: grupo._id,
            id_estudante: user.id
        })
        .then((res) => {
            // Atualizar o estado do usuário
            user.in_grupo = true;
            
            notify('success', 'Entrou no grupo com sucesso');
        }
        ).catch((err) => {
            notify('error', err.response.data.message);
        });
    }

    return (
        <li key={grupo._id} className="p-4 m-2 bg-base-300 rounded-lg">
            <div className="flex md:flex-row flex-col justify-between md:items-center items-middle">
                <div className='flex flex-col md:w-[13vw] pb-4'>
                    <h2 className="text-xl font-bold truncate">{grupo.nome}</h2>
                </div>
                <div className='flex flex-col md:w-[30vw] pb-4'>
                    <p className="truncate">{grupo.descricao}</p>
                </div>
                <div className='flex flex-row md:w-[10vw] pb-2 pt-2 gap-3 md:mb-0 md:mx-0 mx-8 mb-4 bg-neutral rounded-lg justify-center'>
                    <p className="truncate md:text-4xl text-2xl text-neutral-content">{grupo.membros.length}</p>
                    <p className="truncate md:text-4xl text-2xl text-neutral-content">|</p>
                    <p className="truncate md:text-4xl text-2xl text-neutral-content">{grupo.capacidade}</p>
                </div>
                <div className='flex flex-row md:w-[10vw] justify-between'>
                    <Link onClick={()=>document.getElementById(grupo._id).showModal()}>
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            className='text-primary md:w-10 md:h-10 md:mt-1 w-9 h-9 mt-2 cursor-pointer hover:text-neutral'
                            >
                            <path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
                        </svg>
                    </Link>
                    <button onClick={entrarGrupo} disabled={user.in_grupo ? 'disabled' : ''} className='btn btn-primary text-base-100 rounded-lg'>Entrar</button>
                </div>
            </div>
            <GrupoVerModal grupo={grupo} />
        </li>
    )
}

export default AlunoGrupoCard