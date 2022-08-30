import styled from 'styled-components'
import colors from '../../utils/style/colors'

import { FaRegEdit } from 'react-icons/fa'
import { useContext } from 'react'
import { Context } from '../../utils/AppContext'

const ImagesContainer = styled.div`
  padding-bottom: 40px;
  box-sizing: border-box;

  .banner-container {
    height: 230px;
    min-height: 180px;
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

      @media (max-width: 500px) {
        top: 3px;
      }
    }

    .edit-banner-container {
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
      object-fit: cover;
    }

    .image-error {
      position: absolute;
      bottom: 5px;
      right: -200px;
      color: #ed0000;

      @media (max-width: 374px) {
        bottom: -28px;
        right: -100px;
        left: 0;
      }
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
`

function ProfileImages({
  hoverStylePicture,
  setHoverStylePicture,
  hoverStyleBanner,
  setHoverStyleBanner,
  handleProfileFile,
  handleBannerFile,
  bannerPreview,
  bannerErrors,
  profilePreview,
  profileErrors,
}) {
  const { userData } = useContext(Context)

  return (
    <ImagesContainer>
      {userData.banner ? (
        <div
          onMouseEnter={() => setHoverStyleBanner(true)}
          onMouseLeave={() => setHoverStyleBanner(false)}
          className="banner-container"
        >
          {bannerPreview ? (
            <>
              <img src={bannerPreview} className="banner" alt="bannière" />
              <span className="image-error">{bannerErrors.message}</span>
            </>
          ) : (
            <>
              <img className="banner" src={userData.banner} alt="bannière" />
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
              <img src={bannerPreview} className="banner" alt="bannière" />
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
            <img className="profile-picture" src={profilePreview} alt="pp" />
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
          <label htmlFor="profile-picture-preview" className="edit-picture-btn">
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
    </ImagesContainer>
  )
}

export default ProfileImages
