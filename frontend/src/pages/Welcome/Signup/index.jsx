// import styled from 'styled-components'
import Log from '../../../components/Log'
import axios from 'axios'
import { useState } from 'react'

function Signup() {
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [controlPassword, setControlPassword] = useState('')

  const [pseudoError, setPseudoError] = useState()
  const [emailError, setEmailError] = useState()
  const [passwordError, setPasswordError] = useState()
  const [controlPasswordError, setControlPasswordError] = useState()

  const handleSignup = async (e) => {
    e.preventDefault()

    if (password !== controlPassword) {
      setControlPasswordError('Les mots de passe ne correspondent pas')
    } else {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/user/signup`,
        withCredentials: true,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res)

          if (res.data.errors) {
            setPseudoError(res.data.errors.pseudo)
            setEmailError(res.data.errors.email)
            setPasswordError(res.data.errors.password)
          } else {
            window.location = '/login'
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const signupInputs = [
    {
      type: 'text',
      name: 'pseudo',
      placeholder: 'Pseudo',
      onChange: (e) => setPseudo(e.target.value),
      value: pseudo,
      error: pseudoError,
    },
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
    {
      type: 'password',
      name: 'controlPassword',
      placeholder: 'Confirmer mot de passe',
      onChange: (e) => setControlPassword(e.target.value),
      value: controlPassword,
      error: controlPasswordError,
    },
  ]
  return (
    <Log
      title="Créer votre compte"
      btnName="S'inscrire"
      question="Vous avez déjà un compte ?"
      link="/login"
      linkName="Connectez-vous"
      handleFunction={handleSignup}
      logInput={signupInputs}
    />
  )
}

export default Signup
