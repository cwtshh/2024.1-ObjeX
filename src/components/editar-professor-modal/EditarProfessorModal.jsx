import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { API_BASE_URL } from '../../util/constants'
import { ToastifyNotificate } from '../toast/Toastify'

const EditarProfessorModal = ({ professor, trigger_reload, turmas}) => {
    const { token } = useAuth()
    const [ nome, setNome ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ turma, setTurma ] = useState('')
    const [ error, setError ] = useState(false)

    const update_professor = async() => {
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
            document.getElementById(`${professor._id}-edit`).close()
            ToastifyNotificate({ message: 'Professor atualizado com sucesso', type: 'success' })
        }).catch(error => {
            setError(true)
        })
    }

  return (
    <dialog id={`${professor._id}-edit`} className="modal">
        <div className="modal-box flex flex-col justify-center items-center">
            <h3 className='font-bold text-lg'>Professor</h3>
            <div onSubmit={update_professor} className='flex flex-col justify-center gap-2 w-3/4'>
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
                            />
                            { error ? <p className="text-sm text-red-500">Preencha todos os campos</p> : <></>}
                        </label>

                        <label className='form-control'>
                            <div className='label'>
                            <span className='label-text'>Turma:</span>
                            </div>
                            <select 
                                defaultValue="" 
                                className={`select ${error ? 'input-error' : 'input-bordered'}`}
                                onChange={(e) => setTurma(e.target.value)}
                            >
                                <option value="" disabled>Selecione uma Turma</option>
                                {turmas.map((turma, index) => {
                                    return <option key={index} value={turma._id}>{turma.nome}</option>
                                })}
                            </select>
                            { error ? <p className="text-sm text-red-500">Preencha todos os campos</p> : <></>}
                        </label>

                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Email:</span>
                            </div>
                            <input
                                type="email"
                                className={`input ${error ? 'input-error' : 'input-bordered'}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={professor.email}
                            />
                            { error ? <p className="text-sm text-red-500">Preencha todos os campos</p> : <></>}
                        </label>

                        <button type='submit' className='btn btn-primary text-white mt-2 mb-2' onClick={() => update_professor()}>Atualizar Professor</button>
                        <button className='btn btn-primary text-white mt-2 mb-2' onClick={() => {
                            document.getElementById(`${professor._id}-edit`).close()
                            setError(false)
                            }}>Cancelar</button>
                    </div>
                </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
  )
}

export default EditarProfessorModal