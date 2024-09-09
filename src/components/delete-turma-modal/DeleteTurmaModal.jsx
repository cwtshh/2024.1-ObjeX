import axios from 'axios'
import React from 'react'
import { API_BASE_URL } from '../../util/constants'
import { ToastifyNotificate } from '../toast/Toastify'
import { ToastContainer } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'

const DeleteTurmaModal = ({ turma, trigger_reload }) => {
    const [nome, setNome] = React.useState('');
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
            <div className="modal-box flex flex-col gap-y-3 max-w-screen-1xl max-h-[88vh] bg-base-200">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error text-lg font-bold">✕</button>
                </form>
                <p className="text-justify text-xl md:text-xl">Tem certeza que deseja deletar a turma?</p>
                <p className="text-justify text-error font-bold md:text-lg opacity-80 mt-3">Essa ação é irreversível!</p>
                <label className="form-control mb-2">
                    <div className="label">
                        <span className="opacity-80">{`Confirme o nome do grupo a ser excluído: [${turma.nome}]`}</span>
                    </div>
                    <input
                        onChange={e => setNome(e.target.value)}
                        type="text" 
                        className="input input-bordered"
                        required={true}
                    />
                </label>
                <div className="flex flex-row gap-4">
                    <form method="dialog" className='flex flex-row w-full justify-center'>
                        <button onClick={() => delete_turma()} disabled={(nome != turma.nome)} className="btn btn-error text-base-100 rounded-lg w-full md:text-xl w-3/4 mt-4">Excluir</button>
                    </form>
                    <form method="dialog" className='flex flex-row w-full justify-center'>
                        <button className="btn btn-neutral text-neutral-content rounded-lg w-full md:text-xl w-3/4 mt-4">Cancelar</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog>
    )
}

export default DeleteTurmaModal