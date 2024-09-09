import React, { useEffect, useState, useRef, useCallback } from 'react'
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu'
import SideBar from '../../components/sidebar/SideBar';
import axios from 'axios'
import { API_BASE_URL } from '../../util/constants';
import { useAuth } from '../../context/AuthContext';
import EditarProfessorModal from '../../components/editar-professor-modal/EditarProfessorModal';
import { ToastContainer } from 'react-toastify';
import { ToastifyNotificate } from '../../components/toast/Toastify';
import CriarProfessorModal from '../../components/criar-professor-modal/CriarProfessorModal';
import DeleteProfessorModal from '../../components/delete-professor-modal/DeleteProfessorModal';
import placeholder from '../../assets/avatar-placeholder.png';


const ListaDeProfessores = () => {
    const { user, token } = useAuth();

    const [professores, setProfessores] = useState([]);
    const [ turmas, setTurmas ] = useState([]);

    const [professorSelecionado, setProfessorSelecionado] = useState();
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [ turma, setTurma ] = useState('');
    const [filteredProfessores,setFilteredProfessores] = useState([])
    const [ loading, setLoading ] = useState(false);
    const modalRef = useRef(null);
    const modalEdicao = useRef(null)
    const modalDelete = useRef(null)

    const getProfessores = () => {
        axios.get(`${API_BASE_URL}/professor/admin/get`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setProfessores(response.data)
                setFilteredProfessores(response.data); 
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const get_turmas = async() => {
        await axios.get(`${API_BASE_URL}/turma/admin`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setTurmas(res.data.turmas);
        }).catch(err => {
            ToastifyNotificate('Erro ao buscar turmas', 'error');
        })
    };

    useEffect(() => {
        getProfessores();
        get_turmas();
    }, []);


    const handleCriarProfessor = async (e) => {
        e.preventDefault()

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
            modalRef.current.close()
            getProfessores()
            ToastifyNotificate('Professor criado com sucesso', 'success')
        }).catch(error => {
            ToastifyNotificate('Erro ao criar professor', 'error')
        })
    }

    const handleEditarProfessor = (professor) => {
        setProfessorSelecionado(professor);
        setNome(professor.nome);
        setEmail(professor.email);
        setTurma(professor.turma._id);
        modalEdicao.current.showModal();
    };

    const handleAtualizarProfessor = async (e) => {
        e.preventDefault()
        await axios.put(`${API_BASE_URL}/professor/update`,
            {
                id: professorSelecionado._id,
                nome: nome,
                email: email,
                id_turma: turma,
                role: "professor"
            }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log('Professor atualizado com sucesso')
            setNome('')
            setEmail('')
            setTurma('')
            setProfessorSelecionado(null)
            getProfessores()
            modalEdicao.current.close()
        }).catch(error => {
            console.log('Falha ao atualizar Professor', error.response.data)
        })
    }

    const selecionaProfessor = (professor) => {
        setProfessorSelecionado(professor)
        modalDelete.current.showModal();
    }

    const limparProfessor = ()=>{
        setProfessorSelecionado('')
        setNome('')
        setEmail('')
        setTurma('')
        modalEdicao.current.close()
    }

    const handleDeleteProfessor = async (e) => {
        e.preventDefault()

        await axios.delete(`${API_BASE_URL}/professor/delete/`, {
            data: {
                id: user.turma._id,
                id_delete: professorSelecionado._id
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        ).then(res => {
            console.log('Professor deletado com sucesso')
            setNome('')
            setEmail('')
            setTurma('')
            setProfessorSelecionado(null)
            getProfessores()
            modalDelete.current.close()
        }).catch(error => {
            console.log(error.message)
        })
    }

    const handleSearch = useCallback((e) => {
        const search = e.target.value;
        if(search === '') {
          setFilteredProfessores(professores);
        } else {
          const filtered = professores.filter(professor => {
            return professor.nome.toLowerCase().includes(search.toLowerCase()) 
            || professor.email.toLowerCase().includes(search.toLowerCase())
          });
          setFilteredProfessores(filtered);
        }
      });

    //Quando o usuario fechar o modal de edição com o "esc" os dados serão limpos
      useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                limparProfessor();
                modalEdicao.current.close();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className='bg-base-200'>

        <NavBarMenu />
            <div className='flex md:relative justify-center pt-[75px]'>
                <div className='flex justify-center items-center md:items-stretch flex-col md:flex-row md:left-[50px] md:w-[92vw]'>
                    <div className='z-[1] md:absolute md:left-0 md:ml-[62px]'>
                    <SideBar user_role={'admin'} />
                    </div>
                    <div className="bg-base-100 md:ml-[280px] w-[85vw] h-[85vh] shadow z-[1] rounded-xl md:mb-8 mb-20 md:mt-0 mt-8 items-center align-middle justify-center">
                        <div className="bg-[#2e3440] h-[45px] rounded-t-xl flex flex-row">
                            <h2 className='md:text-2xl text-xl font-medium text-base-100 m-auto md:clip truncate md:px-2 px-4'>Professores</h2>
                        </div>
                        <div className='flex flex md:flex-row flex-col items-center justify-between md:pr-12 md:px-0 px-3'>
                            <label className="input m-6 md:w-2/3 w-full border-transparent flex items-center bg-base-300 gap-3">
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
                            <div className='flex gap-4 md:mb-0 mb-4 md:w-auto w-full'>
                                <button onClick={() => document.getElementById('create-professor-modal').showModal()} className='btn btn-primary text-white md:w-auto w-full'>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 7C10 6.44772 10.4477 6 11 6C11.5523 6 12 6.44772 12 7V10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H12V15C12 15.5523 11.5523 16 11 16C10.4477 16 10 15.5523 10 15V12H7C6.44771 12 6 11.5523 6 11C6 10.4477 6.44772 10 7 10H10V7Z" fill="#E5E9F0"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM2.00683 11C2.00683 15.9668 6.03321 19.9932 11 19.9932C15.9668 19.9932 19.9932 15.9668 19.9932 11C19.9932 6.03321 15.9668 2.00683 11 2.00683C6.03321 2.00683 2.00683 6.03321 2.00683 11Z" fill="#E5E9F0"/>
                                </svg>
                                Adicionar Professor
                                </button>
                            </div>
                        </div>

                        <ul className='list-none overflow-y-auto h-[68vh] bg-base-100 md:px-4 px-1 rounded-lg'>
                            {filteredProfessores.map((professor) => (
                                <li key={professor._id} className="list-none p-4 m-2 bg-base-300 rounded-lg">
                                    <div className="flex md:flex-row flex-col md:justify-between justify-between md:items-center items-middle">
                                        <div className='flex md:w-[40%] h-full md:pb-0 pb-4'>
                                            <div className="w-12 h-12 rounded-full overflow-hidden md:pb-0 mb-4 ring-neutral ring-offset-base-300 ring ring-offset-1">
                                                <img src={placeholder} alt={`Imagem Professor ${professor.nome}`} />
                                            </div>
                                            <div className='ml-5'>
                                                <p className="text-xl font-bo">{professor.nome}</p>
                                                <p className="truncate opacity-70">{professor.role == 'admin' ? 'Admin' : 'Professor'}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col md:w-[30vw] md:pb-0 pb-4'>
                                            <p className="font-bold">{professor.email}</p>
                                            <p className="opacity-90">{professor.turma == undefined ? (<p className="font-bold text-error">Determinar Turma</p>) : professor.turma.nome}</p>
                                        </div>
                                        <div className='flex md:flex-row flex-col md:w-[10vw] justify-between'>
                                            <div className='flex flex-row justify-between md:gap-x-7'>
                                                <button disabled={user.id === professor._id} className='btn btn-neutral text-base-100 rounded-lg' onClick={() => document.getElementById(`${professor._id}-edit`).showModal()}>Editar</button>
                                                <button disabled={user.id === professor._id} className='btn btn-error text-base-100 rounded-lg' onClick={() => document.getElementById(`${professor._id}-delete`).showModal()}>Excluir</button>
                                            </div>
                                        </div>
                                    </div>
                                    <EditarProfessorModal professor={professor} trigger_reload={getProfessores} turmas={turmas} />
                                    <DeleteProfessorModal professor={professor} trigger_reload={getProfessores} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <CriarProfessorModal turmas={turmas} trigger_reload={getProfessores} />
                <ToastContainer />
            </div>
            
            
            <dialog ref={modalDelete} id="modal_delete" className="modal">
                <div className="modal-box flex flex-col justify-center items-center">
                    <h3 className='font-bold text-lg gap-10 mb-10'>Realmente deseja excluir ?</h3>
                    <form onSubmit={handleDeleteProfessor} className='flex flex-col justify-center gap-2 w-3/4'>
                        <button type='submit' className='btn btn-error rounded-lg text-white'>Excluir</button>
                        <button className='btn btn-primary text-white'
                            onClick={() => document.getElementById('modal_delete').close()}>Cancelar</button>
                    </form>
                </div>
            </dialog>

            <div className="z-[-1]">
                <svg className="fixed bottom-0 left-0 w-full h-1/3">
                    <ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="#d8dee9" />
                    <rect x="0" y="50%" width="100%" height="50%" fill="#d8dee9" />
                </svg>
            </div>
        </div>
    )
}

export default ListaDeProfessores