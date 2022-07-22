import { BsEmojiSmile, BsImage } from 'react-icons/bs'
import styled from 'styled-components'
import white from '../../assets/white.png'
import { ButtonPoster } from '../../utils/style/Button.jsx'
import colors from '../../utils/style/colors'

const CreatePostWrapper = styled.div`
  display: flex;
  padding-bottom: 4px;
  padding-top: 8px;
  border-bottom: solid 1px ${colors.secondary};
  border-right: solid 1px ${colors.secondary};
`

const CreatePostLeft = styled.div`
  margin-right: 12px;
  padding: 0 0 0 16px;

  img {
    height: 48px;
    width: 48px;
    border-radius: 50%;
  }
`

const CreatePostRight = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  width: 100%;
  padding-right: 16px;

  .tweet-box-area {
    position: relative;
    scrollbar-width: none;
    color: white;
    max-width: 501px;
    margin-left: 5px;
    /* min-height: 130px; */
    max-height: 170px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0;
    }
    .placeholder {
      position: absolute;
      height: inherit;
      color: ${colors.secondary};
      pointer-events: none;
      font-size: 20px;
      top: 13px;
      /* padding: 0 10px; */
    }

    .input-editable {
      outline: 1px solid white;
      padding: 13px 0;
      /* padding-left: 10px; */
      height: inherit;
      font-size: 20px;
      outline: none;
      /* width: 100%; */

      /* &:focus {
        background-color: #202327;
        border-radius: 10px;
      } */
    }
  }
`

const CreatePostBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  margin-top: 12px;

  div {
    color: ${colors.primary};
    font-size: 20px;
    display: flex;
    justify-content: space-between;

    & > svg {
      padding: 0 8px;
    }
  }

  ${ButtonPoster} {
    width: 91px;
    height: 36px;
    font-size: 16px;
    font-weight: 700;
  }
`

function CreatePost() {
  // const placeHolder = document.querySelector('.placeholder')
  // const input = document.querySelector('.input-editable')
  // function displayNone() {
  //   const inputLength = input.textContent.length
  //   if (inputLength > 0) {
  //     placeHolder.style.display = 'none'
  //   } else {
  //     placeHolder.style.display = 'block'
  //   }
  //   // placeHolder.style.display = 'none'
  // }

  return (
    <CreatePostWrapper>
      <CreatePostLeft>
        <img src={white} alt="pp" />
      </CreatePostLeft>
      <CreatePostRight>
        {/* <input type="text" placeholder="Quoi de neuf ?"></input> */}
        <div className="tweet-box-area">
          <span className="placeholder">Quoi de neuf ?</span>
          <div
            className="input-editable"
            contentEditable="true"
            spellcheck="false"
            // onKeyUp={() => displayNone()}
          ></div>
        </div>
        <CreatePostBottom>
          <div>
            <BsImage />
            <BsEmojiSmile />
          </div>
          <ButtonPoster>Poster</ButtonPoster>
        </CreatePostBottom>
      </CreatePostRight>
    </CreatePostWrapper>
  )
}

export default CreatePost
