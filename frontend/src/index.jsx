import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Welcome from './pages/Welcome'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { createGlobalStyle } from 'styled-components'
import colors from './utils/style/colors'

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${colors.tertiary}
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Welcome />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="home" element={<Home />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
