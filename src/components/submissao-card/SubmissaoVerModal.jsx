import React, { useEffect } from "react"
import { formatDateTime } from '../../util/date-util/ConverterData';
import Loading from "../loading/Loading";
import { ATIVIDADE_ENDPOINT } from "../../util/constants";
import axios from "axios";

const SubmissaoVerModal = ({ resposta, atividade }) => {
    const [ imageUrl, setImageUrl ] = React.useState('');
    const [ isLoading, setIsLoading ] = React.useState(false);

    const formatarTexto = (texto) => {
        return texto.split('\n').map((linha, index) => {
            if(linha === '') {
                return (<br key={index} />)
            }
            return (
                <p key={index}>
                    {linha.replace(/\t/g, '    ')}
                </p>
            )
        });
    };    

    const getImagem = async () => {
        setIsLoading(true);
        const imagem = await axios.get(`${ATIVIDADE_ENDPOINT}/imagem?atividade_id=${resposta.atividade_id}&aluno_id=${resposta.aluno_id._id}`, {
            responseType: 'blob',
        }).catch((error) => {
            setErro(error.response.data.message);
        }).finally(() => {
            setIsLoading(false);
        });

        const url = URL.createObjectURL(imagem.data);
        setImageUrl(url);
    }

    useEffect(() => {
        if(atividade.type === 'image') {
            getImagem();
        }
    }, []);

    return (
        <dialog id={resposta._id} className="modal">
          <div className="modal-box flex flex-col md:gap-y-4 gap-y-3 max-w-screen-2xl md:max-h-[95vh] max-h-[88vh] bg-base-200">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error text-lg font-bold">✕</button>
            </form>
            <div className='flex flex-col bg-base-300 rounded-lg p-2 px-3 mt-2 w-full justify-center items-center'>
                <h2 className="text-xl font-bold opacity-80">{resposta.aluno_id.nome}</h2>
            </div>
            <div className='flex flex-row w-full md:gap-x-4 gap-x-2 md:justify-between'>
                <div className='flex flex-col bg-base-300 rounded-lg p-2 items-center justify-center align-middle w-1/2'>
                    <p className="font-bold text-sm md:text-xl opacity-70 text-center">{atividade.turma === undefined ? '' : atividade.turma.nome}</p>
                </div>
                <div className='flex flex-row bg-neutral rounded-lg p-2 items-center md:gap-12 gap-2 justify-center align-middle w-1/2'>
                    <p className="truncate md:text-3xl text-sm text-neutral-content font-bold">{formatDateTime(resposta.updatedAt)}</p>
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <p className="text-lg font-extrabold opacity-70 pb-0.5 pt-1">{atividade.type === 'text' ? 'Resposta:' : atividade.type === 'image' ? 'Imagem:' : atividade.type === 'code' ? 'Código:' : (
                    <p className='text-center text-error font-extrabold text-1xl'>Erro!</p>
                )}</p>
                <div className='flex flex-col bg-base-300 rounded-lg p-2 px-2 w-full h-fit md:max-h-[70vh] max-h-[50vh] overflow-y-auto'>
                    <div className="text-justify text-lg ">{atividade.type === 'text' ? formatarTexto(resposta.resposta) : atividade.type === 'image' ? (
                        isLoading ? (
                            <div className="flex justify-center"><Loading /></div>
                        ) : (
                            <img src={imageUrl} alt="Imagem da resposta" className="rounded-2xl w-full h-fit"/>
                        )
                    ) : atividade.type === 'code' ? (
                        <pre className="text-justify text-lg">{formatarTexto(resposta.code)}</pre>
                    ) : (
                        <p className='text-center text-error font-extrabold text-1xl'>Erro!</p>
                    )}</div>
                </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button></button>
          </form>
        </dialog>
    )
}

export default SubmissaoVerModal