import React, { useEffect, useState } from 'react'
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu'
import SideBar from '../../components/sidebar/SideBar';
import { ALUNO_ENDPOINT, GRUPO_ENDPOINT, MONITOR_ENDPOINT, TURMA_ENDPOINT, PROFESSOR_ENDPOINT } from "../../util/constants";
import axios from "axios";
import { useAuth } from '../../context/AuthContext';

const ProfessorDashboard = () => {
  const { token } = useAuth();

  const [alunos, setAlunos] = useState([]);
  const [turma, setTurma] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [monitores, setMonitores] = useState([]);

  useEffect(() => {
    // Pegando alunos do banco de dados
    axios.get(`${ALUNO_ENDPOINT}/`, {
      headers: {
        'Authorization': `Bearer ${token}` // TODO api Alunos tá aceitando só token aluno, arrumar no backend
      }
    }).then((response) => {
      console.log(response.data);
      setAlunos(response.data);
    }).catch((error) => {
      console.error(error);
    });

    // Pegando turmas do banco de dados
    axios.get(`${TURMA_ENDPOINT}/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data);
      setTurma(response.data.turmas);
    }).catch((error) => {
      console.error(error);
    });

    // Pegando grupos do banco de dados
    axios.get(`${GRUPO_ENDPOINT}/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data);
      setGrupos(response.data);
    }).catch((error) => {
      console.error(error);
    });

    // Pegando monitores do banco de dados // TODO fazer endpoints de monitores
    axios.get(`${MONITOR_ENDPOINT}/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data);
      setMonitores(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div>

      <NavBarMenu />
      <div className='flex md:relative justify-center pt-[65px]'>
          <div className='flex justify-center items-center md:items-stretch flex-col md:flex-row md:left-[50px] md:w-[92vw]'>
            <div className='z-[1] md:absolute md:left-0 md:ml-[62px]'>
              <SideBar page={'/professor'} />
            </div>

            <div className='z-[1] md:absolute md:right-0 md:mr-[62px] lg:mr-[0px]  xl:mr-[0px] lg:relative xl:relative lg:center xl:center flex justify-center pt-[20px] md:h-[85vh] overflow-y-2'>
              {/* colocar o resto do conteúdo aqui */}
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 z-[1] gap-x-12 gap-y-6 p-4'>
                

                <a href="" className='h-[200px]'>
                    <div className="bg-base-100 shadow h-[200px] w-[300px] rounded-xl hover:bg-[#d8dee9]">
                    <div className="bg-[#2e3440] h-[25px] rounded-t-xl">
                    </div>
                    
                    <div className="ml-[20px] mt-[20px]">
                      <svg width="100px" height="100px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                      <path d="M512 480a224 224 0 1 0-224-224 224 224 0 0 0 224 224z m0-384a160 160 0 1 1-160 160 160 160 0 0 1 160-160zM989.44 947.84a32 32 0 0 0-6.72-10.56 37.12 37.12 0 0 0-10.56-6.72 32 32 0 0 0-34.88 6.72 36.8 36.8 0 0 0-6.72 10.56 26.56 26.56 0 0 0-2.56 12.16 32 32 0 0 0 2.24 12.16 39.04 39.04 0 0 0 7.04 10.56 32 32 0 0 0 34.88 6.72 37.12 37.12 0 0 0 10.56-6.72 32 32 0 0 0 6.72-34.88zM832 928h-160a32 32 0 0 0 0 64h160a32 32 0 0 0 0-64z" 
                      fill="#5e81ac"></path>
                      <path d="M941.44 862.08a32 32 0 0 0 18.56-41.6 480 480 0 0 0-926.4 137.28 32 32 0 0 0 32 34.24H544a32 32 0 0 0 0-64H101.44a416 416 0 0 1 800-84.48 32 32 0 0 0 40 18.56z" 
                      fill="#5e81ac"></path></g>
                      </svg>
                    </div>
                    


                    <div className="flex justify-between ml-[25px]">
                      <p className="text-2xl mt-[10px]">Alunos</p>
                      <p className="text-5xl mr-[10px]">{alunos.length}</p>
      
                    </div>
                  </div>
                </a>

                <a href="" className='h-[200px]'>
                    <div className="bg-base-100 shadow h-[200px] w-[300px] rounded-xl hover:bg-[#d8dee9]">
                    <div className="bg-[#2e3440] h-[25px] rounded-t-xl">
                    </div>
                    
                    <div className="ml-[20px] mt-[20px]">
                      <svg fill="#5e81ac" height="100px" width="100px" version="1.1" id="Layer_1" 
                        xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" stroke="#5e81ac">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> <g> 
                        <g> <path d="M502.724,381.172h-2.783V78.796c0-5.123-4.153-9.276-9.276-9.276H21.334c-5.123,0-9.276,4.153-9.276,9.276v302.375H9.276 c-5.123,0-9.276,4.153-9.276,9.276v42.758c0,5.123,4.153,9.276,9.276,9.276h493.448c5.123,0,9.276-4.153,9.276-9.276v-42.758 C512,385.325,507.847,381.172,502.724,381.172z M30.61,88.071h450.78v293.099H166.03v-12.371h293.712 c5.123,0,9.276-4.153,9.276-9.276V109.721c0-5.123-4.153-9.276-9.276-9.276H52.25c-5.123,0-9.276,4.153-9.276,9.276v249.804 c0,5.123,4.153,9.276,9.276,9.276h21.025v12.371H30.61V88.071z M82.551,335.943c-5.123,0-9.276,4.153-9.276,9.276v5.029H61.526 V118.997h388.941v231.252H166.03v-5.029c0-5.124-4.153-9.277-9.276-9.277H82.551z M147.478,354.495v26.676H91.827v-26.676H147.478 z M493.448,423.93H18.552v-24.206h474.897V423.93z"></path> </g> </g> </g>
                      </svg>
                      
                    </div>
                    


                    <div className="flex justify-between ml-[25px]">
                      <p className="text-2xl mt-[10px]">Turmas</p>
                      <p className="text-5xl mr-[10px]">{turma.length}</p>
      
                    </div>
                  </div>
                </a>

                <a href="" className='h-[200px]'>
                    <div className="bg-base-100 shadow h-[200px] w-[300px] rounded-xl hover:bg-[#d8dee9]">
                    <div className="bg-[#2e3440] h-[25px] rounded-t-xl">
                    </div>
                    
                    <div className="ml-[20px] mt-[20px]">
                      <svg width="100px" height="100px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="3" stroke="#5e81ac" fill="none">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"><path d="M43.31,37.52A11.83,11.83,0,0,1,31.25,49.35,12.1,12.1,0,0,1,19.63,37.12V20.64a.1.1,0,0,1,.08-.1,90.43,90.43,0,0,1,12.08-1,82.5,82.5,0,0,1,11.57,1,.09.09,0,0,1,.07.1Z"></path><path d="M19.63,26,9,20.47a.1.1,0,0,1,0-.18L31.49,8.86h.09L54,20.17a.1.1,0,0,1,0,.18L43.43,26"></path><path d="M19.63,32.19H17.7s-2.94,0-2.94,4.52c0,4.17,2.93,4.17,2.93,4.17l2.51-.05"></path><path d="M43.3,32.7h1.93s3,0,3,4.53c0,4.17-2.94,4.17-2.94,4.17H42.65"></path><line x1="52.72" y1="45.04" x2="52.72" y2="21.03"></line><circle cx="52.72" cy="47.36" r="2.31"></circle><polyline points="37.76 47.53 37.76 55.15 25.89 55.15 25.89 47.95"></polyline><path d="M43.43,30.13a63,63,0,0,0-11.61-1,60.25,60.25,0,0,0-12.19,1"></path></g>
                      </svg>
                      
                    </div>
                    


                    <div className="flex justify-between ml-[25px]">
                      <p className="text-2xl mt-[10px]">Monitores</p>
                      <p className="text-5xl mr-[10px]">{monitores.length}</p>
      
                    </div>
                  </div>
                </a>

                <a href='' className='h-[200px]'>
                    <div className="bg-base-100 shadow h-[200px] w-[300px] rounded-xl hover:bg-[#d8dee9]">
                    <div className="bg-[#2e3440] h-[25px] rounded-t-xl">
                    </div>
                    
                    <div className="ml-[20px] mt-[20px]">
                      <svg fill="#5e81ac" width="100px" height="100px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#88c0d0">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> <path d="M1807.059 1270.091c-68.668 48.452-188.725 116.556-343.906 158.57-18.861-102.55-92.725-187.37-196.066-219.106-91.708-28.235-185.11-48.339-279.53-61.666 71.944-60.762 121.638-145.807 135.982-243.162 21.91-.791 44.837-1.243 71.04-1.243 166.023.904 331.143 26.316 490.955 75.445 72.621 22.362 121.525 87.755 121.525 162.861v128.301Zm-451.765 338.824c-114.183 80.753-330.24 198.099-621.176 198.099-129.43 0-379.144-26.203-621.177-198.1v-128.752c0-74.993 49.017-140.499 121.75-162.861 162.41-49.694 330.354-74.88 499.427-74.88h8.47c166.588.79 331.821 26.09 491.407 75.106 72.509 22.249 121.3 87.642 121.3 162.635v128.753Zm-903.53-761.901V734.072c0-155.632 126.608-282.352 282.354-282.352 155.746 0 282.353 126.72 282.353 282.352v112.942c0 155.746-126.607 282.353-282.353 282.353S451.765 1002.76 451.765 847.014Zm734.118-734.118c75.22 0 146.146 29.478 199.567 82.899 53.309 53.421 82.786 124.235 82.786 199.454V508.19c0 155.746-126.607 282.353-282.353 282.353-19.651 0-38.4-2.598-56.47-6.438v-50.033c0-156.423-92.047-290.71-224.188-354.748 8.357-148.066 130.447-266.428 280.658-266.428Zm532.857 758.061c-91.37-28.01-184.546-48.226-279.755-61.666 86.174-72.508 142.192-179.802 142.192-301.1V395.248c0-105.374-41.11-204.65-115.877-279.304-74.767-74.767-173.93-115.99-279.417-115.99-200.696 0-365.138 151.002-390.211 345.148-20.217-3.275-40.433-6.325-61.553-6.325-217.977 0-395.294 177.43-395.294 395.294v112.942c0 121.298 56.018 228.593 142.305 301.214-94.305 13.214-188.16 33.092-279.529 61.1C81.092 1246.375 0 1355.249 0 1480.163v185.675l22.588 16.941c275.238 206.344 563.803 237.177 711.53 237.177 344.244 0 593.618-148.63 711.53-237.177l22.587-16.94v-120.51c205.214-50.597 355.652-146.032 429.177-201.373l22.588-16.941V1141.79c0-125.026-80.979-233.901-201.261-270.833Z" fillRule="evenodd"></path> </g>
                      </svg>
                      
                    </div>
                    


                    <div className="flex justify-between ml-[25px]">
                      <p className="text-2xl mt-[10px]">Grupos</p>
                      <p className="text-5xl mr-[10px]">{grupos.length}</p>
      
                    </div>
                  </div>
                </a>


                



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

export default ProfessorDashboard;