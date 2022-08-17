import { BsPerson } from 'react-icons/bs'
import {
  IoEllipsisHorizontalSharp,
  IoEllipsisHorizontalCircleOutline,
} from 'react-icons/io5'
import groupomania from '../../assets/icon-left-font-removebg-preview.png'
import { IoCloseOutline } from 'react-icons/io5'
import styled from 'styled-components'
import { ButtonPoster } from '../../utils/style/Button.jsx'
import { Link } from 'react-router-dom'
import colors from '../../utils/style/colors'
import { useState, useContext, useEffect } from 'react'
import { Context } from '../../utils/AppContext'
import axios from 'axios'
import cookie from 'js-cookie'

const SideBarWrapper = styled.div`
  width: 29%;
  height: 100%;
  /* background-color: black; */
  display: flex;
  justify-content: flex-end;
  top: 0;
  left: 0;
`

const SideBarContent = styled.nav`
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  bottom: 0;
  /* border-right: solid 1px ${colors.secondary}; */
`

const SideBarTop = styled.section`
  .logo-groupomania {
    position: relative;
    right: 33px;
    height: 53px;
    width: 100%;
    margin-bottom: 10px;
    object-fit: cover;
    box-sizing: border-box;
  }

  .options {
    width: 251px;
    padding: 0;
    margin: 0;
    margin-top: 20px;
    list-style: none;
    /* color: white; */
    font-size: 20px;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;

  &:hover > li {
    background-color: ${colors.hoverTertiary};
    color: ${colors.secondary};
    border-radius: 30px;
  }
`

const SideBarOption = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 16px;
  width: max-content;

  & > svg {
    font-size: 25px;
  }

  & > span {
    padding-left: 20px;
    margin-right: 2px;
  }
`

const ButtonTwt = styled(ButtonPoster)`
  margin-top: 70px;
  width: 225px;
  height: 50px;
`

const SideBarUser = styled.div`
  position: relative;

  .modal-container {
    background-color: ${colors.tertiary};
    position: absolute;
    top: -90px;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 290px;
    /* height: 120px; */
    border-radius: 12px;
    padding: 12px 0;
    color: white;
    /* display: flex; */
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 0 5px ${colors.secondary};

    .close-modal {
      cursor: pointer;
      font-size: 1.6em;
      position: relative;
      left: -6px;
      top: -4px;
      margin-left: 16px;
      margin-bottom: 4px;

      :hover {
        background-color: ${colors.hoverTertiary};
        border-radius: 50%;
      }
    }

    .logout {
      padding: 16px;
      border-top: 1px solid ${colors.secondary};
      cursor: pointer;

      :hover {
        background-color: ${colors.hoverTertiary};
        color: ${colors.secondary};
      }
    }

    .delete {
      padding: 16px;
      cursor: pointer;

      :hover {
        background-color: ${colors.hoverTertiary};
        color: ${colors.primary};
      }
    }

    .square {
      background-color: ${colors.tertiary};
      /* background-color: red; */
      position: absolute;
      bottom: -14px;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 14px;
      height: 14px;
      box-shadow: 0px 0px 5px ${colors.secondary};
    }

    .cache-square {
      background-color: ${colors.tertiary};
      width: 30px;
      height: 12px;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%);
    }
  }

  .side-bar-user {
    /* background-color: none; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 12px;
    height: 64px;
    box-sizing: border-box;
    margin-bottom: 10px;
    cursor: pointer;

    :hover {
      background-color: ${colors.hoverTertiary};
      color: ${colors.secondary};
      border-radius: 30px;
      border: none;
    }

    :focus {
      background-color: ${colors.tertiary};
    }

    .left-content {
      display: flex;
      align-items: center;
      & > img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      & > p {
        margin: 0;
        margin-left: 12px;
        font-weight: 700;
      }
    }

    .ellipsis {
      font-size: 1.15em;
    }
  }
`

function SideBar({ userData }) {
  const { uid } = useContext(Context)
  const [modalOpen, setModalOpen] = useState(false)
  // const profilePage = (document.lacation = '/home/page')
  // const [userData, setUserData] = useState({})
  const [userPseudo, setUserPseudo] = useState()
  const [userPicture, setUserPicture] = useState()

  useEffect(() => {
    setUserPseudo(userData.pseudo)
    setUserPicture(userData.imageUrl)
  }, [userData.imageUrl, userData.pseudo])

  function toggleModal() {
    setModalOpen(!modalOpen)
  }

  const removeCookie = (key) => {
    cookie.remove(key, { expires: 1 })
  }

  const logout = async () => {
    await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie('jwt'))
      .catch((err) => console.log(err))

    window.location = '/'
  }

  return (
    <SideBarWrapper>
      <SideBarContent>
        <SideBarTop>
          <img
            src={groupomania}
            alt="entreprise"
            className="logo-groupomania"
          />
          <ul className="options">
            {uid ? (
              <StyledLink to="profile">
                <SideBarOption>
                  <BsPerson />
                  <span>Profil</span>
                </SideBarOption>
              </StyledLink>
            ) : (
              <StyledLink to="/">
                <SideBarOption>
                  <BsPerson />
                  <span>Se connecter</span>
                </SideBarOption>
              </StyledLink>
            )}
            <StyledLink to="home">
              <SideBarOption>
                <IoEllipsisHorizontalCircleOutline />
                <span>Plus</span>
              </SideBarOption>
            </StyledLink>
          </ul>
          <ButtonTwt className="button-tweeter">Poster</ButtonTwt>
        </SideBarTop>
        {uid ? (
          <SideBarUser>
            <div
              style={{ display: modalOpen ? 'flex' : 'none' }}
              className="modal-container"
            >
              <IoCloseOutline onClick={toggleModal} className="close-modal" />
              <span onClick={logout} className="logout">
                Se déconnecter
              </span>
              <span className="delete">Supprimer mon compte</span>
              <div className="square"></div>
              <div className="cache-square"></div>
            </div>
            <div onClick={toggleModal} className="side-bar-user">
              <div className="left-content">
                <img src={userPicture} alt="pp" />
                <p>{userPseudo}</p>
              </div>
              <IoEllipsisHorizontalSharp className="ellipsis" />
            </div>
          </SideBarUser>
        ) : null}
      </SideBarContent>
    </SideBarWrapper>
  )
}

export default SideBar
