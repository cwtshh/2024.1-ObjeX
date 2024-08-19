import React from 'react'

const NavBarMenu = () => {
  return (
      <div className="navbar bg-base-100 fixed z-[4]">
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
            <div className='ml-[50px]'>
              <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[5] mt-3 w-52 p-2 shadow">
              <li><a>Painel de Professor</a></li>
              <li><a>Painel de Monitor</a></li>
            </ul>
            </div>
            
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">ObjeX</a>
        </div>
        <div className="navbar-end">
          
          <div role="button" className="avatar">
            <div className="w-10 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>

          <div role="button" className="btn btn-ghost btn-circle">
            <svg width="24px" height="24px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#2e3440"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6666 8L17.75 10.5L15.6666 8Z" stroke="#2e3440" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6666 13L17.75 10.5L15.6666 13Z" stroke="#2e3440" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16.5 10.5L10 10.5" stroke="#2e3440" stroke-width="2" stroke-linecap="round"></path> <line x1="4" y1="3.5" x2="13" y2="3.5" stroke="#2e3440" stroke-width="2" stroke-linecap="round"></line> <line x1="4" y1="17.5" x2="13" y2="17.5" stroke="#2e3440" stroke-width="2" stroke-linecap="round"></line> <path d="M13 3.5V7.5" stroke="#2e3440" stroke-width="2" stroke-linecap="round"></path> <path d="M13 13.5V17.5" stroke="#2e3440" stroke-width="2" stroke-linecap="round"></path> <path d="M4 3.5L4 17.5" stroke="#2e3440" stroke-width="2" stroke-linecap="round"></path> </g></svg>
          </div>
        </div>


      </div>
  )
}

export default NavBarMenu