import { BsStars } from 'react-icons/bs'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  color: white;
  /* backdrop-filter: blur(15px); */
  /* background-color: rgb(0, 0, 0, 0.85); */
  background-color: ${colors.tertiary};
  font-weight: 700;
  font-size: 20px;
  min-height: 53px;
  position: fixed;
  top: 0;
  width: 565px;
  border-right: solid 1px ${colors.secondary};
  z-index: 1;

  & span:last-of-type {
    font-size: 25px;
  }
`

function Header() {
  return (
    <StyledHeader>
      <span>Accueil</span>
      <span>
        <BsStars />
      </span>
    </StyledHeader>
  )
}

export default Header
