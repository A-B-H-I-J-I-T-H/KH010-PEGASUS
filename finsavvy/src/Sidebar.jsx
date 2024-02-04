import React, { useState } from 'react';
import {BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsBarChart } from 'react-icons/bs'
import MonthlyInstallmentPopup from './MonthlyInstallmentPopup'; // Import the new component

function Sidebar({openSidebarToggle, OpenSidebar}) {
    const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup

    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
  
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
      <div className={`sidebar-title ${showPopup ? 'blurred' : ''}`}>
            <div className='sidebar-brand'>
                <BsGrid1X2Fill className='icon'/> DASHBOARD
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className={`sidebar-list ${showPopup ? 'blurred' : ''}`}>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsBarChart  className='icon'/> Live Stock
                </a>
            </li>
            <li className='sidebar-list-item' onClick={togglePopup}>
                <a href="#">
                    <BsFillArchiveFill className='icon'/> Planner
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> Transactions
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Logout
                </a>
            </li>
        </ul>
        {showPopup && <MonthlyInstallmentPopup onClose={togglePopup} />}

    </aside>
  )
}

export default Sidebar