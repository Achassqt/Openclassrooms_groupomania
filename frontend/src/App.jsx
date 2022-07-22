import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Welcome from './pages/Welcome'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { createGlobalStyle } from 'styled-components'
import colors from './utils/style/colors'
import { UidContext } from './utils/AppContext'
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

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res)
          setUid(res.data)
        })
        .catch((err) => console.log('no token'))
    }
    fetchToken()
  }, [uid])

  return (
    <BrowserRouter>
      <UidContext.Provider value={uid}>
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
      </UidContext.Provider>
    </BrowserRouter>
  )
}

export default App
