import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5'
import { FaRegEdit } from 'react-icons/fa'
import { ButtonPoster } from '../../utils/style/Button'
import colors from '../../utils/style/colors'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../utils/AppContext'
import axios from 'axios'

const ProfileWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(91, 112, 131, 0.4);
  z-index: 1;
`

const ProfileContent = styled.form`
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

      .btn-annuler {
        /* display: none; */
        position: relative;
        left: 60px;
        font-size: 14px;
        font-weight: 700;
        height: 34px;
        width: 100px;
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
  /* padding-bottom: 60px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;

  .images {
    .banner-container {
      height: 230px;
      width: 100%;
      position: relative;

      .banner {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border: 3px solid ${colors.tertiary};
        border-radius: 3px;
        box-sizing: border-box;
      }

      .image-error {
        position: absolute;
        bottom: 3px;
        left: 50%;
        transform: translate(-50%, 0);
        color: #ed0000;
        z-index: 10;
      }

      .edit-banner-container {
        /* background-color: ${colors.hoverTertiary}; */
        background-color: ${colors.hoverTertiary}50;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        border: 3px solid ${colors.tertiary};
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .edit-banner-btn {
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

          & > input {
            display: none;
          }

          .edit-banner-logo {
            width: 22px;
            height: 22px;
            color: white;
          }

          .banner-aria-label {
            background-color: ${colors.primary}80;
            display: none;
            justify-content: center;
            align-items: center;
            position: absolute;
            bottom: -25px;
            width: 100px;
            height: 20px;
            border-radius: 2px;
            font-size: 12px;
            color: white;
          }

          &:hover > .banner-aria-label {
            display: flex;
          }
        }
      }
    }
  }

  /* .banner {
      height: 195px;
      width: 100%;
      object-fit: cover;
      border-left: 1px solid ${colors.tertiary};
      border-right: 1px solid ${colors.tertiary};
      box-sizing: border-box;
    } */

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

    .image-error {
      position: absolute;
      bottom: 5px;
      right: -200px;
      color: #ed0000;
    }

    .edit-picture-container {
      /* background-color: red; */
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

        & > input {
          display: none;
        }

        .edit-picture-logo {
          width: 22px;
          height: 22px;
          color: white;
        }

        .picture-aria-label {
          background-color: ${colors.primary}80;
          display: none;
          justify-content: center;
          align-items: center;
          position: absolute;
          bottom: -23px;
          width: 100px;
          height: 20px;
          border-radius: 2px;
          font-size: 12px;
          color: white;
        }

        &:hover > .picture-aria-label {
          display: flex;
        }
      }
    }
  }

  .date {
    margin: 20px;
  }

  & > input {
    position: relative;
    top: -60px;
    background-color: ${colors.tertiary};
    border: 1px ${colors.secondary} solid;
    height: 60px;
    margin: 0 20px;
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

  .pseudo-error {
    color: #ed0000;
    position: absolute;
    bottom: 30%;
    left: 20px;
  }

  .date {
    margin: 0 20px 30px;
    font-weight: bold;
    color: white;
  }
`

function Profile() {
  const { uid, userData, setGetUserData } = useContext(Context)
  const [hoverStylePicture, setHoverStylePicture] = useState(false)
  const [hoverStyleBanner, setHoverStyleBanner] = useState(false)
  const [pseudo, setPseudo] = useState(userData.pseudo)

  const [profileFile, setProfileFile] = useState(null)
  const [bannerFile, setBannerFile] = useState(null)
  const [profilePreview, setProfilePreview] = useState(null)
  const [bannerPreview, setBannerPreview] = useState(null)

  const [profileErrors, setProfileErrors] = useState({ message: '' })
  const [bannerErrors, setBannerErrors] = useState({ message: '' })
  const [pseudoErrors, setPseudoErrors] = useState({ message: '' })

  // const [image, setImage] = useState()

  function handleProfileFile(e) {
    const file = e.target.files[0]

    if (file.size > 5242880) {
      setProfileFile(null)
      setProfilePreview(null)
      setProfileErrors({ message: "Taille d'image maximal: 5MB" })
      return profileErrors
    } else {
      setProfileFile(file)
      setProfileErrors({ message: '' })
    }
  }

  function handleBannerFile(e) {
    const file = e.target.files[0]

    if (file.size > 5242880) {
      setBannerFile(null)
      setBannerPreview(null)
      setBannerErrors({ message: "Taille d'image maximal: 5MB" })
      return bannerErrors
    } else {
      setBannerFile(file)
      setBannerErrors({ message: '' })
    }
  }

  useEffect(() => {
    if (profileFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePreview(reader.result)
      }
      reader.readAsDataURL(profileFile)
    }
    if (bannerFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBannerPreview(reader.result)
      }
      reader.readAsDataURL(bannerFile)
    }
  }, [profileFile, bannerFile])

  let date = new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
  }).format(userData.timestamps)

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
          setProfilePreview(null)
          setProfileFile(null)
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
          setBannerPreview(null)
          setBannerFile(null)
          setBannerErrors({ message: '' })
          console.log('Bannière modifiée')
        })
        .catch((err) => console.log(err))
    }

    setGetUserData(true)
  }

  return (
    <ProfileWrapper>
      <ProfileContent onSubmit={handleSubmit}>
        <header>
          <Link to="/home">
            <IoCloseOutline />
          </Link>
          <div className="header-right-side">
            <span className="title">Éditer le profil</span>
            <ButtonPoster
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
            </ButtonPoster>
            <ButtonPoster type="submit" className="btn-enregistrer">
              Enregistrer
            </ButtonPoster>
          </div>
        </header>
        <ProfileSection>
          <div className="images">
            {userData.banner ? (
              <div
                onMouseEnter={() => setHoverStyleBanner(true)}
                onMouseLeave={() => setHoverStyleBanner(false)}
                className="banner-container"
              >
                {bannerPreview ? (
                  <>
                    <img
                      src={bannerPreview}
                      className="banner"
                      alt="bannière"
                    />
                    <span className="image-error">{bannerErrors.message}</span>
                  </>
                ) : (
                  <>
                    <img
                      className="banner"
                      src={userData.banner}
                      alt="bannière"
                    />
                    <span className="image-error">{bannerErrors.message}</span>
                  </>
                )}
                <div
                  style={{ display: hoverStyleBanner ? 'block' : 'none' }}
                  className="edit-banner-container"
                >
                  <label htmlFor="banner-preview" className="edit-banner-btn">
                    <FaRegEdit className="edit-banner-logo" />
                    <input
                      id="banner-preview"
                      name="file"
                      type="file"
                      accept="image/*"
                      onChange={handleBannerFile}
                    ></input>
                    <div className="banner-aria-label">Ajouter une photo</div>
                  </label>
                </div>
              </div>
            ) : (
              <div
                className="banner-container"
                onMouseEnter={() => setHoverStyleBanner(true)}
                onMouseLeave={() => setHoverStyleBanner(false)}
              >
                {bannerPreview ? (
                  <>
                    <img
                      src={bannerPreview}
                      className="banner"
                      alt="bannière"
                    />
                    <span className="image-error">{bannerErrors.message}</span>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        backgroundColor: `${colors.secondary}`,
                      }}
                      className="banner"
                    ></div>
                    <span className="image-error">{bannerErrors.message}</span>
                  </>
                )}
                <div
                  style={{ display: hoverStyleBanner ? 'block' : 'none' }}
                  className="edit-banner-container"
                >
                  <label htmlFor="banner-preview" className="edit-banner-btn">
                    <FaRegEdit className="edit-banner-logo" />
                    <input
                      id="banner-preview"
                      name="file"
                      type="file"
                      accept="image/*"
                      onChange={handleBannerFile}
                      // style={{ display: 'block' }}
                    ></input>
                    <div className="banner-aria-label">Ajouter une photo</div>
                  </label>
                </div>
              </div>
            )}

            <div
              className="profile-picture-container"
              onMouseEnter={() => setHoverStylePicture(true)}
              onMouseLeave={() => setHoverStylePicture(false)}
            >
              {profilePreview ? (
                <>
                  <img
                    className="profile-picture"
                    src={profilePreview}
                    alt="pp"
                  />
                  <span className="image-error">{profileErrors.message}</span>
                </>
              ) : (
                <>
                  <img
                    className="profile-picture"
                    src={`${userData.imageUrl}`}
                    alt="pp"
                  />
                  <span className="image-error">{profileErrors.message}</span>
                </>
              )}
              <div
                className="edit-picture-container"
                style={{ display: hoverStylePicture ? 'block' : 'none' }}
              >
                <label
                  htmlFor="profile-picture-preview"
                  className="edit-picture-btn"
                >
                  <FaRegEdit className="edit-picture-logo" />
                  <input
                    id="profile-picture-preview"
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileFile}
                  ></input>
                  <div className="picture-aria-label">Ajouter une photo</div>
                </label>
              </div>
            </div>
          </div>
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

          <span className="date">A rejoint Groupomania en {date}</span>
        </ProfileSection>
      </ProfileContent>
    </ProfileWrapper>
  )
}

export default Profile
