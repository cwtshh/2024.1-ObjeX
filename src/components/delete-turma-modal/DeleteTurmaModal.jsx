import axios from 'axios'
import React from 'react'
import { API_BASE_URL } from '../../util/constants'
import { ToastifyNotificate } from '../toast/Toastify'
import { ToastContainer } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'

const DeleteTurmaModal = ({ turma, trigger_reload }) => {
    const { user } = useAuth();

    const delete_turma = async() => {
        await axios.delete(`${API_BASE_URL}/turma/delete/${turma._id}`).then(() => {
            ToastifyNotificate({ message: 'Turma deletada com sucesso', type: 'success' })
            document.getElementById(`${turma._id}-modal`).close()
            trigger_reload()
        }).catch(error => {
            ToastifyNotificate({ message: 'Erro ao deletar turma', type: 'error' })
        })
    }

    return (
        <dialog id={`${turma._id}-modal`} className="modal">
            <div className="modal-box flex flex-col items-center gap-6">
            <h3 className="font-bold text-lg">Deletar Turma</h3>
                <p>Tem certeza que deseja deletar a turma?</p>
                <p className='font-bold text-red-700'>Esta ação é irreversível</p>
                
                <div className='flex gap-5'>
                    <button disabled={user.turma._id === turma._id} onClick={() => delete_turma()} className='btn btn-error'>Deletar</button>
                    <button onClick={() => document.getElementById(`${turma._id}-modal`).close()} className='btn btn-primary'>Cancelar</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default DeleteTurmaModal