import React, { useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';

const NavBarMenu = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const logout_action = () => {
    logout();
    navigate('/');
  }
  return (
      <div className="navbar bg-neutral-content fixed z-[4]">
        <div className="navbar-start">
          <Link to={user.role === 'admin' ? '/admin/dashboard' : user.role === 'professor' ? '/professor/dashboard' : '/aluno/dashboard'} className="text-lg font-bold ml-2 hover:text-base-100"><div className='bg-base-200 px-4 py-2 rounded-xl hover:bg-neutral ml-12'>Home</div></Link>
        </div>
        <div className="navbar-center">
        </div>
        <div className="navbar-end">
          <div onClick={() => logout_action()} role="button" className="btn btn-ghost btn-circle">
            <svg width="24px" height="24px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#2e3440"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M15.6666 8L17.75 10.5L15.6666 8Z" stroke="#2e3440" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M15.6666 13L17.75 10.5L15.6666 13Z" stroke="#2e3440" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M16.5 10.5L10 10.5" stroke="#2e3440" strokeWidth="2" strokeLinecap="round"></path> <line x1="4" y1="3.5" x2="13" y2="3.5" stroke="#2e3440" strokeWidth="2" strokeLinecap="round"></line> <line x1="4" y1="17.5" x2="13" y2="17.5" stroke="#2e3440" strokeWidth="2" strokeLinecap="round"></line> <path d="M13 3.5V7.5" stroke="#2e3440" strokeWidth="2" strokeLinecap="round"></path> <path d="M13 13.5V17.5" stroke="#2e3440" strokeWidth="2" strokeLinecap="round"></path> <path d="M4 3.5L4 17.5" stroke="#2e3440" strokeWidth="2" strokeLinecap="round"></path> </g></svg>
          </div>
        </div>
      </div>
  )
}

export default NavBarMenu