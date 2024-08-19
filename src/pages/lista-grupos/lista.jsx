import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../util/constants';
import GroupCard from '../../components/navbar/group-card/GroupCard';
import SideBar from '../../components/sidebar/SideBar';

const ListaGrupos = () => {
  const { logout, user } = useAuth();
  const [ grupos, setGrupos ] = useState([]);
  const get_groups = async() => {
    await axios.get(`${API_BASE_URL}/grupo/`).then((res) => {
      setGrupos(res.data);
    }).catch(err => {
      console.log(err);
    });
  };
  useEffect(() => {
    get_groups();
  }, [])
  return (
    <div>
      <NavBarMenu />
      <div className='flex justify-center pt-[65px]'>
          <div className='flex justify-center items-center md:items-stretch flex-col md:flex-row md:left-[50px] md:w-[92vw]'>
            <SideBar />

            <div className='z-[1] flex justify-center pt-[10px] md:h-[85vh] overflow-y-auto'>
              {/* colocar o resto do conteúdo aqui */}
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 overflow-y-hidden md:overflow-y-scroll z-[1] gap-4 p-4'>
                {grupos.length > 0 ? (
                  grupos.map((grupo, index) => {
                    return (
                      <GroupCard key={index} grupo={grupo} />
                    )})
                ) : (
                  <div className=''>
                    <p className='text-2xl'>Nâo há grupos cadastrados</p>
                  </div>
                )}
              </div>
            </div>
        </div>
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

export default ListaGrupos;
