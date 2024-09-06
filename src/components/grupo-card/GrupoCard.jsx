import React from 'react'

const GrupoCard = ({ grupo }) => {
  return (
    <div>
        {/* <!-- Card --> */}
        <ul className="list-none bg-base-100 pl-4 pr-4">
                        {/* {atividades.map(atv => ( */}
                        <li key={'teste'} className="p-4 m-2 bg-base-300 rounded-lg">
                            <div className="flex md:flex-row flex-col md:justify-between justify-between md:items-center items-middle">
                                <div className='flex flex-col md:w-[19vw] pb-4'>
                                    <h2 className="text-xl font-bold truncate">{grupo.nome}</h2>
                                    <p className="opacity-70">{grupo.turma.nome}</p>
                                </div>
                                <div className='flex flex-col md:w-[30vw] pb-4 overflow-x-scroll'>
                                    <p className="truncate">{grupo.descricao}</p>
                                </div>
                                
                                <div className='flex gap-4 flex-row  justify-between'>
                                    {/* <details className="dropdown">
                                        <summary className="btn btn-ghost m-1">
                                            <svg
                                                viewBox="0 0 1024 1024"
                                                fill="currentColor"
                                                className='text-primary w-10 h-10 mt-1'
                                                >
                                                <path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
                                            </svg>
                                        </summary>
                                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                            {grupo.membros.length === 0 ? <li>Nenhum membro</li> : grupo.membros.map((membro, index) => (
                                                <li key={index}>{membro.nome}</li>
                                            ))}
                                            
                                        </ul>
                                    </details> */}
                                    <div className="dropdown">
                                        <div tabIndex={0} role="button" className="btn btn-ghost">
                                            <svg
                                                viewBox="0 0 1024 1024"
                                                fill="currentColor"
                                                className='text-primary w-10 h-10 mt-1'
                                                >
                                                <path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
                                            </svg>
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                            {grupo.membros.length === 0 ? <li>Nenhum membro</li> : grupo.membros.map((membro, index) => (
                                                <li key={index}>{membro.nome}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button className='btn btn-primary text-base-100 rounded-lg'>Editar</button>
                                    <button className='btn btn-error text-base-100 rounded-lg'>Excluir</button>
                                </div>
                            </div>
                        </li>
                        {/* ))} */}
                    </ul>
    </div>
  )
}

export default GrupoCard