import styled from 'styled-components'
import SideBar from '../../components/SideBar'
import CreatePost from '../../components/CreatePost'
import Feed from '../../components/Feed'
// import Widgets from '../../components/Widgets'
// import Search from '../../components/Search'
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom'
// import colors from '../../utils/style/colors'

import { useState, useEffect, useContext } from 'react'
import { Context } from '../../utils/AppContext'
import axios from 'axios'

const HomeWrapper = styled.div`
  height: 100vh;
  display: flex;
  /* background-color: black; */
  overflow-y: auto;
`

const StyledMain = styled.main`
  display: flex;
  width: 71%;
  margin-top: 53px;
`

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const RightSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

function Home() {
  const { uid } = useContext(Context)
  const [userData, setUserData] = useState({})
  const [allUsersData, setAllUsersData] = useState({})

  const [getUserData, setGetUserData] = useState(true)
  const [getAllUsersData, setGetAllUsersData] = useState(true)

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

  useEffect(() => {
    if (getAllUsersData) {
      const getAllUsers = async () => {
        await axios({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}api/user/`,
          withCredentials: true,
        })
          .then((res) => {
            console.log(res)
            setAllUsersData(res.data)
          })
          .catch((err) => console.log(err))
      }
      getAllUsers()
      setGetAllUsersData(false)
    }
  }, [getAllUsersData])

  return (
    <Context.Provider
      value={{
        uid,
        userData,
        allUsersData,
        setGetUserData,
        setGetAllUsersData,
      }}
    >
      <HomeWrapper>
        <SideBar />
        <StyledMain>
          <CenterWrapper>
            <Header />
            <CreatePost />
            <Feed />
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
