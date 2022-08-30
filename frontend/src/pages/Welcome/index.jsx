import styled from 'styled-components'

import groupomania from '../../assets/icon-left-font.svg'
import iconGroupomania from '../../assets/icon-groupomania.png'
import background from '../../assets/welcome-background.jpg'

import { Button } from '../../utils/Button'

import { Outlet, Link } from 'react-router-dom'

const WelcomeWrapper = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;

  @media (max-width: 1000px) {
    flex-direction: column-reverse;
    justify-content: space-between;
    min-height: 700px;
  }
`

const LeftSideWrapper = styled.div`
  min-height: 600px;
  min-width: 300px;

  @media (max-width: 1000px) {
    min-height: 100px;
    max-height: 30vh;
    width: 100%;
  }

  .left-side-container {
    position: relative;
    max-width: 46vw;
    height: 100%;
    overflow: hidden;

    @media (max-width: 1000px) {
      max-width: 100%;
    }

    .left-side-background {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    .logo-groupomania {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      width: 80%;
    }
  }
`

const RightSideWrapper = styled.div`
  min-width: 54vw;
  height: 100%;

  .right-side-content {
    /* background-color: green; */
    display: flex;
    flex-direction: column;
    color: white;
    height: 100%;
    width: 100%;
    padding: 36px;
    box-sizing: border-box;

    @media (max-width: 1000px) {
      max-width: 600px;
      margin: auto;
    }

    & > a {
      width: 60px;
      height: 60px;
      & > img {
        width: 60px;
        height: 60px;
        padding-bottom: 12px;
      }
    }

    & > h1 {
      font-size: 64px;
      margin: 48px 0;

      @media (max-width: 500px) {
        font-size: 32px;
      }
    }

    & > h2 {
      font-size: 31px;
      margin: 0;
      margin-bottom: 32px;

      @media (max-width: 500px) {
        font-size: 22px;
      }
    }
  }
`

const LinksContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  max-width: 300px;

  @media (max-width: 500px) {
  }

  .singup-link {
    & > button {
      height: 40px;
      width: 100%;
    }
  }

  .login-content {
    display: flex;
    flex-direction: column;
    & > span {
      margin-top: 40px;
      margin-bottom: 20px;
      font-weight: 700;
    }

    .login-link {
      & > button {
        height: 40px;
        width: 100%;
      }
    }
  }
`

function Welcome() {
  return (
    <WelcomeWrapper>
      <LeftSideWrapper>
        <div className="left-side-container">
          <img className="left-side-background" src={background} alt="fond" />
          <img
            className="logo-groupomania"
            src={groupomania}
            alt="Groupomania"
          />
        </div>
      </LeftSideWrapper>
      <RightSideWrapper>
        <div className="right-side-content">
          <a href="/home">
            <img src={iconGroupomania} alt="Groupomania" />
          </a>
          <h1>Bienvenue !</h1>
          <h2>Rejoignez Groupomania dès aujourd'hui.</h2>
          <LinksContent>
            <Link className="singup-link" to="signup">
              <Button>S'inscrire</Button>
            </Link>
            <div className="login-content">
              <span>Vous avez déjà un compte ?</span>
              <Link className="login-link" to="login">
                <Button>Se connecter</Button>
              </Link>
            </div>
          </LinksContent>
        </div>
      </RightSideWrapper>

      <Outlet />
    </WelcomeWrapper>
  )
}

export default Welcome
