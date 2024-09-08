import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, GRUPO_ENDPOINT } from '../../util/constants';
import SideBar from '../../components/sidebar/SideBar';
import NotifyToast from '../../components/toast/NotifyToast';
import ExcelJs from 'exceljs';
import ProfessorGrupoCard from '../../components/grupo-card/ProfessorGrupoCard';

const ListaGruposProf = () => {
  const { logout, user, token } = useAuth();
  const [ grupos, setGrupos ] = useState([]);
  const [ filteredGroups, setFilteredGroups ] = useState([]);
  const [ turmas, setTurmas ] = useState([]);
  const [ turmaprof, setTurmaProf ] = useState([]);

  const [ nome, setNome ] = useState('');
  const [ descricao, setDescricao ] = useState('');
  const [ turma, setTurma ] = useState('');
  const [ capacidade, setCapacidade ] = useState('');

  const get_groups = async() => {
    await axios.get(`${GRUPO_ENDPOINT}/${user.turma._id}`).then((res) => {
      setGrupos(res.data);
      setFilteredGroups(res.data);
    }).catch(err => {
      NotifyToast({ message: 'Erro ao buscar grupos', toast_type: 'erro' });
    });
  };
  const get_turmas = async() => { // TODO - Implementar autenticação
    await axios.get(`${API_BASE_URL}/turma/${user.turma}`, {
      headers: {
        Authorization: `Bearer ${token}`}
    }).then(res => {
      setTurmaProf(res.data);
    }).catch(err => {
      NotifyToast({ message: 'Erro ao buscar turmas', toast_type: 'erro' });
    })
  };
  const create_grupo = async(e) => {
    e.preventDefault();
    await axios.post(`${GRUPO_ENDPOINT}/create`, {
      nome: nome,
      descricao: descricao,
      turma: user.turma._id,
      capacidade: capacidade
    }).then(res => {
      NotifyToast({ message: 'Grupo criado com sucesso', toast_type: 'sucesso' });
      setNome("");
      setCapacidade("");
      setDescricao("");
      get_groups();
    }).catch(err => {
      NotifyToast({ message: 'Erro ao criar grupo', toast_type: 'erro' });
    });
  };

  const handleSearch = useCallback((e) => {
    const search = e.target.value;
    if(search === '') {
      setFilteredGroups(grupos);
    } else {
      const filtered = grupos.filter(grupo => {
        return grupo.nome.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredGroups(filtered);
    }

  });

  const export_excel = async() => { // TODO - consertar exportação, membros não estao aparecendo corretamente
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('Grupos');
    worksheet.addRow(['Nome', 'Descrição', 'Turma', 'Capacidade', 'Membros']);
    grupos.forEach(grupo => {
      worksheet.addRow([grupo.nome, grupo.descricao, grupo.turma.nome, grupo.capacidade, grupo.membros.map((membro) => {
        return membro.nome + ', ';
      })]);
    });
    worksheet.columns.forEach(column => {
      column.width = 25;
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', 'grupos.xlsx');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  useEffect(() => {
    get_groups();
    get_turmas();
  }, [])
  return (
    <div>
      <NavBarMenu />
      <div className='flex justify-center pt-[65px]'>
          <div className='flex justify-center items-center md:items-stretch flex-col md:flex-row md:left-[50px] md:w-[92vw]'>
            <div className='z-[1] md:absolute md:left-0 md:ml-[62px]'>
              <SideBar user_role={'professor'}/>
            </div>
          <div className="bg-base-100 md:ml-[280px] w-[85vw] h-[85vh] shadow z-[5] rounded-xl">
            <div className="bg-[#2e3440] md:h-[45px] rounded-t-xl flex flex-col items-center justify-center">
              <h2 className='text-2xl font-medium text-base-100'>Grupos</h2>
            </div>
            <div className='flex items-center justify-between pr-12 pl-6'>
              <div>
                <label className="input m-6 md:w-full border-transparent flex items-center bg-base-300 gap-3">
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
              </div>
              <div className='flex gap-4'>
                <button onClick={() => export_excel()} className='btn btn-primary text-white'>
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 3.75V8.75C17.5 9.08152 17.6317 9.39946 17.8661 9.63388C18.1005 9.8683 18.4185 10 18.75 10H23.75" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21.25 26.25H8.75C8.08696 26.25 7.45107 25.9866 6.98223 25.5178C6.51339 25.0489 6.25 24.413 6.25 23.75V6.25C6.25 5.58696 6.51339 4.95107 6.98223 4.48223C7.45107 4.01339 8.08696 3.75 8.75 3.75H17.5L23.75 10V23.75C23.75 24.413 23.4866 25.0489 23.0178 25.5178C22.5489 25.9866 21.913 26.25 21.25 26.25Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 13.75H20V22.5H10V13.75Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 18.75H20" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.75 13.75V22.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Exportar Grupos
                </button>
                <button onClick={()=>document.getElementById('my_modal_2').showModal()} className='btn btn-primary text-white'>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 7C10 6.44772 10.4477 6 11 6C11.5523 6 12 6.44772 12 7V10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H12V15C12 15.5523 11.5523 16 11 16C10.4477 16 10 15.5523 10 15V12H7C6.44771 12 6 11.5523 6 11C6 10.4477 6.44772 10 7 10H10V7Z" fill="#E5E9F0"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM2.00683 11C2.00683 15.9668 6.03321 19.9932 11 19.9932C15.9668 19.9932 19.9932 15.9668 19.9932 11C19.9932 6.03321 15.9668 2.00683 11 2.00683C6.03321 2.00683 2.00683 6.03321 2.00683 11Z" fill="#E5E9F0"/>
                  </svg>
                  Adicionar Grupo
                </button>
              </div>
            </div>

            <ul className='flex flex-col list-none p-6 overflow-scroll h-4/5'>
              {filteredGroups.map((grupo, index) => {
                return (
                  <ProfessorGrupoCard key={index} grupo={grupo} reload_trigger={get_groups} />
                )
              })}
            </ul>
          </div>
        </div>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box flex flex-col justify-center items-center">
            <h3 className='font-bold text-lg'>Criar Grupo</h3>
            <form onSubmit={create_grupo} className='flex flex-col justify-center gap-2 w-3/4'>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Nome do Grupo:</span>
                </div>
                <input
                  onChange={e => setNome(e.target.value)}
                  type="text" 
                  className="input input-bordered" 
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Descrição:</span>
                </div>
                <input 
                  onChange={e => setDescricao(e.target.value)}
                  type="text" 
                  className="input input-bordered" 
                />
              </label>

              <label className='form-control'>
                <div className='label'>
                  <span className='label-text'>Turma:</span>
                </div>
                <input 
                  type="text" 
                  value={user.turma.nome} 
                  className='input input-bordered' 
                  readOnly={true}
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Capacidade:</span>
                </div>
                <input 
                  onChange={e => setCapacidade(e.target.value)}
                  type="number" 
                  className="input input-bordered"
                />
              </label>

              <button type='submit' className='btn btn-primary text-white' onClick={()=>document.getElementById('my_modal_2').close()} >Criar Grupo</button>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box flex flex-col justify-center items-center">
            <h3 className='font-bold text-lg'>Criar Grupo</h3>
            <form onSubmit={create_grupo} className='flex flex-col justify-center gap-2 w-3/4'>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Nome do Grupo:</span>
                </div>
                <input
                  onChange={e => setNome(e.target.value)}
                  type="text" 
                  className="input input-bordered" 
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Descrição:</span>
                </div>
                <input 
                  onChange={e => setDescricao(e.target.value)}
                  type="text" 
                  className="input input-bordered" 
                />
              </label>

              <label className='form-control'>
                <div className='label'>
                  <span className='label-text'>Turma:</span>
                </div>
                <input 
                  type="text" 
                  value={user.turma.nome} 
                  className='input input-bordered' 
                  readOnly={true}
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Capacidade:</span>
                </div>
                <input 
                  onChange={e => setCapacidade(e.target.value)}
                  type="number" 
                  className="input input-bordered"
                />
              </label>

              <button type='submit' className='btn btn-primary text-white' onClick={()=>document.getElementById('my_modal_2').close()} >Criar Grupo</button>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
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

export default ListaGruposProf;
