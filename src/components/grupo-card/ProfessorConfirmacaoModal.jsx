import React from "react";

const ProfessorConfirmacaoModal = ({ grupo, cb, msg }) => {
    return (
        <dialog id={`${grupo._id}_confirmation`} className="modal">
            <div className="modal-box flex flex-col gap-y-3 max-w-screen-1xl max-h-[88vh] bg-base-200">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error text-lg font-bold">✕</button>
                </form>
                <p className="text-justify text-xl md:text-xl">{msg}</p>
                <p className="text-justify font-bold md:text-lg mt-2">Essa ação é irreversível!</p>
                <div className="flex flex-row gap-4">
                    <form method="dialog" className='flex flex-row w-full justify-center'>
                        <button onClick={cb} className="btn btn-error text-base-100 rounded-lg w-full md:text-xl w-3/4 mt-4">Excluir</button>
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
    )
}

export default ProfessorConfirmacaoModal