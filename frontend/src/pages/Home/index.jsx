import styled from 'styled-components'
import SideBar from '../../components/SideBar'
import CreatePost from '../../components/CreatePost'
import Feed from '../../components/Feed'
// import Widgets from '../../components/Widgets'
// import Search from '../../components/Search'
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom'
import colors from '../../utils/style/colors'

import { useState, useEffect, useContext } from 'react'
import { Context } from '../../utils/AppContext'
import axios from 'axios'

const HomeWrapper = styled.div`
  height: 100vh;
  display: flex;
  /* background-color: black; */
  /* overflow-y: auto; */
`

const StyledMain = styled.main`
  display: flex;
  width: 71%;
  margin-top: 53px;
`

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  /* border-right: solid 1px ${colors.secondary}; */
  /* box-sizing: border-box; */
`

const RightSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 45%; */
  /* border-left: solid 1px ${colors.secondary}; */
  /* background-color: BLACK; */
`

function Home() {
  const { uid, userRole, isLoading, setIsLoading } = useContext(Context)

  const [userData, setUserData] = useState({})
  const [getUserData, setGetUserData] = useState(true)

  const [posts, setPosts] = useState([])
  const [getPosts, setGetPosts] = useState(true)

  const [userDeleted, setUserDeleted] = useState(false)

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
      }
      getUser()
      setGetUserData(false)
    }
  }, [uid, getUserData])

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
        <SideBar userData={userData} posts={posts} />
        <StyledMain>
          <CenterWrapper>
            <Header />
            <CreatePost setGetPosts={setGetPosts} />
            <Feed
              userData={userData}
              getPosts={getPosts}
              setGetPosts={setGetPosts}
              posts={posts}
              setPosts={setPosts}
            />
          </CenterWrapper>
          <RightSideWrapper>
            {/* <Search /> */}
            {/* <Widgets /> */}
          </RightSideWrapper>
        </StyledMain>
        <Outlet />
      </HomeWrapper>
    </Context.Provider>
  )
}

export default Home
