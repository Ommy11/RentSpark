// import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import About from './pages/About'
import Header from './Components/Header'
import Profile from './pages/Profile'
import PrivateRoute from './Components/PrivateRoute'
import Services from './pages/Services'
import UpdateService from './pages/UpdateService'
import Listing from './pages/Listing'
import Search from './pages/Search'
import Footer from './Components/Footer'
import Checkoutpage from './pages/Checkoutpage'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/about' element={<About />} />
      <Route path='/search' element={<Search />} />
      <Route path='/listing/:listingId' element={<Listing />} />
      {/* <Route path='/checkout' element={<CheckoutPage />} /> */}
      <Route path='/payment/:listingId' element={<Checkoutpage />} />
      <Route path='/success' element={<Success />} />
      <Route path='/cancel' element={<Cancel />} />
      <Route element={<PrivateRoute />} >
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/services' element={<Services />} />
        <Route path='/updateservices/:listingId' element={<UpdateService />} />
        
      </Route>
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App