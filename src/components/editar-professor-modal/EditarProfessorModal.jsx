import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { API_BASE_URL } from '../../util/constants'
import { ToastifyNotificate } from '../toast/Toastify'

const EditarProfessorModal = ({ professor, trigger_reload, turmas}) => {
    const { token } = useAuth()
    const [ nome, setNome ] = useState(professor.nome)
    const [ email, setEmail ] = useState(professor.email)
    const [ turma, setTurma ] = useState(professor.turma._id)
    const [ error, setError ] = useState(false)

    const update_professor = async(e) => {
        e.preventDefault()
        if(nome === '' || email === '' || turma === '') {
            setError(true)
            return;
        }
        if(nome === professor.nome && email === professor.email && turma === professor.turma) {
            document.getElementById(`${professor._id}-edit`).close()
            return;
        }
        await axios.put(`${API_BASE_URL}/professor/update`,
            {
                id: professor._id,
                nome: nome,
                email: email,
                id_turma: turma,
                role: "professor"
            }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setNome('')
            setEmail('')
            setTurma('')
            trigger_reload()
            document.getElementById(`${professor._id}-edit`).close()
            ToastifyNotificate({ message: 'Professor atualizado com sucesso', type: 'success' })
        }).catch(error => {
            setError(true)
            document.getElementById(`${professor._id}-edit`).close()
            ToastifyNotificate({ message: 'Erro ao atualizar professor', type: 'error' })
        })
    }

  return (
    <dialog id={`${professor._id}-edit`} className="modal">
        <div className="modal-box flex flex-col justify-center items-center">
            <h3 className='font-bold text-lg'>Professor</h3>
                <form onSubmit={update_professor} className='flex flex-col justify-center gap-2 w-3/4'>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Nome:</span>
                        </div>
                            <input
                                type="text"
                                className={`input ${error ? 'input-error' : 'input-bordered'}`}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder={professor.nome}
                                required={true}
                                minLength={3}
                            />
                            { error ? <p className="text-sm text-red-500">Preencha todos os campos</p> : <></>}
                        </label>

                        <label className='form-control'>
                            <div className='label'>
                            <span className='label-text'>Turma:</span>
                            </div>
                            <select 
                                defaultValue={turma}
                                className={`select ${error ? 'input-error' : 'input-bordered'}`}
                                onChange={(e) => setTurma(e.target.value)}
                                required={true}
                            >
                                <option>Selecione uma Turma</option>
                                {turmas.map((turma, index) => {
                                    return <option key={index} value={turma._id}>{turma.nome}</option>
                                })}
                            </select>
                            { error ? <p className="text-sm text-red-500">Preencha todos os campos</p> : <></>}
                        </label>

                        <label className="form-control mb-6">
                            <div className="label">
                                <span className="label-text">Email:</span>
                            </div>
                            <input
                                type="email"
                                className={`input ${error ? 'input-error' : 'input-bordered'}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={professor.email}
                                required={true}
                                minLength={6}
                            />
                            { error ? <p className="text-sm text-red-500">Preencha todos os campos</p> : <></>}
                        </label>

                        <button type='submit' className='btn btn-primary text-white mt-2 mb-2'>Atualizar Professor</button>
                        <button className='btn btn-primary text-white mt-2 mb-2' onClick={() => {
                            document.getElementById(`${professor._id}-edit`).close()
                            setError(false)
                            }}>Cancelar</button>
                    </form>
                </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
  )
}

export default EditarProfessorModal