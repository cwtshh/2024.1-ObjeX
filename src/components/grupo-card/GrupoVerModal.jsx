import React from "react"
import { useAuth } from "../../context/AuthContext"

const GrupoVerModal = ({ grupo, cb }) => {
    const { user } = useAuth();

    return (
        <dialog id={grupo._id} className="modal">
          <div className="modal-box flex flex-col md:gap-y-4 gap-y-3 max-w-screen-2xl max-h-[88vh] bg-base-200">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error text-lg font-bold">✕</button>
            </form>
            <div className='flex flex-col bg-base-300 rounded-lg p-2 px-3 mt-2 w-full justify-center items-center'>
                <h2 className="text-xl font-bold opacity-80">{grupo.nome}</h2>
            </div>
            <div className='flex flex-row w-full md:gap-x-4 gap-x-2 md:justify-between'>
                <div className='flex flex-col bg-base-300 rounded-lg p-2 items-center justify-center align-middle w-1/2'>
                    <p className="font-bold text-sm md:text-xl opacity-70 text-center">{grupo.turma.nome}</p>
                </div>
                <div className='flex flex-row bg-neutral rounded-lg p-2 items-center md:gap-12 gap-2 justify-center align-middle w-1/2'>
                    <p className="truncate md:text-4xl text-2xl text-neutral-content">{grupo.membros.length}</p>
                    <p className="truncate md:text-4xl text-2xl text-neutral-content">|</p>
                    <p className="truncate md:text-4xl text-2xl text-neutral-content">{grupo.capacidade}</p>
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <p className="text-lg font-extrabold opacity-70 pb-0.5 pt-1">Descrição:</p>
                <div className='flex flex-col bg-base-300 rounded-lg p-2 px-4 w-full h-[20vh] overflow-y-auto'>
                    <p className="text-justify text-lg">{grupo.descricao}</p>
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <p className="text-lg font-extrabold opacity-70 pb-0.5 pt-1">Membros:</p>
                <ul className="list-none overflow-y-auto bg-base-300 md:p-4 p-2 rounded-lg w-full h-[25vh]">
                    {grupo.membros.length > 0 ? (grupo.membros.map((membro, index) => {
                        return (
                            <li key={index} className="bg-neutral rounded-lg md:my-1 my-0.5"><p className="text-start md:text-2xl md:pl-4 pl-4 md:py-1 py-1 text-neutral-content">{membro.nome}</p></li>
                        )
                    })) : (
                        <div className='flex justify-center items-center'><p className='md:text-2xl text-lg md:mt-2 mt-1 md:mb-4 mb-2 text-primary font-bold opacity-80'>Nenhum membro no grupo...</p></div>
                    )}
                </ul>
            </div>
            <div className='flex flex-row w-full justify-center'>
                <button onClick={()=>document.getElementById(`${grupo._id}_confirmation_in`).showModal()} disabled={!(grupo.membros.map(membro => membro._id).includes(user.id))} className="btn btn-error text-base-100 rounded-lg w-full md:text-xl md:w-1/4 md:mt-4 mt-2">Sair</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button></button>
          </form>
            <dialog id={`${grupo._id}_confirmation_in`} className="modal">
                <div className="modal-box flex flex-col gap-y-3 max-w-screen-1xl max-h-[88vh] bg-base-200">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error text-lg font-bold">✕</button>
                    </form>
                    <p className="text-justify text-xl md:text-xl">Realmente deseja sair do Grupo?</p>
                    <p className="text-justify font-bold md:text-lg mt-2">Essa ação é irreversível!</p>
                    <div className="flex flex-row gap-4">
                        <form method="dialog" className='flex flex-row w-full justify-center'>
                            <button onClick={() => {
                                cb();
                                document.getElementById(grupo._id).close();
                            }} disabled={!(grupo.membros.map(membro => membro._id).includes(user.id))} className="btn btn-error text-base-100 rounded-lg w-full md:text-xl w-3/4 mt-4">Sair</button>
                        </form>
                        <form method="dialog" className='flex flex-row w-full justify-center'>
                            <button className="btn btn-neutral text-neutral-content rounded-lg w-full md:text-xl w-3/4 mt-4">Cancelar</button>
                        </form>
                    </div>
                    
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button></button>
                </form>
            </dialog>
        </dialog>
    )
}

export default GrupoVerModal