import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5'
import { ButtonPoster } from '../../utils/style/Button'
import iconGroupomania from '../../assets/icon-groupomania.png'
import colors from '../../utils/style/colors'

const LoginContent = styled.article`
  background-color: ${colors.tertiary};
  height: 650px;
  max-height: 90%;
  width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 17px;
  outline: 1px solid ${colors.secondary};
  display: flex;
  flex-direction: column;
  overflow: auto;

  & > header {
    /* background-color: green; */
    border-radius: 17px 17px 0 0;
    color: white;
    width: 100%;
    min-height: 53px;
    display: flex;
    align-items: center;
    justify-content: center;

    & > a {
      position: absolute;
      left: 8px;
      text-decoration: none;
      color: white;
      padding: 4px;
      height: 28px;
      width: 28px;

      &:hover {
        background-color: ${colors.hoverTertiary};
        border-radius: 50%;
      }

      & > svg {
        width: 100%;
        height: 100%;
      }
    }

    & > img {
      height: 35px;
      width: 35px;
    }
  }
`

const LoginSection = styled.section`
  width: 370px;
  margin: 0 auto;
  padding: 0 32px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-self: center; */
  height: 100%;
  box-sizing: border-box;
  /* overflow: hidden; */

  & > h2 {
    font-size: 31px;
    color: white;
    margin-bottom: 0;
    align-self: flex-start;
    /* margin-bottom: 25px; */
  }

  & > form {
    display: flex;
    flex-direction: column;
    /* margin-bottom: 50px; */

    .input-container {
      & > input {
        background-color: ${colors.tertiary};
        border: 1px ${colors.secondary} solid;
        height: 60px;
        margin-top: 15px;
        border-radius: 5px;
        font-size: 17px;
        color: white;
        padding: 0 10px;
        width: 100%;
        box-sizing: border-box;

        ::placeholder {
          color: white;
        }
      }
    }

    .error {
      color: #ed0000;
    }

    & > button {
      height: 40px;
      margin: 20px 0;
      font-weight: 700;
    }
  }

  & > span {
    color: white;
    font-size: 15px;

    & > a {
      text-decoration: none;
      color: ${colors.primary};
    }
  }
`

function Log(props) {
  const mapForm = props.mapForm

  return (
    <LoginContent>
      <header>
        <Link to="/">
          <IoCloseOutline />
        </Link>
        <img src={iconGroupomania} alt="fezf" />
      </header>
      <LoginSection>
        <h2>{props.title}</h2>
        <form onSubmit={props.handleFunction}>
          {mapForm.map((data, index) => (
            <div className="input-container" key={index}>
              <input
                type={data.type}
                name={data.name}
                placeholder={data.placeholder}
                onChange={data.onChange}
                value={data.value}
              ></input>
              <div
                className="email error"
                dangerouslySetInnerHTML={data.dangerouslySetInnerHTML}
              ></div>
            </div>
          ))}
          <ButtonPoster type="submit">{props.btnName}</ButtonPoster>
        </form>

        <span>
          {props.question} <Link to={props.link}>{props.linkName}</Link>
        </span>
      </LoginSection>
    </LoginContent>
  )
}

export default Log
