import React, { useState, useEffect } from 'react';


import "./Today.css"

function Today () {

  const [suffix, setSuffix] = useState("Today")

  return (
    <>
      <div className='today-overdiv'>
        <h1>Welcome to the logged in landing page!</h1>
        <h1>This feature is upcoming, and will incorperate the use of Task due dates.</h1>
        <h1>For now, create a new project, or navigate to an existing one,</h1>
        <h1>by opening the projects side menu with the "projects" button above</h1>
      </div>
    </>
  )
}

export default Today
