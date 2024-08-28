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
            <div className='z-[1] md:absolute md:left-0 md:ml-[62px]'>
              <SideBar user_role={'admin'}/>
            </div>

            {/* <div className='bg-base-100 shadow-2xl rounded-xl w-2/3 z-[1] flex justify-center pt-[10px] md:h-[85vh] overflow-y-auto'>
              <div className="rounded-t-xl w-full h-[40px] items-center justify-center bg-base-content ">
              </div>

              <div className="pl-[35px] pt-[35px] rounded-b-xl w-full h-1/4 bg-base-100">
                AtivarContaAluno
              </div>


            </div> */}


            <div className='z-[1] pl-20 pr-20 flex items-center justify-center'>
                <div className="card bg-base-100 shadow-2xl w-[60em]">
                    <div className="card-body rounded-t-xl w-full h-[20px] items-center justify-center bg-base-content">
                    </div>
                    <div className="card-body pl-[35px] pt-[35px] rounded-b-xl h-1/2 bg-base-100">
                      <div className='flex justify-between'>
                        <div className='w-2/3'>
                          <input type='text' className='input input-bordered w-full max-w-xs' placeholder='Buscar Grupos...'/>
                        </div>

                        <div className='flex gap-4'> 
                          <button className='btn btn-primary text-white'>Exportar Grupos</button>
                          <button className='btn btn-primary text-white'>Adicionar Grupo</button>    
                        </div>
                      </div>          

                      <div className='h-[34em]'>
                        
                      </div>


                    </div>
                </div>
                
            </div>
              {/* colocar o resto do conteúdo aqui */}
              {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 overflow-y-hidden md:overflow-y-scroll z-[1] gap-4 p-4'>
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
              </div> */}
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
