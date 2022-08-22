import styled from 'styled-components'
import colors from './colors'

const Spinner = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid ${colors.secondary};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 0.8s linear infinite;

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
  return <Spinner class="loader"></Spinner>
}

export default Loader
