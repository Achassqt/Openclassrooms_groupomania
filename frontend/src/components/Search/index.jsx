import { FiSearch } from 'react-icons/fi'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  right: 1;
  min-height: 53px;
  /* width: 100%; */
  /* backdrop-filter: blur(15px); */
  background-color: ${colors.tertiary};
  /* background-color: rgb(0, 0, 0, 0.85); */
  .header-content {
    border-radius: 20px;
    width: 350px;
    margin-top: 4px;
    display: flex;
    margin-left: 30px;

    & label {
      width: 32px;
      display: flex;
      align-items: center;
      padding-left: 12px;
      justify-content: center;
      font-size: 19px;
      color: grey;
    }

    & input {
      background-color: ${colors.secondary};
      color: grey;
      padding: 12px;
      /* padding-left: 7px; */
      flex: 1;
      border: none;
      border-radius: 0 25px 25px 0;
      font-size: 15px;

      &:focus {
        outline: none;
      }
    }
  }
`

function Search() {
  return (
    <StyledHeader>
      <div className="header-content">
        <label htmlFor="search">
          <FiSearch />
        </label>
        <input
          placeholder="Recherche Twitter"
          type="text"
          name="search"
          id="search"
        />
      </div>
    </StyledHeader>
  )
}

export default Search
