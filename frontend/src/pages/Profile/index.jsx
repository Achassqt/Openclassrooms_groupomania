import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5'
import { FaRegEdit } from 'react-icons/fa'
// import white from '../../assets/white.png'
import { ButtonPoster } from '../../utils/style/Button'
import colors from '../../utils/style/colors'
import { useContext, useState } from 'react'
import { Context } from '../../utils/AppContext'
import { dateParser } from '../../utils/Timestamps'
// import axios from 'axios'

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
        position: relative;
        top: 1px;
        font-size: 19px;
        font-weight: 700;
        padding-left: 9px;
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
    .no-banner-container {
      height: 195px;
      width: 100%;
      position: relative;

      .no-banner {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }

      .edit-no-banner-container {
        background-color: ${colors.hoverTertiary};
        width: 100%;
        height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .edit-no-banner-btn {
          background-color: ${colors.primary}99;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;

          :hover {
            background-color: ${colors.hoverPrimary}99;
            /* background-color: ${colors.tertiary}99; */
          }

          .edit-no-banner-logo {
            width: 22px;
            height: 22px;
            color: white;
          }
        }
      }
    }

    .banner {
      height: 195px;
      width: 100%;
      object-fit: cover;
      border-left: 1px solid ${colors.tertiary};
      border-right: 1px solid ${colors.tertiary};
      box-sizing: border-box;
    }

    .profile-picture-container {
      position: relative;
      height: 115px;
      width: 115px;
      margin: -50px 0 0 20px;
      border-radius: 50%;

      .profile-picture {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        outline: 2px solid ${colors.tertiary};
        /* position: relative;
        bottom: 50px;
        left: 15px; */
        /* margin: -50px 0 0 20px; */
      }

      .edit-picture-container {
        background-color: ${colors.hoverTertiary}50;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .edit-picture-btn {
          background-color: ${colors.primary}99;
          /* background-color: ${colors.tertiary}50; */
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;

          :hover {
            background-color: ${colors.hoverPrimary}99;
            /* background-color: ${colors.tertiary}99; */
          }

          .edit-picture-logo {
            width: 22px;
            height: 22px;
            color: white;
          }
        }
      }
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
      margin: 12px 20px;
      margin-top: 40px;
      border-radius: 5px;
      font-size: 17px;
      color: white;
      padding: 0 10px;

      :focus {
        /* border-color: ${colors.primary}; */
        outline: none;
      }

      &::placeholder {
        color: white;
        /* padding-left: 10px; */
      }
    }
  }
`

function Profile() {
  const { userData } = useContext(Context)
  const [hoverStylePicture, setHoverStylePicture] = useState(false)
  const [hoverStyleBanner, setHoverStyleBanner] = useState(false)
  const [pseudo, setPseudo] = useState(userData.pseudo)
  const [file, setFile] = useState(userData.banner)
  // const dateUserCreation = userData.timestamps
  // const formatDate = (date) => {
  //   const options = { years: 'numeric', month: 'long', day: 'numeric' }
  //   return new Date(date).toLocalDateString(undefined, options)
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   await axios ({
  //     method: 'put',
  //     url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
  //     withCredentials: true,
  //     data: {
  //       pseudo,
  //       imageUrl,
  //       banner,
  //     },
  //   })
  // }

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
            {file ? (
              <div className="banner-container">
                <img className="banner" src={userData.banner} alt="pp" />
                <div className="edit-banner-container">
                  <button className="edit-banner-btn">
                    <FaRegEdit className="edit-banner-logo" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="no-banner-container"
                onMouseEnter={() => setHoverStyleBanner(true)}
                onMouseLeave={() => setHoverStyleBanner(false)}
              >
                <div className="no-banner"></div>
                <div className="edit-no-banner-container">
                  <button
                    style={{ display: hoverStyleBanner ? 'block' : 'none' }}
                    className="edit-no-banner-btn"
                  >
                    <FaRegEdit className="edit-no-banner-logo" />
                  </button>
                </div>
              </div>
            )}
            <div
              className="profile-picture-container"
              onMouseEnter={() => setHoverStylePicture(true)}
              onMouseLeave={() => setHoverStylePicture(false)}
            >
              <img
                className="profile-picture"
                src={`../${userData.imageUrl}`}
                alt="pp"
              />
              <div
                className="edit-picture-container"
                style={{ display: hoverStylePicture ? 'block' : 'none' }}
              >
                <button className="edit-picture-btn">
                  <FaRegEdit className="edit-picture-logo" />
                </button>
              </div>
            </div>
          </div>
          <form>
            <input
              type="text"
              placeholder="Pseudo"
              onChange={(e) => setPseudo(e.target.value)}
              value={pseudo}
            ></input>
          </form>
          <span>
            A rejoint Groupomania en {dateParser(userData.timestamps)}
          </span>
        </ProfileSection>
      </ProfileContent>
    </ProfileWrapper>
  )
}

export default Profile
