import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaTwitter } from 'react-icons/fa'
import { IoCloseOutline } from 'react-icons/io5'
import colors from '../../utils/style/colors'
import { ButtonPoster } from '../../utils/style/Button'
import iconGroupomania from '../../assets/icon-groupomania.png'

const LoginWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(91, 112, 131, 0.4);
`

const LoginContent = styled.article`
  background-color: ${colors.tertiary};
  height: 650px;
  width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 17px;
  border: 1px solid ${colors.secondary};
  display: flex;
  flex-direction: column;

  & > header {
    /* background-color: green; */
    border-radius: 17px 17px 0 0;
    color: white;
    width: 100%;
    min-height: 53px;
    display: flex;
    align-items: center;
    justify-content: center;

    & > a {
      position: absolute;
      left: 8px;
      text-decoration: none;
      color: white;
      padding: 4px;
      height: 28px;
      width: 28px;

      &:hover {
        background-color: ${colors.hoverTertiary};
        border-radius: 50%;
      }

      & > svg {
        width: 100%;
        height: 100%;
      }
    }

    & > img {
      height: 35px;
      width: 35px;
    }
  }
`

const LoginSection = styled.section`
  width: 364px;
  margin: 0 auto;
  padding: 0 32px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;

  & > h2 {
    font-size: 31px;
    color: white;
    margin-bottom: 0;
    text-align: center;
  }

  & > form {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    color: white;

    & > input {
      background-color: ${colors.tertiary};
      border: 1px ${colors.secondary} solid;
      height: 60px;
      margin: 10px 0;
      border-radius: 5px;
      font-size: 17px;

      ::placeholder {
        color: white;
      }
    }

    & > button {
      height: 40px;
      margin-top: 20px;
      font-weight: 700;
    }
  }

  & > span {
    color: white;
    font-size: 15px;

    & > a {
      text-decoration: none;
      color: ${colors.primary};
    }
  }
`

function Signup() {
  return (
    <LoginWrapper>
      <LoginContent>
        <header>
          <Link to="/">
            <IoCloseOutline />
          </Link>
          <img src={iconGroupomania} alt="fes" />
        </header>
        <LoginSection>
          <h2>Créer votre compte</h2>
          <form>
            <input type="text" placeholder="Email"></input>
            <input type="text" placeholder="Password"></input>
            <ButtonPoster>S'inscrire</ButtonPoster>
          </form>
          <span>
            Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link>
          </span>
        </LoginSection>
      </LoginContent>
    </LoginWrapper>
  )
}

export default Signup
