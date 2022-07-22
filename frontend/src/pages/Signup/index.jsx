import styled from 'styled-components'
import Log from '../../components/Log'
import axios from 'axios'
import { useState } from 'react'

const SignupWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(91, 112, 131, 0.4);
`

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

    setControlPasswordError({ __html: '' })

    if (password !== controlPassword) {
      setControlPasswordError({
        __html: 'Les mots de passe ne correspondent pas',
      })
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
            const pseudoDataError = res.data.errors.pseudo
            const emailDataError = res.data.errors.email
            const passwordDataError = res.data.errors.password

            setPseudoError({ __html: pseudoDataError })
            setEmailError({ __html: emailDataError })
            setPasswordError({ __html: passwordDataError })
          } else {
            window.location = '/login'
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const signupForm = [
    {
      type: 'text',
      name: 'pseudo',
      placeholder: 'Pseudo',
      onChange: (e) => setPseudo(e.target.value),
      value: pseudo,
      dangerouslySetInnerHTML: pseudoError,
    },
    {
      type: 'text',
      name: 'email',
      placeholder: 'Email',
      onChange: (e) => setEmail(e.target.value),
      value: email,
      dangerouslySetInnerHTML: emailError,
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Mot de passe',
      onChange: (e) => setPassword(e.target.value),
      value: password,
      dangerouslySetInnerHTML: passwordError,
    },
    {
      type: 'password',
      name: 'controlPassword',
      placeholder: 'Confirmer mot de passe',
      onChange: (e) => setControlPassword(e.target.value),
      value: controlPassword,
      dangerouslySetInnerHTML: controlPasswordError,
    },
  ]
  return (
    <SignupWrapper>
      <Log
        title="Créer votre compte"
        btnName="S'inscrire"
        question="Vous avez déjà un compte ?"
        link="/login"
        linkName="Connectez-vous"
        handleFunction={handleSignup}
        mapForm={signupForm}
      />
    </SignupWrapper>
  )
}

export default Signup
