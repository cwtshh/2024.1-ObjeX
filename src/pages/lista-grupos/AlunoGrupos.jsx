import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu'
import axios from 'axios';
import { GRUPO_ENDPOINT } from '../../util/constants';
import SideBar from '../../components/sidebar/SideBar';
import AlunoGrupoCard from '../../components/grupo-card/AlunoGrupoCard';
import NotifyToast from '../../components/toast/NotifyToast';
import { ToastContainer } from 'react-toastify';

const AlunoGrupos = () => {
  const { user } = useAuth();
  const [ grupos, setGrupos ] = useState([]);
  const [ erro, setErro ] = useState('');
  const [ filteredGroups, setFilteredGroups ] = useState([]);

  const get_groups = async() => {
    await axios.get(`${GRUPO_ENDPOINT}/${user.turma._id}`).then((res) => {
      setGrupos(res.data);
      setFilteredGroups(res.data);
    }).catch(err => {
      setErro('Erro ao buscar grupos.');
      NotifyToast({ message: 'Erro ao buscar grupos', toast_type: 'erro' });
    });
  };
  
  const handleSearch = useCallback((e) => {
    const search = e.target.value;
    if(search === '') {
      setFilteredGroups(grupos);
    } else {
      const filtered = grupos.filter(grupo => {
        return grupo.nome.toLowerCase().includes(search.toLowerCase())
        || grupo.descricao.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredGroups(filtered);
    }

  });
  
  useEffect(() => {
    get_groups();
  }, [])

  return (
    <div className='bg-base-200'>
      <NavBarMenu />
      <div className='flex md:relative justify-center pt-[75px]'>
        <div className='flex justify-center items-center md:items-stretch flex-col md:flex-row md:left-[50px] md:w-[92vw]'>
          <div className='z-[1] md:absolute md:left-0 md:ml-[62px] mb-6'>
            <SideBar user_role={'aluno'} />
          </div>

          <div className="bg-base-100 md:ml-[280px] w-[85vw] h-[85vh] shadow z-[1] rounded-xl mb-8">
            <div className="bg-[#2e3440] h-[45px] rounded-t-xl flex flex-col items-center justify-center">
              <h2 className='text-2xl font-medium text-base-100'>Grupos</h2>
            </div>

            <label className="input input-bordered m-6 md:w-1/2 border-transparent flex items-center bg-base-300 gap-3">
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

            {erro ? <p className='text-center text-error font-extrabold text-3xl mt-16'>{erro}</p> : <></>}

            <ul className="list-none overflow-y-auto h-[68vh] bg-base-100 md:pl-4 md:pr-2 pl-4 pr-4 rounded-lg">
              {filteredGroups.length > 0 ? (filteredGroups.map((grupo, index) => {
                return (
                  <AlunoGrupoCard key={index} grupo={grupo} />
                )
              })) : (
                <div className='flex justify-center items-center'><p className='md:text-2xl md:mt-16 text-lg mt-6 text-primary font-bold opacity-80'>Nenhum grupo encontrado...</p></div>
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

      <ToastContainer className='mt-20 flex flex-col align-center items-center gap-y-2 md:gap-y-0' />
    </div>
  )
}

export default AlunoGrupos;