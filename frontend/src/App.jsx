import React from 'react'
import './App.css'
import Dashboard from './Dashboard'
import ResumeMtacher from './ResumeMatcher'
import CurrentVacancies from './CurrentVacancies'
import {Routes, Route} from 'react-router'
Routes
function App() {

  return (
    <>
      {/* <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        {/* <Route path='/ResumeMatcher' element={<ResumeMtacher/>}/>
        <Route path='/CurrentVacancies' element={<CurrentVacancies/>}/> */}
      {/* </Routes> */} 
      <Dashboard/>
    <Routes>
        
    </Routes>
    </>
  )
}

export default App
