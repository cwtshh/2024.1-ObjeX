import React from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../util/constants'
import { useState } from 'react'


const EditarAlunoModal = ({ aluno, trigger_reload }) => {

    const [nome,setNome] = useState('')
    const [email,setEmail] = useState('')
    const [matricula,setMatricula] = useState('')

    const update_aluno = async(e) => {
        e.preventDefault();
        console.log(nome + ` ` + email + ` ` + matricula)
        await axios.put(`${API_BASE_URL}/aluno/update`, {
            id: aluno._id,
            nome: nome,
            email: email,
            matricula: matricula
        }).then(res => {
            console.log(`deu bom`)
            trigger_reload()
            document.getElementById(`${aluno._id}-modal`).close()
        }).catch(err => {
            console.log('deu ruim')
        })
    }

    return (
        <dialog id={`${aluno._id}-modal`} className="modal">
            <div className="modal-box flex flex-col justify-center items-center">
                <h3 className='font-bold text-lg'>Editar ALuno</h3>
                    <form onSubmit={update_aluno} className='flex flex-col justify-center gap-2 w-3/4'>
                    <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Email do Aluno:</span>
                                </div>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    type="text"
                                    className="input input-bordered"
                                />
                            </label>
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Nome do Aluno:</span>
                                </div>
                                <input
                                    onChange={e => setNome(e.target.value)}
                                    type="text"
                                    className="input input-bordered"
                                />
                            </label>

                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Matricula:</span>
                                </div>
                                <input
                                    onChange={e => setMatricula(e.target.value)}
                                    type="text"
                                    className="input input-bordered"
                                />
                            </label>
                            <button type='submit' className='btn btn-secondary rounded-lg text-white'>Atualizar</button>
                            <button type='submit' className='btn btn-primary text-white'
                            onClick={() => document.getElementById(`${aluno._id}-modal`).close()}>Cancelar</button>
                    </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default EditarAlunoModal