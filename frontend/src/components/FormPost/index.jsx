import styled from 'styled-components'
import { ButtonPoster } from '../../utils/style/Button.jsx'
import { BsImage } from 'react-icons/bs'
import { IoCloseOutline } from 'react-icons/io5'
import colors from '../../utils/style/colors'

import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../utils/AppContext.js'

const CreatePostWrapper = styled.div`
  display: flex;
  padding-bottom: 4px;
  padding-top: 8px;
  border-bottom: solid 0.5px ${colors.secondary};
  /* border-right: solid 1px ${colors.secondary};
  border-left: solid 1px ${colors.secondary}; */
`

const CreatePostLeft = styled.div`
  margin-right: 12px;
  padding: 0 0 0 16px;

  img {
    height: 48px;
    width: 48px;
    border-radius: 50%;
    object-fit: cover;

    @keyframes opacity {
      0% {
        opacity: 0;
      }
      40% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`

const CreatePostRight = styled.form`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  width: 100%;
  padding-right: 16px;
  /* margin-top: 2px; */

  .what-new {
    font-size: 20px;
    color: white;
    margin: 0;
    padding: 12px 0;
    cursor: text;
  }

  .post-text {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    background: none;
    color: white;
    resize: none;
    border: none;
    border-bottom: 1px solid ${colors.primary};
    border-radius: 5px 5px 0 0;
    height: 25px;
    padding: 12px 12px;
    outline: none;
    height: 144px;
    background-color: ${colors.hoverTertiary};

    ::placeholder {
      color: white;
    }
  }

  .text-error {
    color: #ed0000;
  }

  .image-error {
    margin-top: 10px;
    color: #ed0000;
  }
`

const CreatePostImage = styled.div`
  /* margin-top: 14px; */
  position: relative;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 20px;

  /* box-sizing: border-box; */

  img {
    margin-top: 14px;
    /* border: 1px solid grey; */
    border-radius: 16px;
    /* min-width: 400px;
    max-width: 505px; */
    width: 100%;
    height: auto;
    max-height: 600px;
    outline: solid ${colors.secondary} 1px;
    object-fit: cover;
  }

  .edit-image {
    position: absolute;
    margin-top: 14px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    & > div {
      margin-left: 5px;
      margin-top: 5px;
      color: white;
      padding: 2px;
      box-sizing: border-box;
      height: 32px;
      width: 32px;
      background-color: ${colors.primary}99;
      border-radius: 50%;
      cursor: pointer;

      :hover {
        background-color: ${colors.hoverPrimary};
      }

      & > svg {
        width: 100%;
        height: 100%;
      }
    }
    & > label {
      align-self: flex-end;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: 700;
      border-radius: 9999px;
      margin-bottom: 39px;
      margin-right: 5px;
      height: 32px;
      width: 73px;
      background-color: ${colors.primary}99;
      cursor: pointer;

      :hover {
        background-color: ${colors.hoverPrimary};
      }
    }
  }
`

const CreatePostBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  margin-top: 12px;

  label {
    color: ${colors.primary};
    width: 40px;
    height: 40px;
    margin: -8px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: pointer;

    :hover {
      background-color: ${colors.hoverPrimary}30;
    }
  }

  ${ButtonPoster} {
    width: 100px;
    height: 36px;
    font-weight: 700;
    margin-left: 12px;
  }
`

function FormPost({
  postHandleSubmit,
  commentHandleSubmit,

  setMessage,

  postPicture,
  setPostPicture,
  setFile,

  postForm,
  //   setPostForm,

  commentForm,
  setCommentForm,
}) {
  const { userData, uid, isLoading } = useContext(Context)

  const [createPost, setCreatePost] = useState(false)

  const [isActive, setIsActive] = useState(false)

  const [textError, setTextError] = useState(false)

  const [imageError, setImageError] = useState(false)

  const handlePicture = (e) => {
    const file = e.target.files[0]
    if (file.size > 5000000) {
      setFile('')
      setPostPicture('')
      setImageError(true)
    } else {
      setPostPicture(URL.createObjectURL(file))
      setFile(e.target.files[0])
      setImageError(false)
    }
  }

  const cancelPost = () => {
    if (postForm) {
      setMessage('')
      setPostPicture('')
      setFile('')
      setCreatePost(false)
      setImageError(false)
    } else {
      setMessage('')
      setCreatePost(false)
      if (commentForm === false) {
        setCommentForm(true)
        setIsActive(false)
      }
    }
    setTextError(false)
  }

  const textFocus = useRef()

  useEffect(() => {
    if (createPost === true) {
      textFocus.current.value = ''
      textFocus.current.focus()
    }
  }, [createPost])

  return (
    <CreatePostWrapper style={{ padding: commentForm && '12px 0' }}>
      <CreatePostLeft
        style={{
          display: commentForm ? 'flex' : isActive && 'block',
          alignItems: commentForm && 'center',
        }}
      >
        {uid || isLoading ? (
          <img
            style={{
              scale: isLoading ? '0' : '1',
              animation: isLoading === false && 'opacity 500ms ease-in-out',
            }}
            src={userData.imageUrl}
            alt="pp"
          />
        ) : null}
      </CreatePostLeft>
      <CreatePostRight
        onSubmit={(e) => {
          if (postForm) {
            postHandleSubmit(e)
            cancelPost()
          } else {
            commentHandleSubmit(e)
            cancelPost()
          }
        }}
        style={{
          flexDirection: commentForm && 'row',
          alignItems: commentForm && 'center',
          justifyContent: commentForm && 'space-between',
        }}
      >
        <p
          onClick={() => {
            setCreatePost(true)
            // document.querySelector('.post-text').focus()
            // document.querySelector('.post-text').value = ''
            if (commentForm) {
              setCommentForm(false)
              setIsActive(true)
            }
          }}
          style={{
            display: createPost === false ? 'block' : 'none',
            flex: commentForm && '1',
          }}
          className="what-new"
        >
          {postForm ? 'Quoi de neuf ?' : 'Poster votre réponse.'}
        </p>
        <textarea
          ref={textFocus}
          onChange={(e) => {
            setMessage(e.target.value)
            if (e.target.value.length === 400) {
              setTextError(true)
            } else setTextError(false)
          }}
          style={{
            transform: createPost ? 'scale(1)' : 'scale(0)',
            position: createPost === false && 'absolute',
          }}
          placeholder="Quoi de neuf ?"
          maxlength="400"
          spellCheck="false"
          className="post-text"
        />
        {textError && (
          <span className="text-error">
            Nombre de caractères maximal 400/400
          </span>
        )}
        {postPicture && (
          <CreatePostImage>
            <img src={postPicture} alt="post-pic" />
            <div className="edit-image">
              <div
                onClick={() => {
                  setFile('')
                  setPostPicture('')
                }}
              >
                <IoCloseOutline />
              </div>
              <label htmlFor="input-preview-image">
                Editer
                <input
                  id="input-preview-image"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={handlePicture}
                  style={{ display: 'none' }}
                ></input>
              </label>
            </div>
          </CreatePostImage>
        )}
        {imageError && (
          <span className="image-error">Taille d'image maximal: 5MB</span>
        )}
        <CreatePostBottom
          style={{ justifyContent: commentForm === false && 'flex-end' }}
        >
          {commentForm || commentForm === false ? null : (
            <label htmlFor="input-image">
              <BsImage />
              <input
                id="input-image"
                name="file"
                type="file"
                accept="image/*"
                onChange={handlePicture}
                style={{ display: 'none' }}
              ></input>
            </label>
          )}

          <div>
            {createPost || postPicture || imageError ? (
              <ButtonPoster
                type="button"
                onClick={() => {
                  cancelPost()
                  // if (commentForm === false) {
                  //   setCommentForm(true)
                  //   setIsActive(false)
                  // }
                }}
              >
                Annuler
              </ButtonPoster>
            ) : null}
            <ButtonPoster type="submit">Poster</ButtonPoster>
          </div>
        </CreatePostBottom>
      </CreatePostRight>
    </CreatePostWrapper>
  )
}

export default FormPost
