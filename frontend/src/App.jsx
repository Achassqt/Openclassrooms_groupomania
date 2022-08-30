import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Home/Profile'
import Welcome from './pages/Welcome'
import Signup from './pages/Welcome/Signup'
import Login from './pages/Welcome/Login'
import { createGlobalStyle } from 'styled-components'
import colors from './utils/style/colors'
import { Context } from './utils/AppContext'
import { useState, useEffect } from 'react'
import axios from 'axios'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Lato', sans-serif;
    /* font-family: 'Roboto', sans-serif; */
    background-color: ${colors.tertiary}
  }
`
const App = () => {
  const [uid, setUid] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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

  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (uid) {
  //     return navigate('/home')
  //   }
  // }, [uid])

  return (
    <BrowserRouter>
      <Context.Provider value={{ uid, userRole, isLoading, setIsLoading }}>
        <GlobalStyle />
        <Routes>
          <Route
            path="/"
            element={
              uid === null ? <Welcome /> : <Navigate to="/home" replace />
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route path="home" element={<Home />}>
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<Navigate to="home" replace />} />
        </Routes>
      </Context.Provider>
    </BrowserRouter>
  )
}

export default App
