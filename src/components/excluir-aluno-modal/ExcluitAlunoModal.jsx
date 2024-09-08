import axios from 'axios';
import React from 'react'
import { API_BASE_URL } from '../../util/constants';
import { ToastifyNotificate } from '../toast/Toastify';

const ExcluitAlunoModal = ({ aluno, trigger_reload}) => {
    const delete_aluno = async() => {
        await axios.delete(`${API_BASE_URL}/aluno/delete/${aluno._id}`).then(res => {
            ToastifyNotificate('success', 'Aluno excluido com sucesso');
            trigger_reload();
            document.getElementById(`${aluno._id}-delete`).close();
        }).catch(err => {
            ToastifyNotificate('error', 'Erro ao excluir aluno');
        })
    }
  return (
    <dialog id={`${aluno._id}-delete`} className="modal">
        <div className="modal-box flex flex-col justify-center items-center gap-5">
            <h3 className='text-lg font-bold'>Deletar Aluno</h3>
            <h3 className=''>Realmente deseja excluir o aluno <strong>{aluno.nome}</strong>?</h3>
            <p className='text-red-500 font-bold'>Esta ação é irreversível!</p>
            <div  className='flex flex-col justify-center gap-2 w-3/4'>
                <div className='flex items-center justify-center gap-5'>
                <button 
                    onClick={() => delete_aluno()} 
                    className='btn btn-error text-white'
                >
                    Excluir
                </button>
                <button className='btn btn-primary text-white'
                    onClick={() => document.getElementById(`${aluno._id}-delete`).close()}
                >
                    Cancelar        
                </button>
                    
                </div>
            </div>
        </div>
    </dialog>
  )
}

export default ExcluitAlunoModal