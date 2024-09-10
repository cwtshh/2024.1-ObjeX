import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';

// rota protegida
const ProtectedRoute = ({ element: Element, roles, ...rest }) => {
    // resgata o usuario
    const { user } = useAuth();
    return (
        // se houver usuario e a role do mesmo estiver nos permitidos, renderiza o componente
        // senão, redireciona para a página de login
        user && roles.includes(user.role) ? <Element {...rest} /> : <Navigate to='/login/aluno' />
    )
}

export default ProtectedRoute