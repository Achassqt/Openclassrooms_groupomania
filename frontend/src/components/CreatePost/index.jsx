// import styled from 'styled-components'

import axios from 'axios'
import { useContext, useState } from 'react'
import { Context } from '../../utils/AppContext'
import FormPost from '../FormPost'

function CreatePost({ setGetPosts }) {
  const { uid } = useContext(Context)

  const postForm = true

  const [message, setMessage] = useState(null)

  const [postPicture, setPostPicture] = useState(null)
  const [file, setFile] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (message || postPicture) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('posterId', uid)
      formData.append('message', message)

      axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/post/`,
        data: formData,
        withCredentials: true,
      })
        .then(() => {
          setGetPosts(true)
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <FormPost
      postHandleSubmit={handleSubmit}
      setMessage={setMessage}
      postPicture={postPicture}
      setPostPicture={setPostPicture}
      setFile={setFile}
      postForm={postForm}
    />
  )
}

export default CreatePost
