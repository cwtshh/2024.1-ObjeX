import React from 'react'

const NavBarLoginAdmin = () => {
  return (
    <div className="navbar bg-base-100 rounded-xl w-[98vw] m-[10px]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            <li><a>Painel de Professor</a></li>
            <li><a>Painel de Monitor</a></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">ObjeX</a>
      </div>
      <div className="navbar-end">
      </div>
    </div>
  )
}

export default NavBarLoginAdmin