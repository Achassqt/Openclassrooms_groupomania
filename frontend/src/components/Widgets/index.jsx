import styled from 'styled-components'
// import { FiSearch } from 'react-icons/fi'

const WidgetsWrapper = styled.div`
  /* background-color: red; */
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */

  /* & header {
    position: sticky;
    top: 0;
    min-height: 53px;
    backdrop-filter: blur(15px);
    background-color: rgb(0, 0, 0, 0.85);
    padding-left: 30px;

    .header-content {
      background-color: #202327;
      border-radius: 25px;
      width: 350px;
      margin-top: 4px;
      display: flex;

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
        background-color: #202327;
        color: grey;
        padding: 12px;
        /* padding-left: 7px; */
  /* flex: 1;
        border: none;
        border-radius: 0 25px 25px 0;
        font-size: 15px;

        &:focus {
          outline: none;
        }
      }
    }
  }  */

  .widget-content {
    background-color: #202327;
    border-radius: 15px;
    height: 700px;
    width: 350px;
    margin-left: 30px;
    margin-top: 7px;
  }
`

function Widgets() {
  return (
    <WidgetsWrapper>
      {/* <header>
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
      </header> */}
      <div className="widget-content"></div>
    </WidgetsWrapper>
  )
}

export default Widgets
