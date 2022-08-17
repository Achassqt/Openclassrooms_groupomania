import styled from 'styled-components'
import colors from './colors'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { IoEllipsisHorizontalSharp, IoCloseOutline } from 'react-icons/io5'

import { useState } from 'react'

const ModalWrapper = styled.div`
  .edit-post {
    font-size: 1.2em;
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
      background-color: ${colors.hoverPrimary}30;
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
      background-color: ${colors.hoverPrimary}30;
      background-color: ${colors.hoverTertiary};
    }
  }

  .modal-container {
    background-color: blue;
    background-color: ${colors.tertiary};
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    box-shadow: 0 0 5px ${colors.secondary};
    z-index: 1;

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

function Modal({
  editPost,
  setEditPost,
  deletePost,
  editComment,
  setEditComment,
  deleteComment,

  message,
}) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <ModalWrapper>
      <div
        onClick={() => {
          setModalOpen(!modalOpen)
          if (editComment === false) setEditComment(true)
        }}
        style={{ display: editPost && 'none' }}
        className="edit-post"
      >
        <IoEllipsisHorizontalSharp />
      </div>
      {editPost && (
        <div className="close-edit-post">
          <IoCloseOutline onClick={() => setEditPost(false)} />
        </div>
      )}

      <div
        style={{ display: modalOpen ? 'flex' : 'none' }}
        className="modal-container"
      >
        <div className="close-modal">
          <IoCloseOutline
            onClick={() => {
              setModalOpen(!modalOpen)
            }}
          />
        </div>
        <div
          onClick={() => {
            setEditPost(true)
            setModalOpen(!modalOpen)

            document.querySelector('.edit-text').focus()
            document.querySelectorAll('.edit-text').value = message
          }}
          style={{ display: editComment ? 'none' : 'flex' }}
          className="edit"
        >
          <div>
            <AiOutlineEdit />
          </div>
          <span>Modifier</span>
        </div>
        {/* {editComment && ( */}
        <div
          onClick={() => {
            if (editComment) {
              deleteComment()
              setModalOpen(!modalOpen)
            } else deletePost()
            setModalOpen(!modalOpen)
          }}
          className="delete"
        >
          <div>
            <AiOutlineDelete />
          </div>
          <span>Supprimer</span>
        </div>
        {/* )} */}
      </div>
    </ModalWrapper>
  )
}

export default Modal
