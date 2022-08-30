import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { BsPerson } from 'react-icons/bs'
import {
  IoEllipsisHorizontalSharp,
  IoEllipsisHorizontalCircleOutline,
} from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import { IoCloseOutline } from 'react-icons/io5'
import { Button } from '../../utils/Button.jsx'

import groupomania from '../../assets/icon-left-font-removebg-preview.png'
import groupomaniaresponsive from '../../assets/icon-groupomania.png'

import { Link } from 'react-router-dom'

import { useState, useContext, useEffect } from 'react'
import { Context } from '../../utils/AppContext'
import axios from 'axios'
import cookie from 'js-cookie'

const SideBarContent = styled.nav`
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 251px;

  @media (max-width: 1150px) and (min-width: 501px) {
    width: 64px;
  }

  @media (max-width: 500px) {
    box-sizing: border-box;
    background-color: ${colors.tertiary};
    box-shadow: ${colors.secondary} 0px 0px 5px;
  }
`

const SideBarTop = styled.section`
  display: flex;
  flex-direction: column;

  @media (max-width: 1150px) and (min-width: 501px) {
    align-items: center;
  }

  .logo-close-container {
    display: flex;
    align-items: center;
    .logo-groupomania {
      position: relative;
      right: 33px;
      height: 53px;
      width: 100%;
      margin-bottom: 10px;
      object-fit: cover;
      box-sizing: border-box;

      @media (max-width: 1150px) and (min-width: 501px) {
        display: none;
      }
    }

    & > svg {
      display: none;
      color: white;
      font-size: 1.6em;
      margin-bottom: 13px;
      cursor: pointer;

      @media (max-width: 500px) {
        display: block;
      }
    }
  }

  .logo-groupomania-responsive {
    display: none;
    height: 53px;
    width: 53px;
    margin-top: 10px;
    object-fit: cover;
    box-sizing: border-box;

    @media (max-width: 1150px) and (min-width: 501px) {
      display: block;
    }
  }

  .options {
    padding: 0;
    margin: 0;
    margin-top: 20px;
    list-style: none;
    font-size: 20px;
  }

  .button-tweeter {
    margin-top: 70px;
    width: 225px;
    height: 50px;

    @media (max-width: 1150px) and (min-width: 501px) {
      display: none;
    }
  }

  .button-tweeter-reponsive {
    display: none;
    width: 53px;
    height: 53px;
    border-radius: 50%;
    margin-top: 70px;

    & > svg {
      font-size: 25px;
    }

    @media (max-width: 1150px) and (min-width: 501px) {
      display: block;
    }
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
    font-size: 30px;
  }

  & > span {
    padding-left: 20px;
    margin-right: 2px;

    @media (max-width: 1150px) and (min-width: 501px) {
      display: none;
    }
  }
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
    border-radius: 12px;
    padding: 12px 0;
    color: white;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 0 5px ${colors.secondary};

    @media (max-width: 1150px) {
      left: 0;
      transform: translate(0, -50%);
    }

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
      position: absolute;
      bottom: -14px;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 14px;
      height: 14px;
      box-shadow: 0px 0px 5px ${colors.secondary};

      @media (max-width: 1150px) {
        left: 33px;
      }
    }

    .cache-square {
      background-color: ${colors.tertiary};
      width: 30px;
      height: 12px;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%);

      @media (max-width: 1150px) {
        left: 33px;
        transform: translate(-50%);
      }
    }
  }

  .side-bar-user {
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

        @keyframes opacity {
          0% {
            opacity: 0;
          }
          40% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      }

      & > p {
        margin: 0;
        margin-left: 12px;
        font-weight: 700;

        @media (max-width: 1150px) and (min-width: 501px) {
          display: none;
        }
      }
    }

    .ellipsis {
      font-size: 1.15em;

      @media (max-width: 1150px) and (min-width: 501px) {
        display: none;
      }
    }
  }
`

function SideBar({
  userData,
  posts,
  setOnlyUserPosts,
  onlyUserPosts,
  setSideBarResponsive,
}) {
  const { uid, userRole, setUserDeleted, isLoading, setIsLoading } =
    useContext(Context)

  const [modalOpen, setModalOpen] = useState(false)

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

  //cible les likes d'un utilisateur
  const userLikes = posts.filter((post) => post.likers.includes(uid))

  const unlikeAll = () => {
    userLikes.map((post) => {
      axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API_URL}api/post/unlike/` + post._id,
        data: { id: uid },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    })
  }

  //cible les posts d'un utilisateur
  const userPosts = posts.filter((post) => post.posterId === uid)

  const supprAllUserPosts = () => {
    userPosts.map((post) => {
      axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}api/post/${post._id}`,
        withCredentials: true,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    })
  }

  const suppr = async () => {
    setUserDeleted(true)
    supprAllUserPosts()
    unlikeAll()
    await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      withCredentials: true,
    })
      .then(() => removeCookie('jwt'))
      .catch((err) => console.log(err))

    window.location = '/'
  }

  return (
    <SideBarContent>
      <SideBarTop>
        <div className="logo-close-container">
          <img
            src={groupomania}
            alt="entreprise"
            className="logo-groupomania"
          />
          <IoCloseOutline onClick={() => setSideBarResponsive(false)} />
        </div>
        <img
          src={groupomaniaresponsive}
          alt="entreprise"
          className="logo-groupomania-responsive"
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
          {onlyUserPosts === false ? (
            <StyledLink
              to="/home"
              onClick={() => {
                setOnlyUserPosts(true)
                setIsLoading(true)
              }}
            >
              <SideBarOption>
                <IoEllipsisHorizontalCircleOutline />
                <span>Mes posts</span>
              </SideBarOption>
            </StyledLink>
          ) : (
            <StyledLink
              to="/home"
              onClick={() => {
                setOnlyUserPosts(false)
                setIsLoading(true)
              }}
            >
              <SideBarOption>
                <IoEllipsisHorizontalCircleOutline />
                <span>Tous les posts</span>
              </SideBarOption>
            </StyledLink>
          )}
        </ul>
        <Button
          onClick={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            })
          }}
          className="button-tweeter"
        >
          Poster
        </Button>
        <Button
          onClick={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            })
          }}
          className="button-tweeter-reponsive"
        >
          <MdEdit />
        </Button>
      </SideBarTop>
      {uid ? (
        <SideBarUser>
          <div
            style={{
              display: modalOpen ? 'flex' : 'none',
              top: userRole === 'admin' && '-65px',
            }}
            className="modal-container"
          >
            <IoCloseOutline onClick={toggleModal} className="close-modal" />
            <span onClick={logout} className="logout">
              Se déconnecter
            </span>
            {userRole === 'standard' && (
              <span
                onClick={() => {
                  if (window.confirm('Voulez-vous supprimer votre compte ?')) {
                    suppr()
                  }
                }}
                className="delete"
              >
                Supprimer mon compte
              </span>
            )}
            <div className="square"></div>
            <div className="cache-square"></div>
          </div>
          <div onClick={toggleModal} className="side-bar-user">
            <div className="left-content">
              <img
                style={{
                  scale: isLoading ? '0' : '1',
                  animation: isLoading === false && 'opacity 500ms ease-in-out',
                }}
                src={userPicture}
                alt="pp"
              />
              <p>{userPseudo}</p>
            </div>
            <IoEllipsisHorizontalSharp className="ellipsis" />
          </div>
        </SideBarUser>
      ) : null}
    </SideBarContent>
  )
}

export default SideBar
