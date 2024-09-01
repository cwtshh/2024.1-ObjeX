import React from 'react'
import { formatDateTime } from '../../util/date-util/ConverterData'

const AtividadeCard = ({ atividade }) => {
    console.log(atividade)
    return (
        <li className="list-none p-4 m-2 bg-base-300 rounded-lg">
            <div className="flex md:flex-row flex-col md:justify-between justify-between md:items-center items-middle">
                <div className='flex flex-col md:w-[13vw] pb-4'>
                    <h2 className="text-xl font-bold truncate">{atividade.nome}</h2>
                    <p className="opacity-70">{atividade.type === 'text' ? "Texto" : atividade.type === 'image' ? "Imagem" : "Código"}</p>
                    <p>{atividade.professor.nome}</p>
                </div>
                <div className='flex flex-col md:w-[30vw] pb-4'>
                    <p className="truncate">{atividade.enunciado}</p>
                    <p>{atividade.turma.nome}</p>
                    {/* <p className="truncate opacity-70">{atividade}</p> */}
                </div>
                <div className='flex flex-col md:w-[10vw] pb-4'>
                    <div className='flex flex-row gap-2 mb-1'>
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className='text-success w-6 h-6'
                        >
                            <path d="M18 10H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3h2c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-7.939 5.499A2.002 2.002 0 0114 16a1.99 1.99 0 01-1 1.723V20h-2v-2.277a1.992 1.992 0 01-.939-2.224z" />
                        </svg>
                        <p>{formatDateTime(atividade.data_abertura)}</p>
                        {/* <p className="truncate">{formatDateTime(atividade.data_abertura)}</p> */}
                    </div>
                    <div className='flex flex-row gap-2 mt-1'>
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className='text-error w-6 h-6'
                        >
                        <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 01.567-3.677A2.001 2.001 0 0114 16a1.99 1.99 0 01-1 1.723z" />
                        </svg>
                        <p>{formatDateTime(atividade.data_encerramento)}</p>
                    </div>
                </div>
                <div className='flex flex-row md:w-[10vw] justify-between'>
                    <div className='btn btn-neutral text-base-100 rounded-lg'>Editar</div>
                    <div className='btn btn-error text-base-100 rounded-lg'>Excluir</div>
                </div>
            </div>
        </li>
    )
}

export default AtividadeCard