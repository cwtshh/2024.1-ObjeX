import axios from 'axios'
import React from 'react'
import { API_BASE_URL } from '../../util/constants'
import { ToastifyNotificate } from '../toast/Toastify'
import { ToastContainer } from 'react-toastify'

const DeletarAtividadeModalAdmin = ({ atividade, trigger_relaod }) => {
  const deletar_atividade = async() => {
    await axios.delete(`${API_BASE_URL}/atividade/delete/${atividade._id}`).then(res => {
      ToastifyNotificate({ message: 'Atividade deletada com sucesso!', type: 'success' })
      trigger_relaod()
      document.getElementById(`${atividade._id}_delete`).close()
    }).catch(err => {
      ToastifyNotificate({ message: `O correu um erro ao deletar a atividade.`, type: 'error' })
    })
  }

  return (
    <dialog id={`${atividade._id}_delete`} className="modal">
            <div className="modal-box flex flex-col items-center md:gap-y-4 gap-y-3 max-h-[88vh] bg-base-200">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error text-lg font-bold">✕</button>
                </form>
                <h2 className="text-xl font-bold opacity-80">Tem certeza que deseja deletar atividade?</h2>
                <p>Esta ação não pode ser revertida.</p>
                <div className='flex gap-5'>
                    <button onClick={() => deletar_atividade()} className='btn btn-error text-white'>Deletar</button>
                    <button className='btn btn-neutral text-base-100' onClick={() => document.getElementById(`${atividade._id}_delete`).close()}>Cancelar</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
            <ToastContainer />
    </dialog>
  )
}

export default DeletarAtividadeModalAdmin