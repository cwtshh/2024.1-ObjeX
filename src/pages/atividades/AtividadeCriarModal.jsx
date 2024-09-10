import React, { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../util/constants'
import { useAuth } from '../../context/AuthContext'

const AtividadeCriarModal = ({ get_atividades }) => {
  const [nome, setNome] = useState('');
  const [enunciado, setEnunciado] = useState('');
  const [tipoAtividade, setTipoAtividade] = useState('');
  const [dataAbertura, setDataAbertura] = useState('');
  const [dataEncerramento, setDataEncerramento] = useState('');
  const [file, setFile] = useState('');
  const { user } = useAuth();

  const format_datetime = (datetime) => {
    const date = new Date(datetime);
    return date;
  }

  const handleCreateAtividade = async(e) => {
    e.preventDefault();
    if(tipoAtividade === 'code') {
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('enunciado', enunciado);
        formData.append('turma', user.turma._id);
        formData.append('type', 'code');
        formData.append('data_abertura', format_datetime(dataAbertura));
        formData.append('data_encerramento', format_datetime(dataEncerramento));
        formData.append('file', file);
        formData.append('professor', user.id);
        await axios.post(`${API_BASE_URL}/atividade/create/code`, formData, {
        }).then(res => {
          get_atividades();
          setNome('');
          setEnunciado('');
          setTurma('');
          setTipoAtividade('');
          setDataAbertura('');
          setDataEncerramento('');
          setFile(null);
          
        }).catch(err => {
            
        });
    }

    if(tipoAtividade === 'text') {
        await axios.post(`${API_BASE_URL}/atividade/create/text`, {
            nome: nome,
            enunciado: enunciado,
            turma: user.turma._id,
            type: 'text',
            data_abertura: format_datetime(dataAbertura),
            data_encerramento: format_datetime(dataEncerramento),
            professor: user.id
        }).then(res => {
          get_atividades();
          setNome('');
          setEnunciado('');
          setTurma('');
          setTipoAtividade('');
          setDataAbertura('');
          setDataEncerramento('');
          setFile(null);
          
        }).catch(err => {
            
        });
    }

    if(tipoAtividade === 'image') {
        await axios.post(`${API_BASE_URL}/atividade/create/image`, {
            nome: nome,
            enunciado: enunciado,
            turma: user.turma._id,
            type: 'image',
            data_abertura: format_datetime(dataAbertura),
            data_encerramento: format_datetime(dataEncerramento),
            professor: user.id
        }).then(res => {
          get_atividades();
          setNome('');
          setEnunciado('');
          setTurma('');
          setTipoAtividade('');
          setDataAbertura('');
          setDataEncerramento('');
          setFile(null);
          
        }).catch(err => {
            
        });
    }
    document.getElementById('criar_atividade').close();
  }

  return (
    <dialog id="criar_atividade" className="modal">
      <div className="modal-box flex flex-col justify-center items-center">
        <h3 className='font-bold text-lg'>Atividades</h3>
        <form onSubmit={handleCreateAtividade} method='dialog' className='flex flex-col justify-center gap-2 w-3/4'>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Nome:</span>
              </div>
              <input
                defaultValue=""
                type="text" 
                className="input input-bordered"
                onChange={e => setNome(e.target.value)}
                required={true}
                minLength={3}
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Enunciado:</span>
              </div>
              <textarea 
                defaultValue=""
                type="text" 
                className='textarea textarea-bordered h-48' 
                style={{ resize : 'none'}}
                onChange={e => setEnunciado(e.target.value)}
                required={true}
                minLength={3}
              />
            </label>

            <label className='form-control'>
              <div className='label'>
                <span className='label-text'>Turma:</span>
              </div>
              <input
                type="text" 
                className="input input-bordered"
                value={user.turma.nome}
                readOnly={true}
                required={true}
              />
            </label>

            <label className='form-control'>
              <div className='label'>
                <span className='label-text'>Tipo:</span>
              </div>
              <select 
                defaultValue="" 
                className='select select-bordered'
                onChange={(e) => setTipoAtividade(e.target.value)}
                required={true}
              >
                <option value="" disabled>Selecione o tipo da atividade</option>
                <option value="text">Texto</option>
                <option value="image">Imagem</option>
                <option value="code">Código</option>
              </select>
            </label>

            {tipoAtividade === 'code' ? (
              <label className='form-control'>
                  <div className='label'>
                    <span className='label-text'>Arquivo de Teste:</span>
                  </div>
                  <input 
                    type='file' 
                    className='file-input file-input-bordered w-full max-w-xs' 
                    onChange={(e) => setFile(e.target.files[0])}
                    required={true}
                    accept='.py'
                  />
                  <span className='text-sm opacity-60 mt-0.5'>arquivos aceitos: .py</span>
              </label>
            ) : (<></>)}

            <label className='form-control'>
              <div className='label'>
                <span className='label-text'>Data de Abertura:</span>
              </div>
              <input 
                type='datetime-local' 
                className='input input-bordered' 
                onChange={e => setDataAbertura(e.target.value)}
                required={true}
              />
            </label>

            <label className='form-control'>
              <div className='label'>
                <span className='label-text'>Data de Encerramento:</span>
              </div>
              <input 
                type='datetime-local' 
                className='input input-bordered' 
                onChange={e => setDataEncerramento(e.target.value)}
                required={true}
              />
            </label>

            <button type='submit' className='btn btn-primary text-white'>Criar Atividade</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
          <button>close</button>
      </form>
    </dialog>
  )
}

export default AtividadeCriarModal