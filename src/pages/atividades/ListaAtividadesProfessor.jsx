import React, { useCallback, useEffect, useState } from 'react'
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu'
import SideBar from '../../components/sidebar/SideBar'
import axios from 'axios'
import { API_BASE_URL } from '../../util/constants'
import AtividadeCard from '../../components/atividade-card/AtividadeCard'
import { useAuth } from '../../context/AuthContext'
import AtividadeCriarModal from './AtividadeCriarModal'

const ListaAtividadesProfessor = () => {
    const { user } = useAuth();
    const [ atividades, setAtividades ] = useState([]);
    const [ filteredAtividades, setFilteredAtividades ] = useState([]);

    const get_atividades = async() => {
        await axios.get(`${API_BASE_URL}/atividade/get/${user.turma._id}`).then((res) => {
            setAtividades(res.data);
            setFilteredAtividades(res.data);
        }).catch(err => {
            setAtividades([]);
            setFilteredAtividades([]);
        })
    };

    const handleSearch = useCallback((e) => {
        const search = e.target.value;
        if(search === '') {
            setFilteredAtividades(atividades);
        } else {
            const filtered = atividades.filter(atividade => {
                return atividade.nome.toLowerCase().includes(search.toLowerCase());
            });
            setFilteredAtividades(filtered);
        }
    
    }, [atividades]);

    

    useEffect(() => {
        get_atividades();
    }, [])

    return (
        <div className='bg-base-200'>
            <NavBarMenu />
            <div className='flex md:relative justify-center pt-[75px]'>
                <div className='flex justify-center items-center md:items-stretch flex-col md:flex-row md:left-[50px] md:w-[92vw]'>
                    <div className='z-[1] md:absolute md:left-0 md:ml-[62px]'>
                    <SideBar user_role={'professor'} />
                    </div>
                    <div className="bg-base-100 md:ml-[280px] w-[85vw] h-[85vh] shadow z-[1] rounded-xl md:mb-8 mb-20 md:mt-0 mt-8 items-center align-middle justify-center">
                        <div className="bg-[#2e3440] h-[45px] rounded-t-xl flex flex-row">
                            <h2 className='md:text-2xl text-xl font-medium text-base-100 m-auto md:clip truncate md:px-2 px-4'>Atividades</h2>
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
                                <button onClick={()=>document.getElementById('criar_atividade').showModal()} className='btn btn-primary text-white md:w-auto w-full'>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 7C10 6.44772 10.4477 6 11 6C11.5523 6 12 6.44772 12 7V10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H12V15C12 15.5523 11.5523 16 11 16C10.4477 16 10 15.5523 10 15V12H7C6.44771 12 6 11.5523 6 11C6 10.4477 6.44772 10 7 10H10V7Z" fill="#E5E9F0"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM2.00683 11C2.00683 15.9668 6.03321 19.9932 11 19.9932C15.9668 19.9932 19.9932 15.9668 19.9932 11C19.9932 6.03321 15.9668 2.00683 11 2.00683C6.03321 2.00683 2.00683 6.03321 2.00683 11Z" fill="#E5E9F0"/>
                                </svg>
                                Adicionar Atividade
                                </button>
                                <AtividadeCriarModal get_atividades={get_atividades} />
                            </div>
                        </div>

                        <ul className='list-none overflow-y-auto h-[68vh] bg-base-100 md:pl-1 md:pr-1 pl-0.5 pr-0.5 rounded-lg'>
                            {atividades.length === 0 ? <h1></h1> : (
                                filteredAtividades.map((atividade, index) => {
                                    return (
                                        <AtividadeCard key={index} atividade={atividade} trigger_reload={get_atividades} />
                                    )
                                })
                            )}
                        </ul>
                    </div>
                </div>
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

export default ListaAtividadesProfessor