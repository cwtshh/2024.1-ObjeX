import React from 'react'

const AtividadeVerModalAdmin = ({ atividade }) => {
    return (
        <dialog id={atividade._id} className="modal">
            <div className="modal-box flex flex-col md:gap-y-4 gap-y-3 max-w-screen-lg max-h-[88vh] bg-base-200">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error text-lg font-bold">✕</button>
                </form>
                <div className='flex flex-col bg-base-300 rounded-lg p-2 px-3 mt-2 w-full justify-center items-center'>
                    <h2 className="text-xl font-bold opacity-80">{atividade.nome}</h2>
                </div>
                
                <div className='flex flex-col w-full'>
                    <p className="text-lg font-extrabold opacity-70 pb-0.5 pt-1">Enunciado:</p>
                    <textarea style={{ resize: 'none' }} className="w-full h-36 p-2 bg-base-300 rounded-lg" value={atividade.enunciado}></textarea>
                </div>

                <div className='flex flex-col w-full'>
                    <p className="text-lg font-extrabold opacity-70 pb-0.5 pt-1">Data de abertura:</p>
                    <p className="text-lg font-extrabold">{Date(atividade.data_abertura)}</p>
                    <p className="text-lg font-extrabold opacity-70 pb-0.5 pt-1">Data de encerramento:</p>
                    <p className="text-lg font-extrabold">{Date(atividade.data_encerramento)}</p>
                </div>

                <button className='btn btn-primary text-white'>Editar</button>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog>
    )
}

export default AtividadeVerModalAdmin