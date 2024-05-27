import React from 'react';

const FooterComponent = () => {
  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', height: '50px', backgroundColor: '#0D6EFD', textAlign: 'center', color: '#FFFFFF' }}>
      <footer className='footer'>
        <span style={{ lineHeight: '50px' }}>Employee Management System. All Rights Reserved.</span>
      </footer>
    </div>
  );
};

export default FooterComponent;
