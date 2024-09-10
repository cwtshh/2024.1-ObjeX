import React from "react";
import axios from "axios";
import { API_BASE_URL } from "../../util/constants";
import { ToastifyNotificate } from "../toast/Toastify";
import { useAuth } from "../../context/AuthContext";

const ProfessorGrupoEditarModal = ({ grupo, reload_trigger }) => {
    const [nome , setNome] = React.useState('');
    const [capacidade, setCapacidade] = React.useState('');
    const [descricao, setDescricao] = React.useState('');

    const { token } = useAuth();

    const update_grupo = async (e) => {
        e.preventDefault();
    
        try {
            await axios.put(`${API_BASE_URL}/grupo/${grupo._id}`, 
                {
                    nome: nome,
                    descricao: descricao,
                    capacidade: capacidade
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            document.getElementById(`${grupo._id}_editar`).close()
            reload_trigger();
            ToastifyNotificate({ message: 'Grupo atualizado com sucesso!', type: 'success' });
        } catch (error) {
            document.getElementById(`${grupo._id}_editar`).close()
            console.log(error)
            ToastifyNotificate({ message: error.response.data.message, type: 'error' });
        }
    };
    
    return (
        <dialog id={`${grupo._id}_editar`} className="modal">
            <div className="modal-box flex flex-col gap-y-3 max-w-screen-1xl max-h-[88vh] bg-base-200">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error text-lg font-bold">✕</button>
                </form>
                <form className="flex flex-col justify-center gap-4">
                    <h3 className='font-bold text-lg flex justify-center'>Editar Grupo</h3>
                    <label className="form-control">
                        <div className="label">
                        <span className="label-text">Nome do Grupo:</span>
                        </div>
                        <input
                        onChange={e => setNome(e.target.value)}
                        placeholder={grupo.nome}
                        type="text" 
                        className="input input-bordered" 
                        required={true}
                        minLength={3}
                        />
                    </label>

                    <label className="form-control">
                        <div className="label">
                        <span className="label-text">Descrição:</span>
                        </div>
                        <input
                        onChange={e => setDescricao(e.target.value)}
                        placeholder={grupo.descricao}
                        type="text" 
                        className="input input-bordered" 
                        required={true}
                        minLength={3}
                        />
                    </label>

                    <label className="form-control">
                        <div className="label">
                        <span className="label-text">Capacidade:</span>
                        </div>
                        <input 
                        onChange={e => setCapacidade(e.target.value)}
                        placeholder={grupo.capacidade}
                        type="number" 
                        className="input input-bordered"
                        required={true}
                        />
                    </label>
                    <div className="flex flex-row gap-4">
                        <div className='flex flex-row w-full justify-center'>
                            <button onClick={update_grupo} className="btn btn-error text-base-100 rounded-lg w-full md:text-xl w-3/4 mt-4">Editar</button>
                        </div>
                        <div className='flex flex-row w-full justify-center'>
                            <button className="btn btn-neutral text-neutral-content rounded-lg w-full md:text-xl w-3/4 mt-4">Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog>
    )
}

export default ProfessorGrupoEditarModal