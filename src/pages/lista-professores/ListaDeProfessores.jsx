import React, { useEffect, useState } from 'react'
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu'
import SideBar from '../../components/sidebar/SideBar';
import axios from 'axios'
import { API_BASE_URL } from '../../util/constants';
import { useAuth } from '../../context/AuthContext';

const ListaDeProfessores = () => {
    const { token } = useAuth();
    const [professores, setProfessores] = useState([]);

    const getProfessores = () => {
        axios.get(`${API_BASE_URL}/professor/admin/get`, {
            headers: {
                'Authorization': `Bearer ${token}` // TODO: API Alunos está aceitando apenas token de aluno, arrumar no backend
            }
        })
        .then((response) => {
            console.log(response.data);
            setProfessores(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        getProfessores();
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
                                        <input type='text' className='input input-bordered w-full max-w-xs' placeholder='Buscar Professores' />
                                    </div>

                                    <div className='flex gap-4'>
                                        <button className='btn btn-primary text-white'>Adicionar Professor</button>
                                    </div>
                                </div>

                                <div className='h-[45em] overflow-y-auto'>
                                    {professores.map((professor, index) => (
                                        <div key={index} className='rounded-xl bg-gray-300 p-[20px] mt-[40px] flex justify-between items-center'>
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
                                                <button className='btn btn-primary text-base-100 rounded-lg'>Editar</button>
                                                <button className='btn btn-error text-base-100 rounded-lg'>Excluir</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

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