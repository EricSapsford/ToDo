import React, { useState, useEffect } from 'react';

import LoginFormModal from '../LoginFormModal';
import SplashForms from '../SplashForms';
import "./HomePage.css"

function HomePage () {

  // const [suffix, setSuffix] = useState("Today")

  return (
    <>
      <div className='home-page-overdiv'>
        <div className='logo-ticker'>
          <h3 className='welcome-message'>
            Welcome! Log in or sign up to begin managing your tasks!
          </h3>
          <h1 className='logo-ticker-span'>
            {/* <img className="checklist-image" src="../../checklist.png" /> Due{suffix} */}
            <img className="checklist-image" src="../../checklist.png" /> DueToo
          </h1>
        </div>
        <div className='home-page-login-form-span'>
          {/* <LoginFormModal /> */}
          <SplashForms />
        </div>
      </div>
    </>
  )
}

export default HomePage
