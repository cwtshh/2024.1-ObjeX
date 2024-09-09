import React from 'react'
import { ToastifyNotificate } from '../toast/Toastify'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import { API_BASE_URL } from '../../util/constants'

const DeleteProfessorModal = ({ professor, trigger_reload}) => {
    const { token, user } = useAuth()
    const delete_professor = async() => {
        await axios.delete(`${API_BASE_URL}/professor/delete/`, {
            data: {
                id: user.id,
                id_delete: professor._id
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        ).then(res => {
            document.getElementById(`${professor._id}-delete`).close()
            trigger_reload()
            ToastifyNotificate('Professor excluído com sucesso', 'success')
        }).catch(error => {
            console.log(error.message)
        })
    }
  return (
    <dialog id={`${professor._id}-delete`} className="modal">
        <div className="modal-box flex flex-col gap-4">
            <h2 className='font-bold text-xl flex justify-center items-center'>Excluir Professor</h2>
            <h3 className='text-lg mt-3'>Realmente deseja excluir <strong>{professor.nome}</strong> ?</h3>
            <p className='text-error font-bold mt-2'>Esta ação é irreversível</p>
            <div className='flex items-center justify-between'>
                <button onClick={() => delete_professor()} type='submit' className='btn btn-error text-white mt-4 w-5/12 rounded'>Excluir</button>
                <button className='btn btn-primary text-white mt-4 w-5/12 rounded'
                    onClick={() => document.getElementById(`${professor._id}-delete`).close()}>Cancelar</button>
            </div>
        </div>
    </dialog>
  )
}

export default DeleteProfessorModal