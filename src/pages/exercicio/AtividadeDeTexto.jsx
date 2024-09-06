import { useState, useEffect } from 'react';
import NavBar from '../../components/navbar/navbar-login/NavBarLoginAdmin';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../util/constants';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, Icons, toast } from 'react-toastify';

const AtividadeDeTexto = () => {

  const [ code, setCode ] = useState('');
  const [ atividade, setAtividade] = useState({})
  const { id } = useParams();
  const { user } = useAuth();

  const notify = (status, message) => {
    if(status === 'error') {
      toast.warning(`${message}`, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'bg-base-100 md:w-[15vw] w-[75vw]',
        bodyClassName: 'font-bold text-warning-content opacity-60',
        closeButton: false,
        progressClassName: 'bg-warning',
        icon: Icons.info,
      });
    }
    if(status === 'success') {
        toast.success(`${message}`, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-base-100 md:w-[15vw] w-[75vw]',
          bodyClassName: 'font-bold text-warning-content opacity-60',
          closeButton: false,
          progressClassName: 'bg-success',
          icon: Icons.success,
        });
      }
    }

  const handleKeyDown = (e) => {
    if(e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      setCode(`${code.substring(0, start)}\t${code.substring(end)}`);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 1;
      }, 0);
    }
  }

  const get_atividade = async() => {
    await axios.get(`${API_BASE_URL}/atividade/get/atividade/${id}`).then((res) => {
      setAtividade(res.data[0]);
    }).catch(err => {
      console.log(err)
    })
  }

  const responder_atividade = async() => {
    console.log(code)
    await axios.post(`${API_BASE_URL}/atividade/responder/texto`, {
      id_atividade: atividade._id,
      resposta: code,
      id_usuario: user.id
    }).then(res => {
      notify('success', 'Resposta enviada com sucesso!');
    }).catch(err => {
      notify('error', 'Erro ao enviar a resposta!');
    })
  }

  useEffect(() => {
    get_atividade()
  }, [])

  return (
    <div>
      <NavBar/>
        <div className='flex justify-center'>
          <div className='w-full p-4 flex flex-col lg:flex-row gap-4 justify-center'>
            <div className='bg-base-100 h-[720px] lg:w-[650px] w-full rounded-xl shadow'>
              <div className="bg-[#2e3440] h-[25px] rounded-t-xl"></div>
              <div className="bg-[#d8dee9] h-[75px] text-4xl flex items-center justify-center">
                <h1>{atividade.nome}</h1>
              </div>
              <div className='flex justify-center'>
                <div className='overflow-y-scroll w-full pt-[20px] pl-[20px] h-[600px]'>
                  <p className="h-[500px]">{atividade.enunciado}</p>

                </div>
              </div>
            </div>

            <div className='h-[720px] lg:w-[650px] w-full rounded-xl flex flex-col gap-4'>
            <div className='bg-base-100 h-[740px] w-full rounded-xl shadow relative flex'>
              <div className='bg-[#2e3440] w-[25px] h-full rounded-l-xl'>
              </div>
              
                  <textarea
                    className='w-full h-full p-4 rounded-r-xl border-t-0 border-b-0 border-r border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-[#5e81ac]'
                    placeholder='Digite a sua resposta aqui...'
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows='10'
                    cols='50'
                  >
                  </textarea>

              <div className='absolute bottom-0 right-0 m-4'>
                <button onClick={() => responder_atividade()} className='w-[90px] h-[24px] bg-[#5e81ac] text-base-100 rounded-xl'>Enviar</button>
              </div>
            </div>
          </div>
          </div>
        </div>
        <ToastContainer />
    </div>
  );
}

export default AtividadeDeTexto;
