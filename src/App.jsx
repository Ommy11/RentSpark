// import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/about' element={<About />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App