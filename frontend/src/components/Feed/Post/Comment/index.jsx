import styled from 'styled-components'
import colors from '../../../../utils/style/colors'

import Modal from '../../../../utils/Modal'

import { useContext, useState, useEffect } from 'react'
import { Context } from '../../../../utils/AppContext'
import axios from 'axios'

const CommentContainer = styled.li`
  display: flex;
  width: 100%;
  padding-top: 12px;
  padding-bottom: 5px;
  border-bottom: solid 1px ${colors.secondary};
  box-sizing: border-box;

  .left-part {
    margin-right: 13px;

    img {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .right-part {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`

const CommentHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 15px;

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
`

const CommentText = styled.div`
  color: white;
  font-size: 15px;
  margin-top: 3px;

  .post-text {
    overflow-wrap: break-word;
  }
`

function Comments({ post, usersData, comment }) {
  const { uid, userRole, setGetPosts, userDeleted } = useContext(Context)

  const [editComment, setEditComment] = useState(false)

  const [oldUser, setOldUser] = useState(false)

  useEffect(() => {
    if (userDeleted) {
      const getUser = async () => {
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}api/user/${comment.commenterId}`,
          withCredentials: true,
        })
          .then((res) => {
            console.log(res)
            // si l'utilisateur n'existe pas on change l'état de OldUser si non on stock les informations
            res.data === '' && setOldUser(true)
          })
          .catch((err) => console.log(err))
      }
      getUser()
    }
  }, [comment.commenterId, userDeleted])

  // useEffect qui supprime les commentaires d'un utilisateur supprimé
  useEffect(() => {
    oldUser && deleteComment()
  }, [oldUser])

  const deleteComment = () => {
    axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/post/delete-comment/${post._id}`,
      data: {
        commentId: comment._id,
      },
      withCredentials: true,
    })
      .then(() => {
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

  return (
    <CommentContainer id="test">
      <div className="left-part">
        <img
          src={
            !isEmpty(usersData) &&
            usersData
              .map((user) => {
                if (user._id === comment.commenterId) return user.imageUrl
                else return null
              })
              .join('')
          }
          alt="commenter-pp"
        />
      </div>
      <div className="right-part">
        <CommentHeader>
          <div className="header-left">
            <span className="user-pseudo">
              {!isEmpty(usersData) &&
                usersData.map((user) => {
                  if (user._id === comment.commenterId) return user.pseudo
                  else return null
                })}
            </span>
            <span className="post-created-at">
              {dateParser(post.createdAt)}
            </span>
          </div>
          {uid === comment.commenterId || userRole === 'admin' ? (
            <Modal
              editComment={editComment}
              setEditComment={setEditComment}
              deleteComment={deleteComment}
            />
          ) : null}
        </CommentHeader>
        <CommentText>
          <span>{comment.text}</span>
        </CommentText>
      </div>
    </CommentContainer>
  )
}

export default Comments
