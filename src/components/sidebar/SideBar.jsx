import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useLocation } from 'react-router-dom';

const SideBar = ({page}) => {
    const { user } = useAuth();
    const role = user.role;
    let result = role.charAt(0).toUpperCase() + role.slice(1);

    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path ? 'w-[15vw] md:w-auto md:pl-[30px] py-[10px] rounded-xl md:m-[10px] m-[5px] md:text-xl flex md:flex-row flex-col items-center text-base-100 bg-[#88c0d0]' : 'w-[15vw] md:w-auto md:pl-[30px] py-[10px] rounded-xl md:m-[10px] m-[5px] md:text-xl flex md:flex-row flex-col items-center text-[#2e3440] bg-base-100 hover:bg-[#d8dee9]';
    }
    const isActiveButton = (path) => {
        return location.pathname === path ? '#fff' : '#88c0d0';
    }

    return (
        <div className="bg-base-100 md:w-[250px] w-[85vw] md:h-[85vh] shadow z-[1] rounded-xl">
            <div className="bg-[#2e3440] md:h-[250px] rounded-t-xl flex flex-col items-center pt-[10px]">
                <div className='avatar'>
                    <div className='rounded-full w-[150px] h-[150px]'>
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                    
                <div className=''>
                    <p className='text-base-100 text-xl text-center md:pt-[10px]'>{user.nome}</p>
                    <p className='text-[#88c0d0] text-center md:pt-[10px] pb-[5px]'>{result}</p>
                </div>
            </div>
                <div className='md:h-[250px] md:block flex items-center justify-center'>
                    <ul className='md:pt-[10px] flex md:flex-col flex-row'>
                    <Link to={`${page}/dashboard`}>
                        <li className={`${isActive(`${page}/dashboard`)}`}>
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill={`${isActiveButton(`${page}/dashboard`)}`} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M16.25 3.75V5.43953L18.25 7.03953V3.75H16.25ZM19.75 8.23953V3.5C19.75 2.80964 19.1904 2.25 18.5 2.25H16C15.3097 2.25 14.75 2.80964 14.75 3.5V4.23953L14.3426 3.91362C12.9731 2.81796 11.027 2.81796 9.65742 3.91362L1.53151 10.4143C1.20806 10.6731 1.15562 11.1451 1.41438 11.4685C1.67313 11.792 2.1451 11.8444 2.46855 11.5857L3.25003 10.9605V21.25H2.00003C1.58581 21.25 1.25003 21.5858 1.25003 22C1.25003 22.4142 1.58581 22.75 2.00003 22.75H22C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25H20.75V10.9605L21.5315 11.5857C21.855 11.8444 22.3269 11.792 22.5857 11.4685C22.8444 11.1451 22.792 10.6731 22.4685 10.4143L19.75 8.23953ZM19.25 9.76047L13.4056 5.08492C12.5838 4.42753 11.4162 4.42753 10.5945 5.08492L4.75003 9.76047V21.25H8.25003L8.25003 16.9506C8.24999 16.2858 8.24996 15.7129 8.31163 15.2542C8.37773 14.7625 8.52679 14.2913 8.90904 13.909C9.29128 13.5268 9.76255 13.3777 10.2542 13.3116C10.7129 13.2499 11.2858 13.25 11.9507 13.25H12.0494C12.7143 13.25 13.2871 13.2499 13.7459 13.3116C14.2375 13.3777 14.7088 13.5268 15.091 13.909C15.4733 14.2913 15.6223 14.7625 15.6884 15.2542C15.7501 15.7129 15.7501 16.2858 15.75 16.9506L15.75 21.25H19.25V9.76047ZM14.25 21.25V17C14.25 16.2717 14.2484 15.8009 14.2018 15.454C14.1581 15.1287 14.0875 15.0268 14.0304 14.9697C13.9733 14.9126 13.8713 14.842 13.546 14.7982C13.1991 14.7516 12.7283 14.75 12 14.75C11.2717 14.75 10.8009 14.7516 10.4541 14.7982C10.1288 14.842 10.0268 14.9126 9.9697 14.9697C9.9126 15.0268 9.84199 15.1287 9.79826 15.454C9.75162 15.8009 9.75003 16.2717 9.75003 17V21.25H14.25ZM12 8.25C11.3097 8.25 10.75 8.80964 10.75 9.5C10.75 10.1904 11.3097 10.75 12 10.75C12.6904 10.75 13.25 10.1904 13.25 9.5C13.25 8.80964 12.6904 8.25 12 8.25ZM9.25003 9.5C9.25003 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5C14.75 11.0188 13.5188 12.25 12 12.25C10.4812 12.25 9.25003 11.0188 9.25003 9.5Z" fill="#eceff4"></path> </g></svg>
                        <p className='md:pl-[20px]'>Home</p>
                        </li>
                    </Link>
                    
                    <Link href="">
                        <li className='w-[15vw] md:w-auto md:pl-[30px] py-[10px] rounded-xl md:m-[10px] m-[5px] md:text-xl flex md:flex-row flex-col items-center text-[#2e3440] bg-base-100 bg-[#88c0d0] hover:bg-[#d8dee9]'>
                        <svg fill="#88c0d0" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" stroke="#88c0d0"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M502.724,381.172h-2.783V78.796c0-5.123-4.153-9.276-9.276-9.276H21.334c-5.123,0-9.276,4.153-9.276,9.276v302.375H9.276 c-5.123,0-9.276,4.153-9.276,9.276v42.758c0,5.123,4.153,9.276,9.276,9.276h493.448c5.123,0,9.276-4.153,9.276-9.276v-42.758 C512,385.325,507.847,381.172,502.724,381.172z M30.61,88.071h450.78v293.099H166.03v-12.371h293.712 c5.123,0,9.276-4.153,9.276-9.276V109.721c0-5.123-4.153-9.276-9.276-9.276H52.25c-5.123,0-9.276,4.153-9.276,9.276v249.804 c0,5.123,4.153,9.276,9.276,9.276h21.025v12.371H30.61V88.071z M82.551,335.943c-5.123,0-9.276,4.153-9.276,9.276v5.029H61.526 V118.997h388.941v231.252H166.03v-5.029c0-5.124-4.153-9.277-9.276-9.277H82.551z M147.478,354.495v26.676H91.827v-26.676H147.478 z M493.448,423.93H18.552v-24.206h474.897V423.93z"></path> </g> </g> </g></svg>
                        <p className='md:pl-[20px]'>Turmas</p>
                        </li>
                    </Link>
                    
                    <a href="">
                        <li className='w-[15vw] md:w-auto md:pl-[30px] py-[10px] rounded-xl md:m-[10px] m-[5px] md:text-xl flex md:flex-row flex-col items-center text-[#2e3440] bg-base-100 hover:bg-[#d8dee9]'>
                        <svg width="24px" height="24px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512 480a224 224 0 1 0-224-224 224 224 0 0 0 224 224z m0-384a160 160 0 1 1-160 160 160 160 0 0 1 160-160zM989.44 947.84a32 32 0 0 0-6.72-10.56 37.12 37.12 0 0 0-10.56-6.72 32 32 0 0 0-34.88 6.72 36.8 36.8 0 0 0-6.72 10.56 26.56 26.56 0 0 0-2.56 12.16 32 32 0 0 0 2.24 12.16 39.04 39.04 0 0 0 7.04 10.56 32 32 0 0 0 34.88 6.72 37.12 37.12 0 0 0 10.56-6.72 32 32 0 0 0 6.72-34.88zM832 928h-160a32 32 0 0 0 0 64h160a32 32 0 0 0 0-64z" fill="#88c0d0"></path><path d="M941.44 862.08a32 32 0 0 0 18.56-41.6 480 480 0 0 0-926.4 137.28 32 32 0 0 0 32 34.24H544a32 32 0 0 0 0-64H101.44a416 416 0 0 1 800-84.48 32 32 0 0 0 40 18.56z" fill="#88c0d0"></path></g></svg>
                        <p className='md:pl-[20px]'>Alunos</p>
                        </li>
                    </a>

                    <a href="">
                        <li className='w-[15vw] md:w-auto md:pl-[30px] py-[10px] rounded-xl md:m-[10px] m-[5px] md:text-xl flex md:flex-row flex-col items-center text-[#2e3440] bg-base-100 hover:bg-[#d8dee9]'>
                        <svg width="24px" height="24px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="3" stroke="#88c0d0" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M43.31,37.52A11.83,11.83,0,0,1,31.25,49.35,12.1,12.1,0,0,1,19.63,37.12V20.64a.1.1,0,0,1,.08-.1,90.43,90.43,0,0,1,12.08-1,82.5,82.5,0,0,1,11.57,1,.09.09,0,0,1,.07.1Z"></path><path d="M19.63,26,9,20.47a.1.1,0,0,1,0-.18L31.49,8.86h.09L54,20.17a.1.1,0,0,1,0,.18L43.43,26"></path><path d="M19.63,32.19H17.7s-2.94,0-2.94,4.52c0,4.17,2.93,4.17,2.93,4.17l2.51-.05"></path><path d="M43.3,32.7h1.93s3,0,3,4.53c0,4.17-2.94,4.17-2.94,4.17H42.65"></path><line x1="52.72" y1="45.04" x2="52.72" y2="21.03"></line><circle cx="52.72" cy="47.36" r="2.31"></circle><polyline points="37.76 47.53 37.76 55.15 25.89 55.15 25.89 47.95"></polyline><path d="M43.43,30.13a63,63,0,0,0-11.61-1,60.25,60.25,0,0,0-12.19,1"></path></g></svg>
                        <p className='md:pl-[20px]'>Monitores</p>
                        </li>
                    </a>
                    
                    <Link to={`${page}/grupos`}>
                        <li className={`${isActive(`${page}/grupos`)}`}>
                        <svg fill={`${isActiveButton(`${page}/grupos`)}`} width="24px" height="24px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#88c0d0"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1807.059 1270.091c-68.668 48.452-188.725 116.556-343.906 158.57-18.861-102.55-92.725-187.37-196.066-219.106-91.708-28.235-185.11-48.339-279.53-61.666 71.944-60.762 121.638-145.807 135.982-243.162 21.91-.791 44.837-1.243 71.04-1.243 166.023.904 331.143 26.316 490.955 75.445 72.621 22.362 121.525 87.755 121.525 162.861v128.301Zm-451.765 338.824c-114.183 80.753-330.24 198.099-621.176 198.099-129.43 0-379.144-26.203-621.177-198.1v-128.752c0-74.993 49.017-140.499 121.75-162.861 162.41-49.694 330.354-74.88 499.427-74.88h8.47c166.588.79 331.821 26.09 491.407 75.106 72.509 22.249 121.3 87.642 121.3 162.635v128.753Zm-903.53-761.901V734.072c0-155.632 126.608-282.352 282.354-282.352 155.746 0 282.353 126.72 282.353 282.352v112.942c0 155.746-126.607 282.353-282.353 282.353S451.765 1002.76 451.765 847.014Zm734.118-734.118c75.22 0 146.146 29.478 199.567 82.899 53.309 53.421 82.786 124.235 82.786 199.454V508.19c0 155.746-126.607 282.353-282.353 282.353-19.651 0-38.4-2.598-56.47-6.438v-50.033c0-156.423-92.047-290.71-224.188-354.748 8.357-148.066 130.447-266.428 280.658-266.428Zm532.857 758.061c-91.37-28.01-184.546-48.226-279.755-61.666 86.174-72.508 142.192-179.802 142.192-301.1V395.248c0-105.374-41.11-204.65-115.877-279.304-74.767-74.767-173.93-115.99-279.417-115.99-200.696 0-365.138 151.002-390.211 345.148-20.217-3.275-40.433-6.325-61.553-6.325-217.977 0-395.294 177.43-395.294 395.294v112.942c0 121.298 56.018 228.593 142.305 301.214-94.305 13.214-188.16 33.092-279.529 61.1C81.092 1246.375 0 1355.249 0 1480.163v185.675l22.588 16.941c275.238 206.344 563.803 237.177 711.53 237.177 344.244 0 593.618-148.63 711.53-237.177l22.587-16.94v-120.51c205.214-50.597 355.652-146.032 429.177-201.373l22.588-16.941V1141.79c0-125.026-80.979-233.901-201.261-270.833Z" fillRule="evenodd"></path> </g></svg>
                        <p className='md:pl-[20px]'>Grupos</p>
                        </li>
                    </Link>  
                    </ul>
                </div>
        </div>
    )
}

export default SideBar
