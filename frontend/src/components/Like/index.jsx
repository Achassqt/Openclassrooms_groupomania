import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useState, useEffect, useContext } from 'react'
import { Context } from '../../utils/AppContext'
import axios from 'axios'

const LikeContainer = styled.div`
  display: flex;
  align-items: flex-end;
  cursor: pointer;

  :hover {
    color: ${colors.primary};
  }

  :hover > .icon {
    background-color: ${colors.hoverPrimary}30;
  }

  .icon {
    width: 36px;
    height: 36px;
    margin: -8px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .animation {
    @keyframes scale {
      0% {
        transform-origin: 50% 100%;
        transform: scale(0);
      }

      50% {
        transform: scale(0.5);
      }

      100% {
        transform: scale(1);
      }
    }

    animation: 0.4s ease-out scale;
  }

  & > span {
    font-size: 15px;
    margin: 0 12px;
  }
`

function Like({ post }) {
  const { uid, setGetPosts } = useContext(Context)
  const [liked, setLiked] = useState(false)

  const like = () => {
    axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/post/like/${post._id}`,
      data: { id: uid },
    })
      .then(() => {
        setLiked(true)
        setGetPosts(true)
      })
      .catch((err) => console.log(err))
  }

  const unlike = () => {
    axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/post/unlike/` + post._id,
      data: { id: uid },
    })
      .then(() => {
        setLiked(false)
        setGetPosts(true)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true)
    else setLiked(false)
  }, [uid, post.likers, liked])

  return (
    <LikeContainer>
      {uid && liked === false ? (
        <>
          <div onClick={like} className="icon">
            <AiOutlineHeart />
          </div>
          <span>{post.likers.length}</span>
        </>
      ) : (
        <>
          <div
            onClick={unlike}
            className="icon"
            style={{ color: `${colors.primary}` }}
          >
            <AiFillHeart className="animation" />
          </div>
          <span style={{ color: `${colors.primary}` }}>
            {post.likers.length}
          </span>
        </>
      )}
    </LikeContainer>
  )
}

export default Like
