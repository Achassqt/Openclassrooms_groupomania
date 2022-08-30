import styled from 'styled-components'
import colors from '../../../utils/style/colors'
import { TbMessageCircle2 } from 'react-icons/tb'

import Comment from './Comment'
import Like from './Like'
import Modal from '../../../utils/Modal'
import { Button } from '../../../utils/Button'

import { useState, useEffect, useContext, useRef } from 'react'
import axios from 'axios'
import { Context } from '../../../utils/AppContext'
import CreateComment from './CreateComment'

const PostContainer = styled.li`
  display: flex;
  border-bottom: solid 0.5px ${colors.secondary};
  padding: 0 16px;
  padding-top: 12px;
  box-sizing: border-box;
`

const PostLeft = styled.div`
  margin-right: 13px;

  img {
    height: 48px;
    width: 48px;
    border-radius: 50%;
    object-fit: cover;
  }
`

const PostRight = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 12px;
`

const PostHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 15px;
  padding-bottom: 4px;

  .header-left {
    display: flex;

    img {
      margin-right: 13px;
      height: 48px;
      width: 48px;
      border-radius: 50%;
    }

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
      background-color: ${colors.hoverTertiary};
    }
  }

  .modal-container {
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

const PostText = styled.div`
  color: white;
  font-size: 15px;
  margin-top: 3px;

  .post-text {
    margin: 0;
    overflow-wrap: break-word;
    /* word-break: break-all; */
    word-break: break-word;
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
    box-sizing: border-box;

    :focus {
      outline: none;
    }
  }

  .edit-btn {
    /* font-size: 15px; */
    padding: 5px 16px;
    margin-top: 5px;
  }
`

const PostImage = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: flex-start;

  img {
    border-radius: 16px;
    min-width: 224px;
    width: 100%;
    max-height: 600px;
    height: auto;
    outline: solid ${colors.secondary} 1px;
    object-fit: cover;
  }
`

const PostIcons = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.25em;
  font-weight: 300;
  margin-top: 15px;
  width: 170px;
  color: ${colors.secondary};
  box-sizing: border-box;

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
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > :last-child {
    border: none;
  }
`

const Footer = styled.footer`
  width: 100%;
  padding: 16px 0;
  display: flex;
  justify-content: center;
  border-top: solid 0.5px ${colors.secondary};
  border-bottom: double 3px ${colors.secondary};
  cursor: pointer;

  :hover {
    background-color: ${colors.hoverTertiary};
  }

  .close-comments {
    color: ${colors.primary};
    cursor: pointer;

    :hover {
      color: ${colors.hoverPrimary};
    }
  }
`

function Post({ post, usersData }) {
  const { setGetPosts, uid, userRole } = useContext(Context)
  const [showComments, setShowComments] = useState(false)

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
      withCredentials: true,
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
      withCredentials: true,
    })
      .then(() => {
        setEditPost(false)
        setGetPosts(true)
      })
      .catch((err) => console.log(err))
  }

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

  //Focus textarea
  const textFocus = useRef(null)

  useEffect(() => {
    if (editPost === true) {
      textFocus.current.value = ''
      textFocus.current.focus()
      textFocus.current.value = post.message
    }
  }, [editPost, post.message])

  return (
    <>
      <PostContainer
        id="test"
        key={post._id}
        style={{ borderBottom: showComments && 'none' }}
      >
        {showComments === false && (
          <PostLeft>
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
          </PostLeft>
        )}
        <PostRight
          style={{
            width: showComments && '100%',
            paddingBottom: showComments && '0',
          }}
        >
          <PostHeader>
            <div className="header-left">
              {showComments && (
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
              )}
              <div
                style={{
                  display: showComments && 'flex',
                  flexDirection: showComments && 'column',
                  justifyContent: showComments && 'space-around',
                }}
              >
                <span className="user-pseudo">
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user._id === post.posterId) return user.pseudo
                      else return null
                    })}
                </span>
                <span
                  style={{ margin: showComments && '0' }}
                  className="post-created-at"
                >
                  {dateParser(post.createdAt)}
                </span>
              </div>
            </div>
            {uid === post.posterId || userRole === 'admin' ? (
              <div
                style={{
                  position: showComments && 'relative',
                  top: showComments && '-11px',
                }}
              >
                <Modal
                  editPost={editPost}
                  setEditPost={setEditPost}
                  deletePost={deletePost}
                  message={post.message}
                />
              </div>
            ) : null}
          </PostHeader>
          <PostText>
            {editPost === false && (
              <p
                style={{ fontSize: showComments && '23px' }}
                className="post-text"
              >
                {post.message}
              </p>
            )}
            <textarea
              ref={textFocus}
              onChange={(e) => setTextEdit(e.target.value)}
              // defaultValue={post.message}
              style={{
                transform: editPost ? 'scale(1)' : 'scale(0)',
                position: editPost === false && 'absolute',
              }}
              spellCheck="false"
              className="edit-text"
            />
            {editPost && (
              <Button onClick={handleSubmit} className="edit-btn">
                Modifier
              </Button>
            )}
          </PostText>
          {post.imageUrl && (
            <PostImage style={{ justifyContent: showComments && 'center' }}>
              <img
                src={post.imageUrl}
                style={{
                  maxWidth: showComments && '100%',
                  maxHeight: showComments && '600px',
                }}
                alt="img"
              />
            </PostImage>
          )}
          {showComments === false ? (
            <PostIcons>
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
            </PostIcons>
          ) : (
            <PostIcons
              style={{
                width: '100%',
                justifyContent: 'space-evenly',
                margin: '0',
                padding: '10px',
                borderTop: `0.5px solid ${colors.secondary}`,
                borderBottom: `0.5px solid ${colors.secondary}`,
                marginTop: '20px',
              }}
            >
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
            </PostIcons>
          )}
        </PostRight>
      </PostContainer>
      {showComments && (
        <>
          <CreateComment post={post} />
          <CommentsContainer
            style={{ borderBottom: showComments === false && 'none' }}
          >
            {post.comments.map((comment) => {
              return (
                <Comment post={post} usersData={usersData} comment={comment} />
              )
            })}
          </CommentsContainer>
          <Footer onClick={() => setShowComments(false)}>
            <span className="close-comments">Fermer</span>
          </Footer>
        </>
      )}
    </>
  )
}

export default Post
