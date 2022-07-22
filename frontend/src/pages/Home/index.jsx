import styled from 'styled-components'
import SideBar from '../../components/SideBar'
import CreatePost from '../../components/CreatePost'
import Feed from '../../components/Feed'
import Widgets from '../../components/Widgets'
import Search from '../../components/Search'
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom'
// import colors from '../../utils/style/colors'

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
  return (
    <HomeWrapper>
      <SideBar />
      <StyledMain>
        <CenterWrapper>
          <Header />
          <CreatePost />
          <Feed />
        </CenterWrapper>
        <RightSideWrapper>
          <Search />
          <Widgets />
        </RightSideWrapper>
      </StyledMain>
      <Outlet />
    </HomeWrapper>
  )
}

export default Home
