import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../util/constants';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, Icons, toast } from 'react-toastify';
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu';
import Loading from '../../components/loading/Loading';

const AtividadeDeImagem = () => {

    const [ atividade, setAtividade] = useState({})
    const [ file, setFile ] = useState();
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

    const get_atividade = async() => {
        await axios.get(`${API_BASE_URL}/atividade/get/atividade/${id}`).then((res) => {
          setAtividade(res.data[0]);
        }).catch(err => {
          console.log(err)
        })
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const responder_atividade = async() => {
        let form_data = new FormData();
        form_data.append('file', file)
        if(file == undefined) {
            notify('error', 'Selecione um arquivo para enviar');
            return;
        }
        await axios.postForm(`${API_BASE_URL}/atividade/responder/imagem?atividade_id=${atividade._id}&aluno_id=${user.id}`, form_data).then(res => {
            notify('success', 'Atividade enviada com sucesso!');
        }).catch(err => {
            notify('error', 'Erro ao enviar atividade!');
        })
    }

    const formatarTexto = (texto) => {
        return texto.split('\n').map((linha, index) => {
          if(linha === '') {
            return (<br key={index}/>)
          } 
          else if(linha === '\r') {
            return (<br key={index}/>)
          }
            return (
                <p key={index}>
                    {linha}
                </p>
            )
        });
    };

    useEffect(() => {
        get_atividade()
    }, [])

    return (
        <div>

            <NavBarMenu />

            <div className='flex justify-center'>
                <div className='w-full p-4 flex flex-col lg:flex-row gap-4 justify-center pt-20'>
                    <div className='bg-base-100 h-[65vh] lg:w-[650px] w-full rounded-xl shadow'>
                        <div className="bg-[#2e3440] h-[25px] rounded-t-xl"></div>
                        <div className="bg-[#d8dee9] h-[75px] text-4xl flex items-center justify-center">
                            <h1>{atividade.nome}</h1>
                        </div>
                        <div className='flex justify-center'>
                            <div className='overflow-y-scroll w-full pl-[20px] h-[54vh]'>
                                <span className="h-[55vh] pt-4 px-2">{atividade.enunciado == undefined ? <Loading /> : formatarTexto(atividade.enunciado)}</span>
                            </div>
                        </div>

                        <div className='flex justify-center h-[10vh] mt-10'>
                            <input type="file" onChange={handleFileChange} required={true} accept='.png, .jpg, .jpeg, .webp' className="file-input w-full max-w-xs" />

                            <button onClick={() => responder_atividade()} className='w-[110px] h-[50px] bg-primary text-base-100 rounded-xl ml-20 '>Enviar</button>

                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AtividadeDeImagem
