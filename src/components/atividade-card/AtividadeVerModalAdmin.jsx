import axios from 'axios'
import React, { useState } from 'react'
import { API_BASE_URL } from '../../util/constants'

const AtividadeVerModalAdmin = ({ atividade, trigger_reload }) => {
    const [ nome, setNome ] = useState(atividade.nome)
    const [ enunciado, setEnunciado ] = useState(atividade.enunciado)
    const [ data_abertura, setDataAbertura ] = useState(atividade.data_abertura)
    const [ data_encerramento, setDataEncerramento ] = useState(atividade.data_encerramento)

    const format_datetime = (datetime) => {
        const date = new Date(datetime);
        return date;
      }

    const update_atividade = async() => {
        await axios.patch(`${API_BASE_URL}/atividade/update`, {
            id: atividade._id,
            nome: nome,
            enunciado: enunciado,
            data_abertura: format_datetime(data_abertura),
            data_encerramento: format_datetime(data_encerramento)
        }).then((res) => {
            trigger_reload();
            document.getElementById(atividade._id).close()
        }).catch((err) => {
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
                    <textarea onChange={e => setEnunciado(e.target.value)} style={{ resize: 'none' }} className="w-full h-36 p-2 bg-base-300 rounded-lg" value={enunciado}></textarea>
                </div>

                <label className='form-control'>
                    <div className='label'>
                        <span className='label-text'>Data de Abertura:</span>
                    </div>
                    <input 
                        type='datetime-local' 
                        className='input input-bordered' 
                        onChange={e => setDataAbertura(e.target.value)}
                    />
                </label>

                <label className='form-control'>
                    <div className='label'>
                        <span className='label-text'>Data de Encerramento:</span>
                    </div>
                    <input 
                        type='datetime-local' 
                        className='input input-bordered' 
                        onChange={e => setDataEncerramento(e.target.value)}
                    />
                </label>

                <button onClick={() => update_atividade()} className='btn btn-primary text-white'>Editar</button>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog>
    )
}

export default AtividadeVerModalAdmin