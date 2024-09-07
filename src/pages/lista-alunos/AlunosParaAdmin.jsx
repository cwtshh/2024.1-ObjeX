import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext';
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu'
import axios from 'axios';
import { API_BASE_URL } from '../../util/constants';
import SideBar from '../../components/sidebar/SideBar';
import NotifyToast from '../../components/toast/NotifyToast';
import ExcelJS from 'exceljs';

const AlunosParaAdmin = () => {

    const [alunos, setAlunos] = useState([])
    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [matricula, setMatricula] = useState('')
    const [turmas, setTurmas] = useState([])
    const [turmaDoAluno, setTurmaDoAluno] = useState([])
    const [alunosFiltrados, setAlunosFiltrados] = useState([])
    const [id,setId] = useState('')
    const modal_create = useRef(null)
    const modal_arquivo = useRef(null)
    const modal_delete = useRef(null)
    const { token } = useAuth();
    const [file, setFile] = useState(null);
    const { user } = useAuth();

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const get_alunos = async () => {
        await axios.get(`${API_BASE_URL}/aluno/`).then((res) => {
            setAlunos(res.data);
            setAlunosFiltrados(res.data);
        }).catch(err => {
            NotifyToast({ message: 'Erro ao buscar Alunos', toast_type: 'erro' });
        });
    };

    const create_alunos = async (e) => {
        e.preventDefault()
        await axios.post(`${API_BASE_URL}/aluno/register/`,
            {
                email: email,
                nome: nome,
                matricula: matricula,
                turma: turmaDoAluno
            }
        ).then((res) => {
            setEmail('')
            setNome('')
            setMatricula('')
            setTurmaDoAluno('')
            modal_create.current.close()
            get_alunos()
        }).catch(error => {
            console.log(error)
        })
    }

    const get_turmas = async () => { // TODO - Implementar autenticação
        await axios.get(`${API_BASE_URL}/turma/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setTurmas(res.data.turmas);
        }).catch(err => {
            NotifyToast({ message: 'Erro ao buscar turmas', toast_type: 'erro' });
            console.log(err.message)
        })
    };

    const deletar_aluno = async (id) => {
        await axios.delete(`${API_BASE_URL}/aluno/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                notify({ message: 'Aluno deletado com sucesso', toast_type: 'sucesso' });
                // Atualiza a lista de alunos após a exclusão
                get_alunos();
            }).catch(err => {
                notify({ message: 'Erro ao deletar aluno', toast_type: 'erro' });
                console.error(err);
            })
    }

    const selecionaAluno = (id) => {
        setId(id)
        modal_delete.current.showModal();
    }

    const handleSearch = useCallback((e) => {
        const search = e.target.value;
        if (search === '') {
            setAlunosFiltrados(alunos);
        } else {
            const filtered = alunos.filter(aluno => {
                return (
                    aluno.nome.toLowerCase().includes(search.toLowerCase()) ||
                    aluno.email.toLowerCase().includes(search.toLowerCase()) ||
                    aluno.matricula.toLowerCase().includes(search.toLowerCase())
                );
            });
            setAlunosFiltrados(filtered);
        }

    }, [alunos]);

    const importar_arquivo = async () => {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file);
        const worksheet = workbook.worksheets[0];

        const students = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
                students.push({
                    matricula: row.getCell(1).value,
                    nome: row.getCell(2).value,
                });
            }
        });

        await axios.post(`${API_BASE_URL}/aluno/register/many`, {
            alunos: students,
            turma: turmaDoAluno
        }).then(res => {
        }).catch(err => {
            console.log(err);
        });

        modal_arquivo.current.close()
        setTurmaDoAluno('')
        get_alunos()
    };

    useEffect(() => {
        get_alunos();
        get_turmas();
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
                            <h2 className='text-2xl font-medium text-base-100'>Grupos</h2>
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
                                <button onClick={() => modal_arquivo.current.showModal()} className='btn btn-primary text-white'>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5 3.75V8.75C17.5 9.08152 17.6317 9.39946 17.8661 9.63388C18.1005 9.8683 18.4185 10 18.75 10H23.75" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M21.25 26.25H8.75C8.08696 26.25 7.45107 25.9866 6.98223 25.5178C6.51339 25.0489 6.25 24.413 6.25 23.75V6.25C6.25 5.58696 6.51339 4.95107 6.98223 4.48223C7.45107 4.01339 8.08696 3.75 8.75 3.75H17.5L23.75 10V23.75C23.75 24.413 23.4866 25.0489 23.0178 25.5178C22.5489 25.9866 21.913 26.25 21.25 26.25Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Importar Alunos
                                </button>
                                <button onClick={() => modal_create.current.showModal()} className='btn btn-primary text-white'>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 7C10 6.44772 10.4477 6 11 6C11.5523 6 12 6.44772 12 7V10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H12V15C12 15.5523 11.5523 16 11 16C10.4477 16 10 15.5523 10 15V12H7C6.44771 12 6 11.5523 6 11C6 10.4477 6.44772 10 7 10H10V7Z" fill="#E5E9F0" />
                                    </svg>
                                    Adicionar Aluno
                                </button>
                            </div>
                        </div>

                        <div className='flex flex-col p-6 overflow-scroll h-4/5'>
                            <div>
                                {/* <!-- Card --> */}
                                {alunosFiltrados.length === 0 ? (<><h1>Nenhum aluno encontrado</h1></>) : (alunosFiltrados.map((aluno, index) => {
                                    return (
                                        <ul key={index} className="list-none bg-base-100 pl-4 pr-4">
                                            <li className="p-4 m-2 bg-base-300 rounded-lg">
                                                <div className="flex md:flex-row flex-col md:justify-between justify-between md:items-center items-middle">
                                                    <div className='flex flex-col md:w-[19vw] pb-4'>
                                                        <h2 className="text-xl font-bold truncate">{aluno.nome}</h2>
                                                        <p className="opacity-70">Aluno</p>
                                                    </div>
                                                    <div className='flex flex-col md:w-[30vw] pb-4'>
                                                        <p className="truncate">{aluno.email}</p>
                                                        <p className="truncate">{aluno.matricula}</p>
                                                    </div>

                                                    <div className='flex gap-4 flex-row  justify-between'>
                                                    <button className='btn btn-error text-base-100 rounded-lg' onClick={() => selecionaAluno(aluno._id)}>Editar</button>
                                                    <button className='btn btn-error text-base-100 rounded-lg' onClick={() => selecionaAluno(aluno._id)}>Excluir</button>
                                                    </div>
                                                </div>
                                            </li>
                                            {/* ))} */}
                                        </ul>
                                    )
                                }))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <dialog ref={modal_create} className="modal">
                    <div className="modal-box flex flex-col justify-center items-center">
                        <h3 className='font-bold text-lg'>Criar Aluno</h3>
                        <form onSubmit={create_alunos} className='flex flex-col justify-center gap-2 w-3/4'>
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

                            <label className='form-control'>
                                <div className='label'>
                                    <span className='label-text'>Turma:</span>
                                </div>
                                <select
                                    onChange={e => setTurmaDoAluno(e.target.value)}
                                    defaultValue=""
                                    className='select select-bordered'
                                >
                                    <option value="" disabled>Selecione uma Turma</option>
                                    {turmas.map((turma, index) => {
                                        return (
                                            <option key={index} value={turma._id}>{turma.nome}</option>
                                        )
                                    })}
                                </select>
                            </label>

                            <button type='submit' className='btn btn-primary text-white'>Criar Aluno</button>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
                <dialog ref={modal_arquivo} className="modal">
                    <div className="modal-box flex flex-col justify-center items-center">
                        <label className='form-control'>
                            <div className='label'>
                                <span className='label-text'>Turma:</span>
                            </div>
                            <select
                                onChange={e => setTurmaDoAluno(e.target.value)}
                                defaultValue=""
                                className='select select-bordered'
                            >
                                <option value="" disabled>Selecione uma Turma</option>
                                {turmas.map((turma, index) => {
                                    return (
                                        <option key={index} value={turma._id}>{turma.nome}</option>
                                    )
                                })}
                            </select>
                        </label>
                        <label className="form-control w-full max-w-xs mt-6">
                            <div className="label">
                                <span className="label-text">Selecione um arquivo:</span>
                            </div>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full max-w-xs"
                                onChange={handleFileChange}
                            />
                        </label>

                        <button onClick={() => importar_arquivo()} className='btn btn-primary mt-6'>Cadastrar Estudantes</button>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

                <dialog ref={modal_delete} id="modal_delete" className="modal">
                <div className="modal-box flex flex-col justify-center items-center">
                    <h3 className='font-bold text-lg gap-10 mb-10'>Realmente deseja excluir ?</h3>
                    <form onSubmit={()=>deletar_aluno(id)} className='flex flex-col justify-center gap-2 w-3/4'>
                        <button type='submit' className='btn btn-error rounded-lg text-white'>Excluir</button>
                        <button type='submit' className='btn btn-primary text-white'
                            onClick={() => document.getElementById('modal_delete').close()}>Cancelar</button>
                    </form>
                </div>
                </dialog>

            </div>
            <div className="z-[-1]">
                <svg className="fixed bottom-0 left-0 w-full h-1/3">
                    <ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="#d8dee9" />
                    <rect x="0" y="50%" width="100%" height="50%" fill="#d8dee9" />
                </svg>
            </div>

        </div>
    )
}

export default AlunosParaAdmin;
