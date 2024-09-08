import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext';
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu'
import axios from 'axios';
import { API_BASE_URL } from '../../util/constants';
import SideBar from '../../components/sidebar/SideBar';
import NotifyToast from '../../components/toast/NotifyToast';
import ExcelJS from 'exceljs';
import { ToastifyNotificate } from '../../components/toast/Toastify';
import { ToastContainer } from 'react-toastify';
import DeleteTurmaModal from '../../components/delete-turma-modal/DeleteTurmaModal';
import TurmaCard from '../../components/turma-card/TurmaCard';

const Turmas = () => {

    const [nome, setNome] = useState('')
    const [horario, setHorario] = useState('')
    const [turmas, setTurmas] = useState([])
    const [turmasFiltradas, setTurmasFiltradas] = useState([])
    const modal_create = useRef(null)
    const { token } = useAuth();
    const { user } = useAuth();

    const create_turma = async (e) => {
        e.preventDefault()

        await axios.post(`${API_BASE_URL}/turma/admin`, {
            nome: nome,
            horario: horario,
            professor: user.id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res=>{
            setNome('')
            setHorario('')
            modal_create.current.close()
            get_turmas()
            ToastifyNotificate({ message: 'Turma criada com sucesso', type: 'success' });
        }).catch(err=>{
            NotifyToast({ message: 'Erro ao criar turma', toast_type: 'erro' });
            console.log(err.message)
        })
    }

    const get_turmas = async () => { // TODO - Implementar autenticação
        await axios.get(`${API_BASE_URL}/turma/admin`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setTurmas(res.data.turmas);
            setTurmasFiltradas(res.data.turmas)
        }).catch(err => {
            NotifyToast({ message: 'Erro ao buscar turmas', toast_type: 'erro' });
            console.log(err.message)
        })
    };

    const deletar_turma = async (id) => {
       await axios.delete(`${API_BASE_URL}/turma/delete/admin/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
        }).then(res=>{
        ToastifyNotificate({ message: 'Turma deletada com sucesso', type: 'success' });
        get_turmas()
        
       }).catch(err =>{
            ToastifyNotificate({ message: 'Erro ao deletar turma', type: 'error' });
            console.log(err.message)
       })
    }

    const handleSearch = useCallback((e) => {
        const search = e.target.value;
        if (search === '') {
            setTurmasFiltradas(turmas);
        } else {
            const filtered = turmas.filter(turma => {
                return (
                    turma.nome.toLowerCase().includes(search.toLowerCase()) ||
                    turma.horario.toLowerCase().includes(search.toLowerCase())
                );
            });
            setTurmasFiltradas(filtered);
        }

    }, [turmas]);

    useEffect(() => {
        get_turmas();
    }, [])

    return (
        <div className='bg-base-200'>
            <NavBarMenu />
            <div className='flex justify-center pt-[75px]'>
                <div className='flex justify-center items-center md:items-stretch flex-col md:flex-row md:left-[50px] md:w-[92vw]'>
                    <div className='z-[1] md:absolute md:left-0 md:ml-[62px]'>
                        <SideBar user_role={'admin'} />
                    </div>
                    <div className="bg-base-100 md:ml-[280px] w-[85vw] h-[85vh] shadow z-[5] rounded-xl">
                        <div className="bg-[#2e3440] md:h-[45px] rounded-t-xl flex flex-col items-center justify-center">
                            <h2 className='text-2xl font-medium text-base-100'>Turmas</h2>
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
                                <button onClick={() => modal_create.current.showModal()} className='btn btn-primary text-white'>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 7C10 6.44772 10.4477 6 11 6C11.5523 6 12 6.44772 12 7V10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H12V15C12 15.5523 11.5523 16 11 16C10.4477 16 10 15.5523 10 15V12H7C6.44771 12 6 11.5523 6 11C6 10.4477 6.44772 10 7 10H10V7Z" fill="#E5E9F0" />
                                    </svg>
                                    Adicionar Turma
                                </button>
                            </div>
                        </div>

                        <div className='flex flex-col p-6 overflow-scroll h-4/5'>
                            <div>
                                {/* <!-- Card --> */}
                                {turmasFiltradas.map((turma,index) => {
                                    return (
                                        // <ul key={index} className="list-none bg-base-100 pl-4 pr-4">
                                        //     <li className="p-4 m-2 bg-base-300 rounded-lg">
                                        //         <div className="flex md:flex-row flex-col md:justify-between justify-between md:items-center items-middle">
                                        //             <div className='flex flex-col md:w-[19vw] pb-4'>
                                        //                 <h2 className="text-xl font-bold truncate">{turma.nome}</h2>
                                        //                 <h2>{turma.professor !== null ? (<>Professor Responsável: <strong>{turma.professor.nome}</strong></>): (<p className='font-bold text-red-500'>Turma sem professor, favor adicionar!</p>)}</h2>
                                        //                 <p>Total de alunos: {qtd_alunos}</p>
                                        //             </div>
                                        //             <div className='flex flex-col md:w-[30vw] pb-4'>
                                        //                 <h1 className="truncate">{turma.horario === '0' ? (<p>Horário indisponivel</p>) : (<>{turma.horario}</>)}</h1>
                                        //             </div>

                                        //             <div className='flex gap-4 flex-row  justify-between'>
                                        //                 <button disabled={user.turma._id === turma._id} className='btn btn-error text-base-100 rounded-lg' onClick={() => document.getElementById(`${turma._id}-modal`).showModal()}>Excluir</button>
                                        //             </div>
                                        //         </div>
                                        //     </li>
                                        //     <DeleteTurmaModal turma={turma} trigger_reload={get_turmas}/>
                                        //     {/* ))} */}
                                        // </ul>
                                        <TurmaCard key={index} turma={turma} trigger_reload={get_turmas} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <dialog ref={modal_create} className="modal">
                    <div className="modal-box flex flex-col justify-center items-center">
                        <h3 className='font-bold text-lg'>Criar Turma</h3>
                        <form onSubmit={create_turma} className='flex flex-col justify-center gap-2 w-3/4'>
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Nome:</span>
                                </div>
                                <input
                                    onChange={e => setNome(e.target.value)}
                                    type="text"
                                    className="input input-bordered"
                                />
                            </label>
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Horario:</span>
                                </div>
                                <input
                                    onChange={e => setHorario(e.target.value)}
                                    type="text"
                                    className="input input-bordered"
                                />
                            </label>


                            <button type='submit' className='btn btn-primary text-white'>Criar Turma</button>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
            <div className="z-[-1]">
                <svg className="fixed bottom-0 left-0 w-full h-1/3">
                    <ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="#d8dee9" />
                    <rect x="0" y="50%" width="100%" height="50%" fill="#d8dee9" />
                </svg>
            </div>
            <ToastContainer />
        </div>
    )
};

export default Turmas;