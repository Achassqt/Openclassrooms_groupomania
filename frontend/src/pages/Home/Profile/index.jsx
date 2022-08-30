import styled from 'styled-components'
import colors from '../../../utils/style/colors'

import { IoCloseOutline } from 'react-icons/io5'
import { Button } from '../../../utils/Button'

import { useContext, useState } from 'react'
import { Context } from '../../../utils/AppContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ProfileImages from '../../../components/ProfileImages'

const ProfileWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  min-height: 420px;
  width: 100%;
  background-color: ${colors.hoverTertiary}99;
  z-index: 1;
`

const ProfileContent = styled.form`
  background-color: ${colors.tertiary};
  height: 650px;
  min-height: 376px;
  max-height: 90vh;
  min-width: 320px;
  width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 17px;
  border: 1px solid ${colors.secondary};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 704px) {
    border: none;
    height: 100%;
    max-height: 100%;
    width: 100%;
    min-height: 0px;
    border-radius: 0;
  }

  & > header {
    position: sticky;
    border-radius: 17px 17px 0 0;
    color: white;
    width: 100%;
    min-height: 53px;
    display: flex;
    align-items: center;

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

      @media (max-width: 375px) {
        padding: 0;
      }

      .title {
        position: relative;
        top: 1px;
        font-size: 19px;
        font-weight: 700;
        padding-left: 9px;
      }

      .btn {
        display: flex;

        .btn-annuler {
          margin-right: 10px;
          font-weight: 700;
          height: 38px;
          width: 100px;

          @media (max-width: 500px) {
            width: 75px;
          }
        }

        .btn-enregistrer {
          font-weight: 700;
          height: 38px;
          width: 150px;

          @media (max-width: 500px) {
            width: 100px;
          }
        }
      }
    }
  }
`

const ProfileSectionWrapper = styled.div`
  height: 100%;
  overflow: auto;
`

const ProfileSection = styled.section`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100%;
  box-sizing: border-box;

  .date {
    margin: 20px;
  }

  .pseudo-edit {
    position: relative;
    width: 100%;
    margin-bottom: 40px;
    padding: 0 20px;
    box-sizing: border-box;

    & > input {
      box-sizing: border-box;
      width: 100%;
      background-color: ${colors.tertiary};
      border: 1px ${colors.secondary} solid;
      height: 60px;
      border-radius: 5px;
      font-size: 17px;
      color: white;
      padding: 0 10px;

      :focus {
        outline: 1px solid ${colors.secondary};
      }

      &::placeholder {
        color: white;
      }
    }

    .pseudo-error {
      color: #ed0000;
      position: absolute;
      bottom: -25px;
      left: 20px;
    }
  }

  .date {
    height: 20px;
    margin-top: auto;
    justify-self: flex-end;
    font-weight: bold;
    color: white;
  }
`

function Profile() {
  const { uid, userData, setGetUserData } = useContext(Context)

  const [hoverStylePicture, setHoverStylePicture] = useState(false)
  const [hoverStyleBanner, setHoverStyleBanner] = useState(false)

  const [bannerFile, setBannerFile] = useState(null)
  const [bannerPreview, setBannerPreview] = useState(null)

  const [profileFile, setProfileFile] = useState(null)
  const [profilePreview, setProfilePreview] = useState(null)

  const [pseudo, setPseudo] = useState(userData.pseudo)

  const [bannerErrors, setBannerErrors] = useState({ message: '' })
  const [profileErrors, setProfileErrors] = useState({ message: '' })
  const [pseudoErrors, setPseudoErrors] = useState({ message: '' })

  // Vérification de la bannière

  function handleBannerFile(e) {
    const file = e.target.files[0]

    if (file.size > 5000000) {
      setBannerFile(null)
      setBannerPreview(null)
      setBannerErrors({ message: "Taille d'image maximal: 5MB" })
      return bannerErrors
    } else {
      setBannerPreview(URL.createObjectURL(file))
      setBannerFile(file)
      setBannerErrors({ message: '' })
    }
  }

  //Vérification de l'image de profil

  function handleProfileFile(e) {
    const file = e.target.files[0]

    if (file.size > 5000000) {
      setProfileFile(null)
      setProfilePreview(null)
      setProfileErrors({ message: "Taille d'image maximal: 5MB" })
      return profileErrors
    } else {
      setProfilePreview(URL.createObjectURL(file))
      setProfileFile(file)
      setProfileErrors({ message: '' })
    }
  }

  // modification Pseudo Image de Profil et Bannière

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (userData.pseudo !== pseudo && pseudo.length > 2) {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
        data: {
          pseudo,
        },
      })
        .then((res) => {
          setPseudo(res.data.pseudo)
          setPseudoErrors({ message: '' })
        })
        .catch((err) => {
          console.log(err)
          setPseudoErrors({ message: 'Pseudo déjà pris' })
        })
    }

    if (profileFile !== null) {
      const formDataProfile = new FormData()
      formDataProfile.append('file', profileFile)

      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/user/upload/profile-picture/${uid}`,
        data: formDataProfile,
      })
        .then(() => {
          // setProfilePreview(null)
          // setProfileFile(null)
          setProfileErrors({ message: '' })
          console.log('Photo modifiée')
        })
        .catch((err) => console.log(err))
    }

    if (bannerFile !== null) {
      const formDataBanner = new FormData()
      formDataBanner.append('file', bannerFile)

      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/user/upload/banner/${uid}`,
        data: formDataBanner,
      })
        .then(() => {
          // setBannerPreview(null)
          // setBannerFile(null)
          setBannerErrors({ message: '' })
          console.log('Bannière modifiée')
        })
        .catch((err) => console.log(err))
    }

    setGetUserData(true)
    window.location = '/home'
  }

  let date = new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
  }).format(userData.timestamps)

  return (
    <ProfileWrapper>
      <ProfileContent onSubmit={handleSubmit}>
        <header>
          <Link to="/home">
            <IoCloseOutline />
          </Link>
          <div className="header-right-side">
            <span className="title">Éditer le profil</span>
            <div className="btn">
              <Button
                onClick={() => {
                  setPseudo(userData.pseudo)
                  setProfileFile(null)
                  setProfilePreview(null)
                  setBannerFile(null)
                  setBannerPreview(null)
                  setBannerErrors({})
                  setProfileErrors({ message: '' })
                  setPseudoErrors({ message: '' })
                }}
                type="button"
                className="btn-annuler"
                style={{
                  display:
                    pseudo !== userData.pseudo ||
                    profilePreview ||
                    bannerPreview ||
                    bannerErrors.message === "Taille d'image maximal: 5MB" ||
                    profileErrors.message === "Taille d'image maximal: 5MB" ||
                    pseudoErrors.message === 'Pseudo déjà pris'
                      ? 'block'
                      : 'none',
                }}
              >
                Annuler
              </Button>
              <Button
                style={{
                  display:
                    pseudo !== userData.pseudo ||
                    profilePreview ||
                    bannerPreview ||
                    bannerErrors.message === "Taille d'image maximal: 5MB" ||
                    profileErrors.message === "Taille d'image maximal: 5MB" ||
                    pseudoErrors.message === 'Pseudo déjà pris'
                      ? 'block'
                      : 'none',
                }}
                type="submit"
                className="btn-enregistrer"
              >
                Enregistrer
              </Button>
            </div>
          </div>
        </header>
        <ProfileSectionWrapper>
          <ProfileSection>
            <ProfileImages
              hoverStylePicture={hoverStylePicture}
              setHoverStylePicture={setHoverStylePicture}
              hoverStyleBanner={hoverStyleBanner}
              setHoverStyleBanner={setHoverStyleBanner}
              handleProfileFile={handleProfileFile}
              handleBannerFile={handleBannerFile}
              bannerPreview={bannerPreview}
              bannerErrors={bannerErrors}
              profilePreview={profilePreview}
              profileErrors={profileErrors}
            />
            <div className="pseudo-edit">
              <input
                type="text"
                placeholder="Pseudo"
                spellCheck={false}
                minLength={3}
                maxLength={20}
                onChange={(e) => setPseudo(e.target.value)}
                value={pseudo}
              ></input>
              <span className="pseudo-error">{pseudoErrors.message}</span>
            </div>

            <span className="date">A rejoint Groupomania en {date}</span>
          </ProfileSection>
        </ProfileSectionWrapper>
      </ProfileContent>
    </ProfileWrapper>
  )
}

export default Profile
