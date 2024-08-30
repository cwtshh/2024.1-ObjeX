import React, { useEffect, useState, useRef, useCallback } from 'react'
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu'
import SideBar from '../../components/sidebar/SideBar';
import axios from 'axios'
import { API_BASE_URL } from '../../util/constants';
import { useAuth } from '../../context/AuthContext';



const ListaDeProfessores = () => {
    const { token } = useAuth();
    const [professores, setProfessores] = useState([]);
    const [professorSelecionado, setProfessorSelecionado] = useState();
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [filteredProfessores,setFilteredProfessores] = useState([])
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

    useEffect(() => {
        getProfessores();
    }, []);


    const handleCriarProfessor = async (e) => {
        e.preventDefault()

        await axios.post(`${API_BASE_URL}/professor/register`,
            {
                nome: nome,
                email: email,
                id_turma: "66bd643a0e288b6d2f04a1a3"
            }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log('Professor criado com sucesso')
            setNome('')
            setEmail('')
            modalRef.current.close()
            getProfessores()
        }).catch(error => {
            console.log('Falha ao criar Professor', error.response.data);
        })
    }

    const handleEditarProfessor = (professor) => {
        setProfessorSelecionado(professor);
        setNome(professor.nome);
        setEmail(professor.email);
        modalEdicao.current.showModal();
    };

    const handleAtualizarProfessor = async (e) => {
        e.preventDefault()
        await axios.put(`${API_BASE_URL}/professor/update`,
            {
                id: professorSelecionado._id,
                nome: nome,
                email: email,
                id_turma: "66bd643a0e288b6d2f04a1a3",
                role: "professor"
            }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log('Professor atualizado com sucesso')
            setNome('')
            setEmail('')
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
        modalEdicao.current.close()
    }

    const handleDeleteProfessor = async (e) => {
        e.preventDefault()

        await axios.delete(`${API_BASE_URL}/professor/delete/`, {
            data: {
                id: "66bd643a0e288b6d2f04a1a3",
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
        <div className='bg-base-200 min-h-screen flex flex-col'>
            <NavBarMenu />

            <div className='flex flex-1 pt-[75px]'>
                <div className='flex flex-col md:flex-row w-full'>
                    <div className='z-[1] md:w-[300px] ml-[90px]'>
                        <SideBar user_role={'admin'} />
                    </div>

                    <div className='z-[1] flex-1 pl-4 pr-4 flex justify-center'>
                        <div className="card bg-base-100 shadow-2xl w-full max-w-[90em]">
                            <div className="rounded-t-xl w-[full] h-[30px] items-center justify-center bg-base-content">
                            </div>
                            <div className="card-body pl-[35px] pt-[20px] rounded-b-xl h-1/2 bg-base-100">
                                <div className='flex justify-between'>
                                    <div className='w-2/3'>
                                        <input type='text' className='input input-bordered w-full max-w-xs' placeholder='Buscar Professores' onChange={handleSearch}/>
                                    </div>

                                    <div className='flex gap-4'>
                                        <button className='btn btn-primary text-white' onClick={() => document.getElementById('my_modal_3').showModal()}>Adicionar Professor</button>
                                    </div>
                                </div>

                                <div className='h-[45em] overflow-y-auto'>
                                    {filteredProfessores.map((professor) => (
                                        <div key={professor._id} className='rounded-xl bg-gray-300 p-[20px] mt-[40px] flex justify-between items-center'>
                                            <div className='flex items-center gap-[30px]'>
                                                <div className="w-14 h-14 rounded-full overflow-hidden">
                                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Professor" />
                                                </div>
                                                <div>
                                                    <p>{professor.nome}</p>
                                                    <p>Professor</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p>{professor.email}</p>
                                            </div>
                                            <div className='flex items-center gap-[30px]'>
                                                <button className='btn btn-primary text-base-100 rounded-lg'
                                                    onClick={() => handleEditarProfessor(professor)}>Editar</button>
                                                <button className='btn btn-error text-base-100 rounded-lg'
                                                    onClick={() => selecionaProfessor(professor)}>Excluir</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    <dialog ref={modalRef} id="my_modal_3" className="modal">
                        <div className="modal-box flex flex-col justify-center items-center">
                            <h3 className='font-bold text-lg'>Professor</h3>
                            <form onSubmit={handleCriarProfessor} className='flex flex-col justify-center gap-2 w-3/4'>
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">Nome:</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </label>

                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">Email:</span>
                                    </div>
                                    <input
                                        type="email"
                                        className="input input-bordered"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>

                                <button type='submit' className='btn btn-primary text-white'>Criar Professor</button>
                            </form>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>

                    <dialog ref={modalEdicao} id="modal_edicao" className="modal">
                        <div className="modal-box flex flex-col justify-center items-center">
                            <h3 className='font-bold text-lg'>Professor</h3>
                            <form onSubmit={handleAtualizarProfessor} className='flex flex-col justify-center gap-2 w-3/4'>
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">Nome:</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </label>

                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">Email:</span>
                                    </div>
                                    <input
                                        type="email"
                                        className="input input-bordered"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>

                                <button type='submit' className='btn btn-primary text-white mt-2 mb-2'>Atualizar Professor</button>
                                <button className='btn btn-primary text-white mt-2 mb-2' onClick={limparProfessor}>Cancelar</button>
                            </form>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>

                    <dialog ref={modalDelete} id="modal_delete" className="modal">
                        <div className="modal-box flex flex-col justify-center items-center">
                            <h3 className='font-bold text-lg gap-10 mb-10'>Realmente deseja excluir ?</h3>
                            <form onSubmit={handleDeleteProfessor} className='flex flex-col justify-center gap-2 w-3/4'>
                                <button type='submit' className='btn btn-error rounded-lg text-white'>Excluir</button>
                                <button type='submit' className='btn btn-primary text-white'
                                    onClick={() => document.getElementById('modal_delete').close()}>Cancelar</button>
                            </form>
                        </div>
                    </dialog>

                </div>
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

export default ListaDeProfessores