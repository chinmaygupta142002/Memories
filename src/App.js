import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'

function App() {
  return (
    <Router>
    <div>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/memories" element={<Home />} />
    </Routes>
    </div>
    </Router>
  )
}

export default App
