import styled from 'styled-components'
import { Outlet, Link } from 'react-router-dom'
import groupomania from '../../assets/icon-left-font.svg'
import iconGroupomania from '../../assets/icon-groupomania.png'
import background from '../../assets/welcome-background.jpg'
import { ButtonPoster } from '../../utils/style/Button'
// import colors from '../../utils/style/colors'

const WelcomeWrapper = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  /* flex-flow: row wrap; */
  /* background-color: black; */

  .left-side-wrapper {
    position: relative;
    /* background-color: red; */
    width: 47%;
    /* height: 91%; */
    /* height: 100%; */
    overflow: hidden;

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
      /* font-size: 50vw; */
      width: 80%;
    }
  }

  .right-side-wrapper {
    /* background-color: blue; */
    position: fixed;
    top: 0;
    right: 0;
    width: 53%;
    height: 91%;

    .right-side-content {
      /* background-color: green; */
      display: flex;
      flex-direction: column;
      color: white;
      height: 100%;
      width: 100%;
      padding: 36px;
      box-sizing: border-box;

      & > img {
        width: 48px;
        height: 60px;
        padding-bottom: 12px;
      }

      & > h1 {
        font-size: 64px;
        margin: 48px 0;
      }

      & > h2 {
        font-size: 31px;
        margin: 0;
        margin-bottom: 32px;
      }
    }
  }

  .footer-content {
    /* background-color: black; */
    height: 9%;
    width: 100%;
  }
`

const LinksContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 300px;

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
      <div className="left-side-wrapper">
        <img className="left-side-background" src={background} alt="fond" />
        <img className="logo-groupomania" src={groupomania} alt="entreprise" />
      </div>
      <div className="right-side-wrapper">
        <div className="right-side-content">
          <img src={iconGroupomania} alt="zefn" />
          <h1>Bienvenue !</h1>
          <h2>Rejoignez Groupomania dès aujourd'hui.</h2>
          <LinksContent>
            <Link className="singup-link" to="signup">
              <ButtonPoster>S'inscrire</ButtonPoster>
            </Link>
            <div className="login-content">
              <span>Vous avez déjà un compte ?</span>
              <Link className="login-link" to="login">
                <ButtonPoster>Se connecter</ButtonPoster>
              </Link>
            </div>
          </LinksContent>
        </div>
      </div>
      {/* <footer className="footer-content"></footer> */}

      <Outlet />
    </WelcomeWrapper>
  )
}

export default Welcome
