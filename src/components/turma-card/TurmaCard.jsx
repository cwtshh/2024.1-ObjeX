import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../util/constants';
import { ToastifyNotificate } from '../toast/Toastify';
import { useAuth } from '../../context/AuthContext';
import DeleteTurmaModal from '../delete-turma-modal/DeleteTurmaModal';
import axios from 'axios';

const TurmaCard = ({ turma, trigger_reload }) => {
    const { user } = useAuth();
    const [qtd_alunos, setQtdAlunos ] = useState(0);
    const get_qtd_alunos = async() => {
        await axios.get(`${API_BASE_URL}/turma/qtd/${turma._id}`).then(res => {
            setQtdAlunos(res.data.qtd_alunos);
        }).catch(err => {
            ToastifyNotificate('error', 'Erro ao buscar quantidade de alunos da turma');
        })
    }
    useEffect(() => {
        get_qtd_alunos();
    }, [])
  return (
    <ul className="list-none bg-base-100 pl-4 pr-4">
        <li className="p-4 m-2 bg-base-300 rounded-lg">
            <div className="flex md:flex-row flex-col md:justify-between justify-between md:items-center items-middle">
                <div className='flex flex-col md:w-[19vw] pb-4'>
                    <h2 className="text-xl font-bold truncate">{turma.nome}</h2>
                    <h2>{turma.professor !== null ? (<>Responsável: <strong>{turma.professor.nome}</strong></>): (<p className='font-bold text-red-500'>Turma sem professor, favor adicionar!</p>)}</h2>
                    <p>Total de alunos: {qtd_alunos}</p>
                </div>
                <div className='flex flex-col md:w-[30vw] pb-4'>
                    <h1 className="truncate">{turma.horario === '0' ? (<p>Horário indisponivel</p>) : (<>{turma.horario}</>)}</h1>
                </div>
                <div className='flex gap-4 flex-row  justify-between'>
                    <button disabled={user.turma._id === turma._id} className='btn btn-error text-base-100 rounded-lg' onClick={() => document.getElementById(`${turma._id}-modal`).showModal()}>Excluir</button>
                </div>
            </div>
        </li>
        <DeleteTurmaModal turma={turma} trigger_reload={trigger_reload}/>

    </ul>
  )
}

export default TurmaCard