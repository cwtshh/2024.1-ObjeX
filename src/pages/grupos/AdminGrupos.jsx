import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBarLoginAdmin from '../../components/navbar/navbar-login/NavBarLoginAdmin';
import { API_BASE_URL } from "../../util/constants";
import './grupos.css';


const AdminGrupos = () => {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    // Fazendo a requisição para a API para buscar os grupos
    axios.get(`${API_BASE_URL}/grupo`)
      .then(response => {
        setGrupos(response.data);
      })
      .catch(error => {
        console.error("Ocorreu um erro ao buscar os grupos:", error);
      });
  }, []);

  return (
    <div className="admin-grupos-container">
      <NavBarLoginAdmin />
      <div className="grupo-cards">
        {grupos.map((grupo) => (
          <div key={grupo.id} className="card">
            <div className="card-header">
              <h3>{grupo.nome}</h3>
              <p>{grupo.descricao}</p>
            </div>
            <div className="card-actions">
              <button className="delete-button" onClick={() => handleDelete(grupo.id)}>
                <svg height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0V0z" fill="none"/><path d="M12 38c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V14H12v24zm4.93-14.24l2.83-2.83L24 25.17l4.24-4.24 2.83 2.83L26.83 28l4.24 4.24-2.83 2.83L24 30.83l-4.24 4.24-2.83-2.83L21.17 28l-4.24-4.24zM31 8l-2-2H19l-2 2h-7v4h28V8z"/></svg>
              </button>
              <button className="edit-button" onClick={() => handleEdit(grupo.id)}>
                <svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className="enter-button">Entrar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const handleDelete = () => {
    return
}

const handleEdit = () => {
    return
}

export default AdminGrupos;