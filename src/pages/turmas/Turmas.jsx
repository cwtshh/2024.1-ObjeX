import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import NavBar from '../../components/navbar/navbar-menu/NavBarMenu';
import SideBar from '../../components/sidebar/SideBar';
import { API_BASE_URL } from '../../util/constants';
import { useAuth } from '../../context/AuthContext';

const Turmas = () => {
  const { token } = useAuth(); 
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    const getTurmas = () => {
      axios.get(` ${API_BASE_URL}/turma/admin `, {
          headers: {
              'Authorization': ` Bearer ${token} `
          }
      })
      .then((response) => {
          console.log(response.data);
          setTurmas(response.data);
      })
      .catch((error) => {
          console.error(error);
      });
    };

    getTurmas();
  }, [token]);

  return (
    <div className='bg-base-200'>
      <NavBar />
      <div className='flex justify-end pr-4'>
        <div className='w-full max-w-[940px] p-4 flex flex-col gap-4 bg-base-100 rounded-xl shadow mt-[15px]'>
          <div className='z-[1] md:absolute md:left-0 md:ml-[62px] mb-6'>
            <SideBar user_role={'admin'} />
          </div>
          <div className="bg-[#2e3440] h-[25px] rounded-t-xl"></div>
          <div className="bg-[#d8dee9] h-[75px] flex items-center justify-between px-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Pesquisar..."
                className="border border-gray-300 rounded-md px-2 py-1 mr-2"
              />
            </div>
            <button className="bg-[#5e81ac] text-base-100 px-4 py-2 rounded-md flex items-center">
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
              Adicionar Turma
            </button>
          </div>

          <div className='flex flex-col gap-2 p-4'>
            {turmas.map((turma) => (
              <div key={turma.id} className="bg-[#d8dee9] p-4 rounded-md flex justify-between items-center"> 
                <span className="text-[#2e3440]">{turma.nome}</span>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faPencilAlt} className="text-green-500 mr-4 cursor-pointer" />
                  <FontAwesomeIcon icon={faTrashAlt} className="text-red-500 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Turmas;