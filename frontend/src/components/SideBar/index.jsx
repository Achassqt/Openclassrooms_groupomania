import { BsPerson } from 'react-icons/bs'
import {
  IoEllipsisHorizontalSharp,
  IoEllipsisHorizontalCircleOutline,
} from 'react-icons/io5'
import white from '../../assets/white.png'
import groupomania from '../../assets/icon-left-font-removebg-preview.png'
import styled from 'styled-components'
import { ButtonPoster } from '../../utils/style/Button.jsx'
import { Link } from 'react-router-dom'
import colors from '../../utils/style/colors'

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
  border-right: solid 1px ${colors.secondary};
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
  width: 100px;

  & > svg {
    font-size: 25px;
  }

  & > span {
    padding-left: 20px;
  }
`

const ButtonTwt = styled(ButtonPoster)`
  margin-top: 70px;
  width: 225px;
  height: 50px;
`

const SideBarUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 12px;
  margin-bottom: 10px;

  :hover {
    background-color: ${colors.hoverTertiary};
    color: ${colors.secondary};
    border-radius: 30px;
  }

  .left-content {
    display: flex;
    align-items: center;
    & > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
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
`

function SideBar() {
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
            <StyledLink to="profile">
              <SideBarOption>
                <BsPerson />
                <span>Profil</span>
              </SideBarOption>
            </StyledLink>
            <StyledLink to="home">
              <SideBarOption>
                <IoEllipsisHorizontalCircleOutline />
                <span>Plus</span>
              </SideBarOption>
            </StyledLink>
          </ul>
          <ButtonTwt className="button-tweeter">Poster</ButtonTwt>
        </SideBarTop>
        <SideBarUser>
          <div className="left-content">
            <img src={white} alt="pp" />
            <p>UserName</p>
          </div>
          <IoEllipsisHorizontalSharp className="ellipsis" />
        </SideBarUser>
      </SideBarContent>
    </SideBarWrapper>
  )
}

export default SideBar
