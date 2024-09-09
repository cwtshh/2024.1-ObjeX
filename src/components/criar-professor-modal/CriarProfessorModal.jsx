import axios from 'axios';
import React, { useState } from 'react'
import { ToastifyNotificate } from '../toast/Toastify';
import { API_BASE_URL } from '../../util/constants';
import { useAuth } from '../../context/AuthContext';
import Loading from '../loading/Loading';

const CriarProfessorModal = ({ turmas, trigger_reload }) => {
    const { token } = useAuth()
    const [ nome, setNome ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ turma, setTurma ] = useState('');
    const [ error, setError ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    const create_professor = async(e) => {
        e.preventDefault();
        if(nome === '' || email === '' || turma === '') {
            setError(true);
            ToastifyNotificate('Preencha todos os campos', 'error')
            return;
        }
        setError(false);
        setIsLoading(true);
        await axios.post(`${API_BASE_URL}/professor/register`,
            {
                nome: nome,
                email: email,
                turma: turma,
            }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setNome('')
            setEmail('')
            setTurma('')
            setIsLoading(false)
            document.getElementById('create-professor-modal').close()
            trigger_reload()
            ToastifyNotificate('Professor criado com sucesso', 'success')
        }).catch(error => {
            setIsLoading(false)
            ToastifyNotificate('Erro ao criar professor', 'error')
        }).finally(() => {
            setIsLoading(false)
        })
    }
    
  return (
    <dialog id="create-professor-modal" className="modal">
                <div className="modal-box flex flex-col justify-center items-center">
                    <h3 className='font-bold text-lg'>Professor</h3>
                    <form onSubmit={create_professor} className='flex flex-col justify-center gap-2 w-3/4'>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Nome:</span>
                            </div>
                            <input
                                type="text"
                                className={`input ${error ? 'input-error' : 'input-bordered'}`}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required={true}
                                minLength={3}
                            />
                            {error && <span className='text-sm text-red-500'>Campo obrigatório</span>}
                        </label>

                        <label className='form-control'>
                            <div className='label'>
                            <span className='label-text'>Turma:</span>
                            </div>
                            <select 
                                defaultValue="" 
                                className={`select ${error ? 'select-error' : 'select-bordered'}`}
                                onChange={(e) => setTurma(e.target.value)}
                                required={true}
                            >
                                <option value="" disabled>Selecione uma Turma</option>
                                {turmas.map((turma, index) => {
                                    return <option key={index} value={turma._id}>{turma.nome}</option>
                                })}
                            </select>
                            {error && <span className='text-sm text-red-500'>Campo obrigatório</span>}
                        </label>

                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Email:</span>
                            </div>
                            <input
                                type="email"
                                className={`input ${error ? 'input-error' : 'input-bordered'} mb-6`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required={true}
                                minLength={6}
                            />
                            {error && <span className='text-sm text-red-500'>Campo obrigatório</span>}
                        </label>

                        <button type='submit' disabled={isLoading} className='btn btn-primary text-white rounded'>{isLoading ? (<Loading />): `Cadastrar Professor`}</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
  )
}

export default CriarProfessorModal