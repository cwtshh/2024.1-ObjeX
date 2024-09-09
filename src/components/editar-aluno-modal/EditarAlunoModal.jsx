import React from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../util/constants'
import { useState } from 'react'
import { ToastifyNotificate } from '../toast/Toastify'
import { ToastContainer } from 'react-toastify'


const EditarAlunoModal = ({ aluno, trigger_reload }) => {

    const [nome,setNome] = useState('')
    const [email,setEmail] = useState('')
    const [matricula,setMatricula] = useState('')
    const [ error, setError ] = useState('')

    const update_aluno = async(e) => {
        e.preventDefault();
        if(nome === '' || matricula === '') {
            setError('Preencha todos os campos')
            ToastifyNotificate({type:'error', message:'Preencha todos os campos!'})
            return;
        }
        await axios.put(`${API_BASE_URL}/aluno/update`, {
            id: aluno._id,
            nome: nome,
            email: email,
            matricula: matricula
        }).then(res => {
            ToastifyNotificate({type:'success', message:'Aluno atualizado com sucesso!'})
            trigger_reload()
            document.getElementById(`${aluno._id}-modal`).close()
        }).catch(err => {
            ToastifyNotificate({type:'error', message:'Error ao atualizar aluno!'})
            document.getElementById(`${aluno._id}-modal`).close()
        })
    }
    return (
        <dialog id={`${aluno._id}-modal`} className="modal">
            <div className="modal-box flex flex-col justify-center items-center">
                <h3 className='font-bold text-lg'>Editar Aluno</h3>
                    <form onSubmit={update_aluno} className='flex flex-col justify-center gap-10 w-3/4'>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Email do Aluno:</span>
                            </div>
                            {aluno.active ? (
                                <>
                                    <input
                                        onChange={e => setEmail(e.target.value)}
                                        type="email"
                                        className={`input ${error ? 'input-error text-red-500' : 'input-bordered'}`}
                                        placeholder={aluno.email}
                                        required={true}
                                    />
                                    {error ? <p className="text-sm text-red-500">Preencha todos os campos</p> : <></>}
                                </>
                                
                            ) : (
                                <>
                                    <input 
                                        readOnly
                                        disabled
                                        className='input input-warning text-red-500'
                                        placeholder='Aluno inativo'
                                    />
                                    <p className='text-sm text-info'>Aluno ainda não logou no sistema.</p>
                                </>
                            )}
                        </label>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Nome do Aluno:</span>
                            </div>
                            <input
                                onChange={e => setNome(e.target.value)}
                                placeholder={aluno.nome}
                                type="text"
                                required={true}
                                minLength={3}
                                className={`input ${error ? 'input-error text-red-500' : 'input-bordered'}`}
                            />
                            {error ? <p className="text-sm text-red-500">Preencha todos os campos</p> : <></>}
                        </label>

                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Matricula:</span>
                            </div>
                            <input
                                onChange={e => setMatricula(e.target.value)}
                                placeholder={aluno.matricula}
                                type="text"
                                required={true}
                                minLength={9}
                                className={`input ${error ? 'input-error text-red-500' : 'input-bordered'}`}
                            />
                            {error ? <p className="text-sm text-red-500">Preencha todos os campos</p> : <></>}
                        </label>
                        <div className='flex flex-col gap-3'>
                            <button type='submit' className='btn btn-secondary text-white'>Atualizar</button>
                            <button type='submit' className='btn btn-primary text-white'
                            onClick={() => document.getElementById(`${aluno._id}-modal`).close()}>Cancelar</button>
                        </div>
                    </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default EditarAlunoModal