import React, { useEffect, useState } from 'react'
import ExcluitAlunoModal from '../excluir-aluno-modal/ExcluitAlunoModal'
import EditarAlunoModal from '../editar-aluno-modal/EditarAlunoModal'
import axios from 'axios'
import { API_BASE_URL } from '../../util/constants'
import { ToastifyNotificate } from '../toast/Toastify'

const AlunoCard = ({ aluno, trigger_reload}) => {
    const [ professor, setProfessor ] = useState('');
    const get_professor = async() => {
        await axios.get(`${API_BASE_URL}/turma/${aluno.turma}`).then(res => {
            // setProfessor(res.data);
            setProfessor(res.data.turma.professor.nome || 'Sem professor')
            console.log(res.data.turma.professor.nome || 'Sem professor')
        }).catch(err => {
            ToastifyNotificate('error', 'Erro ao buscar professor', 'erro')
        })
    }

    useEffect(() => {
        get_professor()
    }, [])
  return (
    <ul className="list-none bg-base-100 pl-4 pr-4">
        <li className="p-4 m-2 bg-base-300 rounded-lg">
            <div className="flex md:flex-row flex-col md:justify-between justify-between md:items-center items-middle">
                <div className='flex flex-col md:w-[19vw] pb-4'>
                    <h2 className="text-xl font-bold truncate">{aluno.nome}</h2>
                    <p className="opacity-70">Aluno</p>
                    {aluno.active ? (
                        <p className="text-green-500">Ativo</p>
                    ) : (
                        <p className="text-red-500">Inativo</p>
                    )}
                </div>
                <div className='flex flex-col md:w-[30vw] pb-4'>
                    <p className="truncate">{aluno.email ? (<>{aluno.email}</>) : (<></>)}</p>
                    <p className="truncate">{aluno.matricula}</p>
                    <p>Professor: <strong>{professor ?  (professor) : (<>Sem professor</>)}</strong></p>
                </div>
                <div className='flex gap-4 flex-row  justify-between'>
                    <button className='btn btn-accent text-base-100 rounded-lg' onClick={() => document.getElementById(`${aluno._id}-modal`).showModal()}>Editar</button>
                    <button className='btn btn-error text-base-100 rounded-lg' onClick={() => document.getElementById(`${aluno._id}-delete`).showModal()}>Excluir</button>
                </div>
                <ExcluitAlunoModal aluno={aluno} trigger_reload={trigger_reload}/>
                <EditarAlunoModal aluno={aluno} trigger_reload={trigger_reload}/>
            </div>
        </li>

    </ul>
  )
}

export default AlunoCard