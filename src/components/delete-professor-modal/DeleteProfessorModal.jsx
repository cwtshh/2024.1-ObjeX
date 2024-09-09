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
        <div className="modal-box flex flex-col justify-center items-center gap-6">
            <h2 className='font-bold text-xl'>Excluir Professor</h2>
            <h3 className=' text-lg'>Realmente deseja excluir <strong>{professor.nome}</strong> ?</h3>
            <p className='text-red-500'>Esta ação é irreversível</p>
            <div className='flex gap-6 w-full items-center justify-center'>
                <button onClick={() => delete_professor()} type='submit' className='btn btn-error  text-white'>Excluir</button>
                <button type='submit' className='btn btn-primary text-white'
                    onClick={() => document.getElementById(`${professor._id}-delete`).close()}>Cancelar</button>
            </div>
        </div>
    </dialog>
  )
}

export default DeleteProfessorModal