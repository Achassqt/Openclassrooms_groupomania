import styled from 'styled-components'
import colors from './style/colors'

const Spinner = styled.span`
  width: 35px;
  height: 35px;
  border: 4px solid ${colors.secondary};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 600ms linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

function Loader() {
  return <Spinner></Spinner>
}

export default Loader
