import React, { useState, useEffect } from 'react';

import LoginFormModal from '../LoginFormModal';
import "./HomePage.css"

function HomePage () {

  const [suffix, setSuffix] = useState("Today")

  return (
    <>
      <div className='home-page-overdiv'>
        <div className='logo-ticker'>
          Due{suffix}
        </div>
        <div className='home-page-login-form-span'>
          <LoginFormModal />
        </div>
      </div>
    </>
  )
}

export default HomePage
