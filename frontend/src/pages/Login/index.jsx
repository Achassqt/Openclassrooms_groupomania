import styled from 'styled-components'
import Log from '../../components/Log'
import { useState } from 'react'
import axios from 'axios'

const LoginWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(91, 112, 131, 0.4);
`

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState()
  const [passwordError, setPasswordError] = useState()

  const handleLogin = async (e) => {
    e.preventDefault()

    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          const emailDataError = res.data.errors.email
          setEmailError({ __html: emailDataError })

          const passwordDataError = res.data.errors.password
          setPasswordError({ __html: passwordDataError })
        } else {
          window.location = '/home'
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const loginForm = [
    {
      id: 'login1',
      type: 'text',
      name: 'email',
      placeholder: 'Email',
      onChange: (e) => setEmail(e.target.value),
      value: email,
      dangerouslySetInnerHTML: emailError,
    },
    {
      id: 'login2',
      type: 'password',
      name: 'password',
      placeholder: 'Mot de passe',
      onChange: (e) => setPassword(e.target.value),
      value: password,
      dangerouslySetInnerHTML: passwordError,
    },
  ]

  return (
    <LoginWrapper>
      <Log
        title="Connectez-vous à Groupomania"
        btnName="Se connecter"
        question="Vous n'avez pas de compte ?"
        link="/signup"
        linkName="Inscrivez-vous"
        handleFunction={handleLogin}
        mapForm={loginForm}
      />
    </LoginWrapper>
  )
}

export default Login
