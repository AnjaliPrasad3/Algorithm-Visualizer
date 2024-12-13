import React from 'react';
import './style.css';

import Backdrop from '../../basic/Backdrop/Backdrop';

const AppDrawer = ({ open, children, closeDrawer }) => {
  const className = `AppDrawer ${open ? 'AppDrawer_open' : 'AppDrawer_closed'}`;

  return (
    <>
      <div className={className}>
        <div className="AppDrawer__Content">{children}</div>
      </div>
      <Backdrop show={open} onClick={closeDrawer} />
    </>
  );
};

export default AppDrawer;
