import { useContext } from 'react'
import { BsStars, BsList } from 'react-icons/bs'
import styled from 'styled-components'
import { Context } from '../../utils/AppContext'
import colors from '../../utils/style/colors'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  color: white;
  backdrop-filter: blur(5px);
  background-color: ${colors.tertiary}99;
  font-weight: 700;
  font-size: 20px;
  min-height: 53px;
  position: sticky;
  top: 0;
  box-sizing: border-box;
  /* border-left: solid 1px ${colors.secondary};
  border-right: solid 1px ${colors.secondary}; */
  z-index: 1;

  & > div {
    display: flex;
    align-items: center;

    & > svg {
      display: none;
      font-size: 25px;
      margin-right: 35px;
      cursor: pointer;

      @media (max-width: 500px) {
        display: block;
      }
    }
  }

  .stars {
    font-size: 25px;
  }
`

function Header({ setSideBarResponsive }) {
  return (
    <StyledHeader>
      <div>
        <BsList onClick={() => setSideBarResponsive(true)} />
        <span>Accueil</span>
      </div>
      <span className="stars">
        <BsStars />
      </span>
    </StyledHeader>
  )
}

export default Header
