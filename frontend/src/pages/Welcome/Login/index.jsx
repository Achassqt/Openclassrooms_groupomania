import Log from '../../../components/Log'

import { useState } from 'react'

import axios from 'axios'

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
          setEmailError(res.data.errors.email)
          setPasswordError(res.data.errors.password)
        } else {
          window.location = '/home'
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const loginInputs = [
    {
      type: 'text',
      name: 'email',
      placeholder: 'Email',
      onChange: (e) => setEmail(e.target.value),
      value: email,
      error: emailError,
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Mot de passe',
      onChange: (e) => setPassword(e.target.value),
      value: password,
      error: passwordError,
    },
  ]

  return (
    <Log
      title="Connectez-vous à Groupomania"
      btnName="Se connecter"
      question="Vous n'avez pas de compte ?"
      link="/signup"
      linkName="Inscrivez-vous"
      handleFunction={handleLogin}
      logInput={loginInputs}
    />
  )
}

export default Login
