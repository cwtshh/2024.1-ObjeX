import React, { useEffect, useState } from 'react'
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu'
import SideBar from '../../components/sidebar/SideBar';
import { Link } from 'react-router-dom';

const ListaDeProfessores = () => {

    return (
        <div className='bg-base-200 min-h-screen flex flex-col'>
            <div className='mr-[100px]'>
            <NavBarMenu />
            </div>

            <div className='flex flex-1 pt-[75px]'>
                <div className='flex flex-col md:flex-row w-full'>
                    <div className='z-[1] md:w-[300px]'>
                        <SideBar user_role={'admin'} />
                    </div>

                    <div className='z-[1] flex-1 pl-4 pr-4 flex justify-center'>
                        <div className="card bg-base-100 shadow-2xl w-full max-w-[60em]">
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

                                <div className='h-[34em]'>
                                    {/* Cards contendo os professores */}
                                    <div className='rounded-xl bg-gray-300 p-[20px] mt-[40px] flex justify-between items-center'>
                                        <div className='flex items-center gap-[30px]'>

                                            <div className="w-14 h-14 rounded-full overflow-hidden">
                                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                            </div>

                                            <div>
                                                {/* Nome do Professor que vem do banco */}
                                                <p>Nicollas Gabriel</p>
                                                <p>Professor</p>
                                            </div>
                                        </div>

                                        <div>
                                            {/* Email do Professor que vem do banco */}
                                            <p>nicollas@gmail.com</p>
                                        </div>

                                        <div className='flex items-center gap-[30px]'>
                                            {/* Ícone de ação, como excluir */}

                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="blue"
                                                height="1em"
                                                width="1em"
                                            >
                                                <path d="M4 21a1 1 0 00.24 0l4-1a1 1 0 00.47-.26L21 7.41a2 2 0 000-2.82L19.42 3a2 2 0 00-2.83 0L4.3 15.29a1.06 1.06 0 00-.27.47l-1 4A1 1 0 003.76 21 1 1 0 004 21zM18 4.41L19.59 6 18 7.59 16.42 6zM5.91 16.51L15 7.41 16.59 9l-9.1 9.1-2.11.52z" />
                                            </svg>

                                            <svg
                                                fill="red"
                                                viewBox="0 0 16 16"
                                                height="1em"
                                                width="1em"
                                            >
                                                <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                                                <path
                                                    fillRule="evenodd"
                                                    d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* Cards contendo os professores */}
                                    <div className='rounded-xl bg-gray-300 p-[20px] mt-[40px] flex justify-between items-center'>
                                        <div className='flex items-center gap-[30px]'>

                                            <div className="w-14 h-14 rounded-full overflow-hidden">
                                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                            </div>

                                            <div>
                                                {/* Nome do Professor que vem do banco */}
                                                <p>Nicollas Gabriel</p>
                                                <p>Professor</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p>gabriel@gmail.com</p>
                                        </div>

                                        <div className='flex items-center gap-[30px]'>
                                            {/* Ícone de ação, como excluir */}

                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="blue"
                                                height="1em"
                                                width="1em"
                                            >
                                                <path d="M4 21a1 1 0 00.24 0l4-1a1 1 0 00.47-.26L21 7.41a2 2 0 000-2.82L19.42 3a2 2 0 00-2.83 0L4.3 15.29a1.06 1.06 0 00-.27.47l-1 4A1 1 0 003.76 21 1 1 0 004 21zM18 4.41L19.59 6 18 7.59 16.42 6zM5.91 16.51L15 7.41 16.59 9l-9.1 9.1-2.11.52z" />
                                            </svg>

                                            <svg
                                                fill="red"
                                                viewBox="0 0 16 16"
                                                height="1em"
                                                width="1em"
                                            >
                                                <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                                                <path
                                                    fillRule="evenodd"
                                                    d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
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