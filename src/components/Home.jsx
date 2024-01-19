import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <div className="Home-container" style={{
      background:"linear-gradient(to right, #87CEEB, #4169E1)"
    }}>
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />

      <div
        className="headerfiles"
        style={{
          width: showSidebar ? 'calc(100% - 30%)' : '100%',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: showSidebar ? '30%' : '0',
          transition: 'all 0.5s',
        }}
      >
        <img
          src="../../assets/OIG.jpeg"
          alt=""
          style={{
            width: '100%',
            height: '100vh',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Lets begin with our app </h2>
          <h2 style={{ color: 'rgba(255, 255, 255, 0.8)'}}>Click below</h2>
          <h2 style={{ color: 'rgba(255, 255, 255, 0.8)'}}>to start</h2>
          <button onClick={toggleSidebar}className='start-btn' style={{ marginTop: '80px', 
            width:"60%",
            height:"3rem",
            margin:"1rem auto",
            display:"block",
            cursor:"pointer",
            backgroundColor: "rgb(168, 2, 2)",
            color:"white",
            borderRadius:"10px",
            fontSize:"1.5rem",
        }}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
