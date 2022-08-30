import { useContext, useState } from 'react'
import { Context } from '../../../../utils/AppContext'
import axios from 'axios'

import CreateForm from '../../../CreateForm'

function CreateComment({ post }) {
  const { uid, setGetPosts, userData } = useContext(Context)

  const [commentForm, setCommentForm] = useState(true)
  const [message, setMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (message) {
      axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API_URL}api/post/comment/${post._id}`,
        data: {
          commenterId: uid,
          text: message,
          commenterPseudo: userData.pseudo,
        },
        withCredentials: true,
      })
        .then(() => {
          setGetPosts(true)
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <CreateForm
      commentForm={commentForm}
      setCommentForm={setCommentForm}
      setMessage={setMessage}
      commentHandleSubmit={handleSubmit}
    />
  )
}

export default CreateComment
