import React from 'react'
import { Link } from 'react-router-dom'

const NavBarLoginAdmin = () => {
  return (
    <div className="navbar bg-neutral-content rounded-xl w-[98vw] m-[10px]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><Link className='font-bold opacity-85 text-lg' to='/login/aluno'>Login Aluno</Link></li>
              <li><Link className='font-bold opacity-85 text-lg' to='/login/professor'>Login Professor</Link></li>
              <li><Link className='font-bold opacity-85 text-lg' to='/login/admin'>Login Admin</Link></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <p className='text-2xl font-extrabold text-neutral md:ml-7 mr-5'>ObjeX</p>
      </div>
      <div className="navbar-end">
      </div>
    </div>
  )
}

export default NavBarLoginAdmin