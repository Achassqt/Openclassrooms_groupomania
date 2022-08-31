import styled from 'styled-components'
import colors from '../../utils/style/colors'

import { IoCloseOutline } from 'react-icons/io5'
import iconGroupomania from '../../assets/icon-groupomania.png'

import { Button } from '../../utils/Button'
import { Link } from 'react-router-dom'

const LogWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 320px;
  height: 100%;
  width: 100%;
  background-color: ${colors.hoverTertiary}99;
`

const LogContent = styled.article`
  background-color: ${colors.tertiary};
  height: 650px;
  min-height: 300px;
  max-height: 90vh;
  width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 17px;
  outline: 1px solid ${colors.secondary};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 704px) {
    outline: none;
    height: 100%;
    max-height: 100%;
    width: 100%;
    min-height: 0px;
    border-radius: 0;
  }

  & > header {
    /* background-color: green; */
    position: sticky;
    border-radius: 17px 17px 0 0;
    color: white;
    width: 100%;
    min-height: 53px;
    height: 53px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 704px) {
      position: relative;
    }

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

const LogSectionWrapper = styled.div`
  overflow: auto;
  height: 100%;

  @media (max-width: 704px) {
    overflow: auto;
  }
`

const LogSection = styled.section`
  width: 370px;
  margin: 0 auto;
  padding: 0 32px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  box-sizing: border-box;

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

        :focus {
          outline: 1px solid ${colors.secondary};
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
  const logInput = props.logInput

  return (
    <LogWrapper>
      <LogContent>
        <header>
          <Link to="/">
            <IoCloseOutline />
          </Link>
          <img src={iconGroupomania} alt="fezf" />
        </header>
        <LogSectionWrapper>
          <LogSection>
            <h2>{props.title}</h2>
            <form onSubmit={props.handleFunction}>
              {logInput.map((data, index) => (
                <div className="input-container" key={index}>
                  <input
                    type={data.type}
                    name={data.name}
                    placeholder={data.placeholder}
                    onChange={data.onChange}
                    value={data.value}
                    spellCheck="false"
                  ></input>
                  <div className="email error">{data.error}</div>
                </div>
              ))}
              <Button type="submit">{props.btnName}</Button>
            </form>

            <span>
              {props.question} <Link to={props.link}>{props.linkName}</Link>
            </span>
          </LogSection>
        </LogSectionWrapper>
      </LogContent>
    </LogWrapper>
  )
}

export default Log
