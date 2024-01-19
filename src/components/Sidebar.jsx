import React, { useState } from 'react';
import '../Style/Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { WiCloud } from 'weather-icons-react';
import { FaTimes, FaCircle, FaStopwatch } from 'react-icons/fa';
import { HiMenuAlt4 } from 'react-icons/hi';

const Li = ({ path, Appcomponent, ReactIcon, location }) => {
  const IconComponent = ReactIcon ? ReactIcon : null;

  return (
    <li
      className="link-components"
      style={{
        background: location.pathname.includes(path) ? 'rgba(0, 123, 255, 0.5)' : 'transparent',
      }}
    >
      <Link to={path} className="link-style">
        {IconComponent && <IconComponent />} {Appcomponent}
      </Link>
    </li>
  );
};

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div
      className="sidebar"
      style={{
        width: '30%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: showSidebar ? '0' : '-30%',
        transition: 'all 0.5s',
        background: 'linear-gradient(to bottom, rgba(0, 123, 255, 0.8), rgba(0, 123, 255, 0))',
      }}
    >
      <div className="sidebar-components">
        <button id="hamburger" onClick={toggleSidebar}>
          <HiMenuAlt4 />
        </button>

        <ul>
          <Li path="/weather" Appcomponent="Weather" ReactIcon={WiCloud} location={location} />
          <Li path="/todoapp" Appcomponent="TodoApp" ReactIcon={FaStopwatch} location={location} />
        </ul>
        <button id="close-sidebar" onClick={toggleSidebar}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
