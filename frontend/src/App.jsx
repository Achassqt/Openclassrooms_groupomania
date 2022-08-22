import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Welcome from './pages/Welcome'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { createGlobalStyle } from 'styled-components'
import colors from './utils/style/colors'
import { Context } from './utils/AppContext'
import { useState, useEffect } from 'react'
import axios from 'axios'

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${colors.tertiary}
  }
`
const App = () => {
  const [uid, setUid] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res)
          setUid(res.data.userId)
          setUserRole(res.data.userRole)
        })
        .catch((err) => console.log('no token'))
    }
    fetchToken()
  }, [uid])

  return (
    <BrowserRouter>
      <Context.Provider value={{ uid, userRole, isLoading, setIsLoading }}>
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
      </Context.Provider>
    </BrowserRouter>
  )
}

export default App
