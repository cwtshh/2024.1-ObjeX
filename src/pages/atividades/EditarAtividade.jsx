import React from 'react'
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu'
import SideBar from '../../components/sidebar/SideBar'
import { useParams } from 'react-router-dom'

const EditarAtividade = () => {
  const { id } = useParams();
  return (
    <div>
      <NavBarMenu />
      <div className='flex justify-center pt-[65px]'>
        <div className='flex justify-center items-center md:items-stretch flex-col md:flex-row md:left-[50px] md:w-[92vw]'>
          <div className='z-[1] md:absolute md:left-0 md:ml-[62px]'>
            <SideBar user_role={'admin'} />
          </div>
        </div>
        <div className='bg-base-100 md:ml-[280px] w-[85vw] h-[85vh] shadow z-[5] rounded-xl'>
          <div className="bg-[#2e3440] md:h-[45px] rounded-t-xl flex flex-col items-center justify-center">
            <h1 className="text-[20px] text-[#d8dee9]">Editar Atividade</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarAtividade