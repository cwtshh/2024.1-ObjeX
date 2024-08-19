import React from 'react'
import { useAuth } from '../../../context/AuthContext'

const NavBarMenu = () => {
  const { logout } = useAuth();
  return (
      <div className="navbar bg-base-100 fixed z-[4]">
        <div className="navbar-start">
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

          <div onClick={() => logout()} role="button" className="btn btn-ghost btn-circle">
            <svg width="24px" height="24px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#2e3440"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6666 8L17.75 10.5L15.6666 8Z" stroke="#2e3440" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6666 13L17.75 10.5L15.6666 13Z" stroke="#2e3440" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16.5 10.5L10 10.5" stroke="#2e3440" stroke-width="2" stroke-linecap="round"></path> <line x1="4" y1="3.5" x2="13" y2="3.5" stroke="#2e3440" stroke-width="2" stroke-linecap="round"></line> <line x1="4" y1="17.5" x2="13" y2="17.5" stroke="#2e3440" stroke-width="2" stroke-linecap="round"></line> <path d="M13 3.5V7.5" stroke="#2e3440" stroke-width="2" stroke-linecap="round"></path> <path d="M13 13.5V17.5" stroke="#2e3440" stroke-width="2" stroke-linecap="round"></path> <path d="M4 3.5L4 17.5" stroke="#2e3440" stroke-width="2" stroke-linecap="round"></path> </g></svg>
          </div>
        </div>
      </div>
  )
}

export default NavBarMenu