import React from "react"
import { formatDateTime } from "../../util/date-util/ConverterData"
import Loading from "../loading/Loading"

const AtividadeVerModal = ({ atividade }) => {
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

    return (
        <dialog id={atividade._id} className="modal">
          <div className="modal-box flex flex-col md:gap-y-4 gap-y-3 max-w-screen-2xl max-h-[88vh] bg-base-200">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error text-lg font-bold">✕</button>
            </form>
            <div className='flex flex-col bg-base-300 rounded-lg p-2 px-3 mt-2 w-full justify-center items-center'>
                <h2 className="text-xl font-bold">{atividade.nome}</h2>
            </div>
            <div className='flex flex-row w-full md:gap-x-4 gap-x-2 md:justify-between'>
                <div className='flex flex-col bg-base-300 rounded-lg p-2 items-center justify-center align-middle md:w-1/3 w-3/5'>
                    <div className='flex flex-row md:gap-2 gap-1 mb-1'>
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className='text-success md:w-6 md:h-6 w-5 h-5'
                            >
                            <path d="M18 10H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3h2c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-7.939 5.499A2.002 2.002 0 0114 16a1.99 1.99 0 01-1 1.723V20h-2v-2.277a1.992 1.992 0 01-.939-2.224z" />
                        </svg>
                        <p className="font-bold text-sm md:text-lg opacity-80 mt-px">{formatDateTime(atividade.data_abertura)}</p>
                    </div>
                    <div className='flex flex-row md:gap-2 gap-1 mt-1'>
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className='text-error md:w-6 md:h-6 w-5 h-5'
                            >
                            <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 01.567-3.677A2.001 2.001 0 0114 16a1.99 1.99 0 01-1 1.723z" />
                        </svg>
                        <p className="font-bold text-sm md:text-lg opacity-80 mt-px">{formatDateTime(atividade.data_encerramento)}</p>
                    </div>
                </div>
                <div className='flex flex-col bg-base-300 rounded-lg p-2 items-center justify-center align-middle md:w-1/3 w-1/5'>
                    <p className="text-neutral text-sm md:text-xl font-bold text-center">{atividade.type === 'text' ? "Texto" : atividade.type === 'image' ? "Imagem" : "Código"}</p>
                </div>
                <div className='flex flex-col bg-base-300 rounded-lg p-2 items-center justify-center align-middle md:w-1/3 w-1/5'>
                    <p className="font-bold text-sm md:text-xl opacity-70 text-center">{atividade.turma.nome}</p>
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <p className="text-lg font-extrabold opacity-70 pb-0.5 pt-1">Enunciado:</p>
                <div className='flex flex-col bg-base-300 rounded-lg p-2 px-4 w-full h-[30vh] overflow-y-auto'>
                    <span className="text-justify md:text-lg">{atividade.enunciado == undefined ? <Loading /> : formatarTexto(atividade.enunciado)}</span>
                </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button></button>
          </form>
        </dialog>
    )
}

export default AtividadeVerModal