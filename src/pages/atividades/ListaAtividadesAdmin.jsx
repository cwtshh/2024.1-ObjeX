import React, { useCallback, useEffect, useState } from 'react'
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu'
import SideBar from '../../components/sidebar/SideBar'
import axios from 'axios'
import { API_BASE_URL } from '../../util/constants'
import NotifyToast from '../../components/toast/NotifyToast'
import { ToastContainer } from 'react-toastify'
import AtividadeCard from '../../components/atividade-card/AtividadeCard'
import { ToastifyNotificate } from '../../components/toast/Toastify'
import { useAuth } from '../../context/AuthContext'

const ListaAtividadesAdmin = () => {
    const { user } = useAuth();
    const [ turmas, setTurmas ] = useState([]);
    const [ atividades, setAtividades ] = useState([]);
    const [ filteredAtividades, setFilteredAtividades ] = useState([]);
    const [ tipoAtividade, setTipoAtividade ] = useState('');
    
    const [ nome, setNome ] = useState('');
    const [ enunciado, setEnunciado ] = useState('');
    const [ turma, setTurma ] = useState('');
    const [ data_abertura, setDataAbertura ] = useState('');
    const [ data_encerramento, setDataEncerramento ] = useState('');

    const [ file, setFile ] = useState(null);

    const get_atividades = async() => {
        await axios.get(`${API_BASE_URL}/atividade/get`).then((res) => {
            setAtividades(res.data);
            setFilteredAtividades(res.data);
        }).catch(err => {
            ToastifyNotificate('Erro ao buscar atividades', 'error');
        })
    };

    const get_turmas = async() => {
        await axios.get(`${API_BASE_URL}/turma/admin`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzY1MTlmMTExZTEwOWYxZDEwNWIyZCIsImlhdCI6MTcyNDg3ODcyMCwiZXhwIjoxNzI1NDgzNTIwfQ.Z2xeffUnI5MDZbobKMmHvLAycecwq0Lx7UfQwkGKPfA`
            }
        }).then((res) => {
            setTurmas(res.data.turmas);
        }).catch(err => {
            ToastifyNotificate('Erro ao buscar turmas', 'error');
        })
    };

    const handleSearch = useCallback((e) => {
        const search = e.target.value;
        if(search === '') {
            setFilteredAtividades(atividades);
        } else {
            const filtered = atividades.filter(atividade => atividade.nome.toLowerCase().includes(search.toLowerCase()));
            setFilteredAtividades(filtered);
        }
    
    }, []);

    const handleCreateAtividade = async(e) => {
        e.preventDefault();
        // console.log(nome, enunciado, turma, tipoAtividade, data_abertura, data_encerramento, file);

        if(tipoAtividade === 'code') {
            console.log('code');
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('enunciado', enunciado);
            formData.append('turma', turma);
            formData.append('type', 'code');
            formData.append('data_abertura', data_abertura);
            formData.append('data_encerramento', data_encerramento);
            formData.append('file', file);
            formData.append('professor', user.id);
            console.log(formData);
            await axios.post(`${API_BASE_URL}/atividade/create/code`, formData, {
                headers: {
                    // TODO mudar para o token do admin
                }
            }).then(res => {
                ToastifyNotificate('Atividade criada com sucesso', 'success');
                get_atividades();
                setNome('');
                setEnunciado('');
                setTurma('');
                setTipoAtividade('');
                setDataAbertura('');
                setDataEncerramento('');
                setFile(null);
            }).catch(err => {
                ToastifyNotificate('Erro ao criar atividade', 'error');
            });
        }

        if(tipoAtividade === 'text') {
            console.log('text');
            await axios.post(`${API_BASE_URL}/atividade/create/text`, {
                nome: nome,
                enunciado: enunciado,
                turma: turma,
                type: 'text',
                data_abertura: data_abertura,
                data_encerramento: data_encerramento,
                professor: user.id
            }, {
                headers: {
                    // TODO mudar para o token do admin
                }
            }).then(res => {
                ToastifyNotificate('Atividade criada com sucesso', 'success');
                get_atividades();
                setNome('');
                setEnunciado('');
                setTurma('');
                setTipoAtividade('');
                setDataAbertura('');
                setDataEncerramento('');
                setFile(null);
            }).catch(err => {
                ToastifyNotificate('Erro ao criar atividade', 'error');
            });
        }

        if(tipoAtividade === 'image') {
            console.log('image');
            await axios.post(`${API_BASE_URL}/atividade/create/image`, {
                nome: nome,
                enunciado: enunciado,
                turma: turma,
                type: 'image',
                data_abertura: data_abertura,
                data_encerramento: data_encerramento,
                professor: user.id
            }, {
                headers: {
                    // TODO mudar para o token do admin
                }
            }).then(res => {
                ToastifyNotificate('Atividade criada com sucesso', 'success');
                get_atividades();
                setNome('');
                setEnunciado('');
                setTurma('');
                setTipoAtividade('');
                setDataAbertura('');
                setDataEncerramento('');
                setFile(null);
            }).catch(err => {
                ToastifyNotificate('Erro ao criar atividade', 'error');
            });
        }
    }

    useEffect(() => {
        get_atividades();
        get_turmas();
        // console.log(atividades);
    }, [])




    return (
        <div>
            <NavBarMenu />
            <div className='flex justify-center pt-[65px]'>
            <div className='flex justify-center items-center md:items-stretch flex-col md:flex-row md:left-[50px] md:w-[92vw]'>
                <div className='z-[1] md:absolute md:left-0 md:ml-[62px]'>
                <SideBar user_role={'admin'} />
                </div>
            <div className="bg-base-100 md:ml-[280px] w-[85vw] h-[85vh] shadow z-[5] rounded-xl">
                <div className="bg-[#2e3440] md:h-[45px] rounded-t-xl flex flex-col items-center justify-center">
                <h2 className='text-2xl font-medium text-base-100'>Atividades</h2>
                </div>
                <div className='flex items-center justify-between pr-12 pl-6'>
                <div>
                    <label className="input m-6 md:w-full border-transparent flex items-center bg-base-300 gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-6 w-6 opacity-50 text-primary-content">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                    <input onChange={handleSearch} type="text" className="grow" placeholder="Pesquisar..." />
                    </label>
                </div>
                <div className='flex gap-4'>
                    <button onClick={()=>document.getElementById('my_modal_2').showModal()} className='btn btn-primary text-white'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 7C10 6.44772 10.4477 6 11 6C11.5523 6 12 6.44772 12 7V10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H12V15C12 15.5523 11.5523 16 11 16C10.4477 16 10 15.5523 10 15V12H7C6.44771 12 6 11.5523 6 11C6 10.4477 6.44772 10 7 10H10V7Z" fill="#E5E9F0"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM2.00683 11C2.00683 15.9668 6.03321 19.9932 11 19.9932C15.9668 19.9932 19.9932 15.9668 19.9932 11C19.9932 6.03321 15.9668 2.00683 11 2.00683C6.03321 2.00683 2.00683 6.03321 2.00683 11Z" fill="#E5E9F0"/>
                    </svg>
                    Adicionar Atividade
                    </button>
                </div>
                </div>

                <div className='flex flex-col p-6 overflow-scroll h-4/5'>
                    {atividades.length === 0 ? <h1></h1> : (
                        filteredAtividades.map(atividade => {
                            return (
                                <AtividadeCard atividade={atividade} />
                            )
                        })
                    )}
                </div>
            </div>
            </div>
            <dialog id="my_modal_2" className="modal">
            <div className="modal-box flex flex-col justify-center items-center">
                <h3 className='font-bold text-lg'>Atividades</h3>
                <form onSubmit={handleCreateAtividade} className='flex flex-col justify-center gap-2 w-3/4'>
                    <label className="form-control">
                        <div className="label">
                        <span className="label-text">Nome:</span>
                        </div>
                        <input
                            type="text" 
                            className="input input-bordered"
                            onChange={e => setNome(e.target.value)} 
                        />
                    </label>

                    <label className="form-control">
                        <div className="label">
                        <span className="label-text">Enunciado:</span>
                        </div>
                        <textarea 
                            type="text" 
                            className='textarea textarea-bordered h-48' 
                            style={{ resize : 'none'}}
                            onChange={e => setEnunciado(e.target.value)}
                        />
                    </label>

                    <label className='form-control'>
                        <div className='label'>
                        <span className='label-text'>Turma:</span>
                        </div>
                        <select 
                            defaultValue="" 
                            className='select select-bordered'
                            onChange={(e) => setTurma(e.target.value)}
                        >
                            <option value="" disabled>Selecione uma Turma</option>
                            {turmas.map(turma => {
                                return <option value={turma._id}>{turma.nome}</option>
                            })}
                        </select>
                    </label>

                    <label className='form-control'>
                        <div className='label'>
                        <span className='label-text'>Tipo:</span>
                        </div>
                        <select 
                            defaultValue="" 
                            className='select select-bordered'
                            onChange={(e) => setTipoAtividade(e.target.value)}
                        >
                            <option value="" disabled>Selecione o tipo da atividade</option>
                            <option value="text">Texto</option>
                            <option value="image">Imagem</option>
                            <option value="code">Código</option>
                        </select>
                    </label>

                    {tipoAtividade === 'code' ? (
                        <label className='form-control'>
                            <div className='label'>
                            <span className='label-text'>Arquivo de Teste:</span>
                            </div>
                            <input 
                                type='file' 
                                className='file-input file-input-bordered w-full max-w-xs' 
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                    ) : (<></>)}

                    <label className='form-control'>
                        <div className='label'>
                            <span className='label-text'>Data de Abertura:</span>
                        </div>
                        <input 
                            type='date' 
                            className='input input-bordered' 
                            onChange={e => setDataAbertura(e.target.value)}
                        />
                    </label>

                    <label className='form-control'>
                        <div className='label'>
                            <span className='label-text'>Data de Encerramento:</span>
                        </div>
                        <input 
                            type='date' 
                            className='input input-bordered' 
                            onChange={e => setDataEncerramento(e.target.value)}
                        />
                    </label>

                    <button type='submit' className='btn btn-primary text-white'>Criar Atividade</button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            </dialog>

            <ToastContainer />
        </div>
        <div className="z-[-1]">
            <svg className="fixed bottom-0 left-0 w-full h-1/3">
            <ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="#d8dee9"/>
            <rect x="0" y="50%" width="100%" height="50%" fill="#d8dee9"/>
            </svg>
        </div>
            <div className="z-[-1]">
            <svg className="fixed bottom-0 left-0 w-full h-1/3">
            <ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="#d8dee9"/>
            <rect x="0" y="50%" width="100%" height="50%" fill="#d8dee9"/>
            </svg>
        </div>
        
        </div>
    )
}

export default ListaAtividadesAdmin