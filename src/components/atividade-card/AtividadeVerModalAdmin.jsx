import axios from 'axios'
import React, { useState } from 'react'
import { API_BASE_URL } from '../../util/constants'
import { ToastifyNotificate } from '../toast/Toastify'
import { ToastContainer } from 'react-toastify'

const AtividadeVerModalAdmin = ({ atividade, trigger_reload }) => {
    const [ nome, setNome ] = useState(atividade.nome)
    const [ enunciado, setEnunciado ] = useState(atividade.enunciado)
    const data_abertura_formatted = new Date(atividade.data_abertura).toLocaleDateString()
    const data_encerramento_formatted = new Date(atividade.data_encerramento).toLocaleDateString()
    const update_atividade = async() => {
        await axios.patch(`${API_BASE_URL}/atividade/update`, {
            id: atividade._id,
            nome: nome,
            enunciado: enunciado
        }).then((res) => {
            ToastifyNotificate({ message: res.data.message, type: 'success' })
            trigger_reload();
            document.getElementById(atividade._id).close()
        }).catch((err) => {
            ToastifyNotificate({ message: err.response.data.message, type: 'error' })
        })
    }
    return (
        <dialog id={atividade._id} className="modal">
            <div className="modal-box flex flex-col md:gap-y-4 gap-y-3 max-w-screen-lg max-h-[88vh] bg-base-200">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error text-lg font-bold">✕</button>
                </form>
                <div className='flex flex-col bg-base-300 rounded-lg p-2 px-3 mt-2 w-full justify-center items-center'>
                    <input value={nome} onChange={e => setNome(e.target.value)} type="text" className='font-bold text-2xl w-full p-2 bg-base-300 rounded-lg text-center' />
                </div>
                
                <div className='flex flex-col w-full'>
                    <p className="text-lg font-extrabold opacity-70 pb-0.5 pt-1">Enunciado:</p>
                    <textarea onChange={e => setEnunciado(e.target.value)} style={{ resize: 'none' }} className="w-full h-36 p-2 bg-base-300 rounded-lg" value={atividade.enunciado}></textarea>
                </div>

                <div className='flex flex-col w-full'>
                    <p className="text-lg font-extrabold opacity-70 pb-0.5 pt-1">Data de abertura:</p>
                    <p className="text-lg font-extrabold">{data_abertura_formatted}</p>
                    <p className="text-lg font-extrabold opacity-70 pb-0.5 pt-1">Data de encerramento:</p>
                    <p className="text-lg font-extrabold">{data_encerramento_formatted}</p>
                </div>

                <button onClick={() => update_atividade()} className='btn btn-primary text-white'>Editar</button>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
            <ToastContainer />
        </dialog>
    )
}

export default AtividadeVerModalAdmin