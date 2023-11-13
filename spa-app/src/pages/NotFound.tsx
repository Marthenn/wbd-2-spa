import * as React from 'react';
import logo from '../assets/logo.svg';
import BackgroundWave from '../assets/bg-wave.svg';

const NotFound = () => {
  return (
      <div
      style={{
        height: '100vh',
        background: `url(${BackgroundWave}) center/cover no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // color: 'white',
        fontSize: '2rem',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '35px',
          height: 'auto',
        }}
      />

      <h1 style={{ fontSize: '5rem', marginBottom: '-0.5rem' }}>404 Not Found</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '30rem' }}>
        Sorry, the page you are looking for does not exist
      </p>
    </div>
  );
};

export default NotFound;
