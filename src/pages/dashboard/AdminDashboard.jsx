import React from 'react'
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <button onClick={() => logout()} className='btn btn-primary'>Logout</button>
    </div>
  )
}

export default AdminDashboard;