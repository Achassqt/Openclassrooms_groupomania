import styled from 'styled-components'
import SideBar from '../../components/SideBar'
import CreatePost from '../../components/CreatePost'
import Feed from '../../components/Feed'
// import Widgets from '../../components/Widgets'
// import Search from '../../components/Search'
import Header from '../../components/Header'
import { MdEdit } from 'react-icons/md'
import { Outlet } from 'react-router-dom'
import colors from '../../utils/style/colors'

import { useState, useEffect, useContext } from 'react'
import { Context } from '../../utils/AppContext'
import axios from 'axios'

const HomeWrapper = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  /* overflow-x: hidden; */
  /* background-color: black; */
`

const LeftWrapper = styled.div`
  /* position: relative; */
  min-width: 251px;
  height: 100%;
  /* background-color: black; */
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  z-index: 1;

  @media (max-width: 1150px) and (min-width: 501px) {
    min-width: 88px;
  }

  @media (max-width: 500px) {
    display: none;
    position: absolute;
    /* left: 0; */
    z-index: 2;
  }
`

const CenterWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1.5;
  min-width: 600px;
  /* min-width: 320px; */

  @media (max-width: 768px) {
    min-width: 320px;
    width: 600px;
    max-width: 600px;
  }
`
const CenterContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  border-right: solid 0.5px ${colors.secondary};
  border-left: solid 0.5px ${colors.secondary};

  @media (max-width: 500px) {
    border: none;
  }
`

const RightSideWrapper = styled.div`
  flex-grow: 1;
  @media (max-width: 500px) {
    display: none;
  }
`

const ScrollToTop = styled.div`
  height: 65px;
  width: 65px;
  border-radius: 50%;
  background-color: ${colors.primary};
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 20px;
  bottom: 20px;
  cursor: pointer;

  @media (max-width: 500px) {
    display: flex;
  }

  & > svg {
    color: white;
    font-size: 28px;
  }
`

function Home() {
  const { uid, userRole, isLoading, setIsLoading } = useContext(Context)

  const [userData, setUserData] = useState({})
  const [getUserData, setGetUserData] = useState(true)

  const [posts, setPosts] = useState([])
  const [getPosts, setGetPosts] = useState(true)

  const [onlyUserPosts, setOnlyUserPosts] = useState(false)

  const [userDeleted, setUserDeleted] = useState(false)

  const [sideBarResponsive, setSideBarResponsive] = useState(false)

  useEffect(() => {
    if (uid !== null && getUserData) {
      const getUser = async () => {
        await axios({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
          withCredentials: true,
        })
          .then((res) => {
            console.log(res)
            setUserData(res.data)
          })
          .catch((err) => console.log(err))
        setIsLoading(false)
      }
      getUser()
      setGetUserData(false)
    }
  }, [uid, getUserData, setIsLoading])

  return (
    <Context.Provider
      value={{
        uid,
        userRole,
        userData,
        isLoading,
        setIsLoading,
        setGetUserData,
        userDeleted,
        setUserDeleted,
      }}
    >
      <HomeWrapper>
        <LeftWrapper style={{ display: sideBarResponsive && 'flex' }}>
          <SideBar
            userData={userData}
            posts={posts}
            setOnlyUserPosts={setOnlyUserPosts}
            onlyUserPosts={onlyUserPosts}
            setSideBarResponsive={setSideBarResponsive}
          />
        </LeftWrapper>
        <CenterWrapper>
          <CenterContent>
            <Header
              sideBarResponsive={sideBarResponsive}
              setSideBarResponsive={setSideBarResponsive}
            />
            <CreatePost setGetPosts={setGetPosts} />
            <Feed
              userData={userData}
              getPosts={getPosts}
              setGetPosts={setGetPosts}
              posts={posts}
              setPosts={setPosts}
              onlyUserPosts={onlyUserPosts}
            />
          </CenterContent>
        </CenterWrapper>
        <RightSideWrapper></RightSideWrapper>
        <ScrollToTop
          onClick={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            })
          }}
        >
          <MdEdit />
        </ScrollToTop>
        <Outlet />
      </HomeWrapper>
    </Context.Provider>
  )
}

export default Home
