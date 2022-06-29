import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5'
import white from '../../assets/white.png'
import { ButtonPoster } from '../../utils/style/Button'
import colors from '../../utils/style/colors'

const ProfileWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(91, 112, 131, 0.4);
  z-index: 1;
`

const ProfileContent = styled.article`
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
    /* justify-content: space-between; */

    & > a {
      margin-left: 8px;
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

    .header-right-side {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;

      .title {
        font-size: 20px;
        font-weight: 700;
        padding-left: 5px;
      }

      .btn-enregistrer {
        font-size: 14px;
        font-weight: 700;
        height: 34px;
        width: 150px;
      }
    }
  }
`

const ProfileSection = styled.section`
  width: 100%;
  margin: 0 auto;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  height: 100%;
  box-sizing: border-box;

  .images {
    .banner {
      height: 195px;
      width: 100%;
      object-fit: cover;
      border: 2px solid ${colors.tertiary};
      box-sizing: border-box;
    }

    .pp {
      height: 115px;
      width: 115px;
      border-radius: 50%;
      border: 2px solid black;
      /* position: relative;
      bottom: 50px;
      left: 15px; */
      margin: -50px 0 0 15px;
    }
  }

  & > form {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;

    & > input {
      background-color: ${colors.tertiary};
      border: 1px ${colors.secondary} solid;
      height: 60px;
      margin: 12px 16px;
      border-radius: 5px;
      font-size: 17px;
      color: white;

      &::placeholder {
        color: white;
        /* padding-left: 10px; */
      }
    }
  }
`

function Profile() {
  return (
    <ProfileWrapper>
      <ProfileContent>
        <header>
          <Link to="/home">
            <IoCloseOutline />
          </Link>
          <div className="header-right-side">
            <span className="title">Éditer le profil</span>
            <ButtonPoster className="btn-enregistrer">Enregistrer</ButtonPoster>
          </div>
        </header>
        <ProfileSection>
          <div className="images">
            <img className="banner" src={white} alt="pp" />
            <img className="pp" src={white} alt="pp" />
          </div>
          <form>
            <input type="text" placeholder="Nom"></input>
          </form>
        </ProfileSection>
      </ProfileContent>
    </ProfileWrapper>
  )
}

export default Profile
