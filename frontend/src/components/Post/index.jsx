import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { TbMessageCircle2 } from 'react-icons/tb'

import Comment from '../Comment'
import Like from '../Like'
import Modal from '../../utils/style/Modal'
import { ButtonPoster } from '../../utils/style/Button'

import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Context } from '../../utils/AppContext'

const FeedPost = styled.li`
  display: flex;
  border-bottom: solid 1px ${colors.secondary};
  border-right: solid 1px ${colors.secondary};
  border-left: solid 1px ${colors.secondary};
  padding: 0 16px;
  padding-top: 12px;
  box-sizing: border-box;
`

const FeedPostLeft = styled.div`
  margin-right: 13px;

  img {
    height: 48px;
    width: 48px;
    border-radius: 50%;
  }
`

const FeedPostRight = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 12px;
  max-width: 505px;
`

const FeedPostHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 15px;
  padding-bottom: 4px;
  /* height: 22px; */

  .header-left {
    .user-pseudo {
      font-weight: 700;
    }

    .post-created-at {
      margin-left: 10px;
      color: ${colors.secondary};
      font-weight: 300;
      font-size: 14px;
    }
  }

  .edit-post {
    font-size: 1.25em;
    width: 30px;
    height: 30px;
    margin: -8px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      color: ${colors.secondary};
      /* background-color: ${colors.hoverPrimary}30; */
      background-color: ${colors.hoverTertiary};
    }
  }

  .close-edit-post {
    font-size: 1.5em;
    width: 27px;
    height: 27px;
    margin: -8px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      color: ${colors.secondary};
      /* background-color: ${colors.hoverPrimary}30; */
      background-color: ${colors.hoverTertiary};
    }
  }

  .modal-container {
    /* background-color: blue; */
    background-color: ${colors.tertiary};
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    box-shadow: 0 0 5px ${colors.secondary};

    .close-modal {
      cursor: pointer;
      font-size: 1.6em;
      padding-bottom: 10px;
      border-bottom: 1px solid ${colors.secondary};

      & > svg {
        position: relative;
        left: -3px;
        top: 8px;
        margin-left: 16px;

        :hover {
          background-color: ${colors.hoverTertiary};
          border-radius: 50%;
        }
      }
    }

    .edit {
      display: flex;
      align-items: center;
      padding: 16px;
      border-radius: 12px 12px 0 0;
      cursor: pointer;

      :hover {
        background-color: ${colors.hoverTertiary};
        color: ${colors.secondary};
      }

      & > div {
        display: flex;
        align-items: center;
        font-size: 1.25em;
        margin-right: 12px;
      }

      & > span {
        text-align: baseline;
      }
    }

    .delete {
      display: flex;
      align-items: center;
      padding: 16px;
      border-radius: 0 0 12px 12px;
      cursor: pointer;

      :hover {
        background-color: ${colors.hoverTertiary};
        color: ${colors.primary};
      }

      & > div {
        display: flex;
        align-items: center;
        font-size: 1.25em;
        margin-right: 12px;
      }

      & > span {
        text-align: baseline;
      }
    }
  }
`

const FeedPostText = styled.div`
  color: white;
  font-size: 15px;
  margin-top: 3px;

  .post-text {
    margin: 0;
    overflow-wrap: break-word;
  }

  .edit-text {
    font-family: 'Roboto', sans-serif;
    resize: none;
    overflow: auto;
    display: inline-block;
    width: 100%;
    height: 144px;
    font-size: 15px;
    color: white;
    padding: 10px;
    background-color: ${colors.hoverTertiary};
    border-bottom: 1px solid ${colors.primary};
    border-radius: 5px 5px 0 0;
    /* border-radius: 16px; */
    box-sizing: border-box;

    :focus {
      outline: none;
    }
  }

  .edit-btn {
    font-size: 15px;
    padding: 5px 16px;
    margin-top: 5px;
  }
`

const FeedPostImage = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: flex-start;
  /* box-sizing: border-box; */

  img {
    /* border: 1px solid grey; */
    border-radius: 16px;
    min-width: 400px;
    max-width: 505px;
    height: auto;
    outline: solid ${colors.secondary} 1px;
    /* object-fit: cover; */
  }
`

const FeedPostIcons = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.25em;
  font-weight: 300;
  margin-top: 15px;
  width: 170px;
  color: ${colors.secondary};

  .post-icon-container {
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

    & > span {
      font-size: 15px;
      padding: 0 12px;
    }
  }
`

const CommentsContainer = styled.ul`
  margin: 0;
  padding: 0;
  border-right: solid 1px ${colors.secondary};
  border-left: solid 1px ${colors.secondary};
  border-bottom: double 2px ${colors.secondary};
  padding: 12px 16px;
  padding-bottom: 0;

  & > :first-child {
    padding-top: 0;
  }

  & > :last-child {
    border: none;
  }
`

function Post({ post }) {
  const { setGetPosts, uid } = useContext(Context)
  const [showComments, setShowComments] = useState(false)

  const [usersData, setUsersData] = useState({})
  const [getAllUsersData, setGetAllUsersData] = useState(true)

  const [editPost, setEditPost] = useState(false)
  const [textEdit, setTextEdit] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/post/${post._id}`,
      data: {
        message: textEdit,
      },
    })
      .then(() => {
        setEditPost(false)
        setGetPosts(true)
      })
      .catch((err) => console.log(err))
  }

  const deletePost = () => {
    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/post/${post._id}`,
    })
      .then(() => {
        setEditPost(false)
        setGetPosts(true)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (getAllUsersData) {
      const getAllUsers = async () => {
        await axios({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}api/user/`,
          withCredentials: true,
        })
          .then((res) => {
            console.log(res)
            setUsersData(res.data)
          })
          .catch((err) => console.log(err))
      }
      getAllUsers()
      setGetAllUsersData(false)
    }
  }, [getAllUsersData])

  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    )
  }

  const dateParser = (num) => {
    let options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }

    let timestamp = Date.parse(num)

    let date = new Date(timestamp).toLocaleDateString('fr-FR', options)

    return date.toString()
  }

  return (
    <>
      <FeedPost key={post._id} style={{ borderBottom: showComments && 'none' }}>
        <FeedPostLeft>
          <img
            src={
              !isEmpty(usersData[0]) &&
              usersData
                .map((user) => {
                  if (user._id === post.posterId) return user.imageUrl
                  else return null
                })
                .join('')
            }
            alt="poster-pp"
          />
        </FeedPostLeft>
        <FeedPostRight>
          <FeedPostHeader>
            <div className="header-left">
              <span className="user-pseudo">
                {!isEmpty(usersData[0]) &&
                  usersData.map((user) => {
                    if (user._id === post.posterId) return user.pseudo
                    else return null
                  })}
              </span>
              <span className="post-created-at">
                {dateParser(post.createdAt)}
              </span>
            </div>
            {uid === post.posterId && (
              <Modal
                editPost={editPost}
                setEditPost={setEditPost}
                deletePost={deletePost}
              />
            )}
          </FeedPostHeader>
          <FeedPostText>
            {editPost === false ? (
              <p className="post-text">{post.message}</p>
            ) : (
              <textarea
                onChange={(e) => setTextEdit(e.target.value)}
                defaultValue={post.message}
                // contentEditable
                spellCheck="false"
                className="edit-text"
              />
            )}
            {editPost && (
              <ButtonPoster onClick={handleSubmit} className="edit-btn">
                Modifier
              </ButtonPoster>
            )}
          </FeedPostText>
          <FeedPostImage>
            <img src={post.imageUrl} alt="img" />
          </FeedPostImage>
          <FeedPostIcons>
            <div
              onClick={() => setShowComments(!showComments)}
              className="post-icon-container"
            >
              <div className="icon">
                <TbMessageCircle2 />
              </div>
              <span>{post.comments.length}</span>
            </div>
            <Like post={post} />
          </FeedPostIcons>
        </FeedPostRight>
      </FeedPost>
      <CommentsContainer
        style={{ borderBottom: showComments === false && 'none' }}
      >
        {showComments &&
          post.comments.map((comment) => {
            return (
              <Comment post={post} usersData={usersData} comment={comment} />
            )
          })}
      </CommentsContainer>
    </>
  )
}

export default Post
