import styled from 'styled-components'
import colors from '../../utils/style/colors'

import Post from '../Post'

import { useState, useEffect, useContext } from 'react'
import { Context } from '../../utils/AppContext'
import axios from 'axios'

const FeedWrapper = styled.ul`
  margin: 0;
  padding: 0;
  /* border-right: solid 1px ${colors.secondary}; */
  /* box-sizing: border-box; */
`

function Feed({ getPosts, setGetPosts }) {
  const { uid, userData } = useContext(Context)
  const [posts, setPosts] = useState([])
  // const [getPosts, setGetPosts] = useState(true)

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/post/`,
      withCredentials: true,
    })
      .then((res) => {
        setPosts(res.data)
        setGetPosts(false)
      })
      .catch((err) => console.log(err))
  }, [getPosts, setGetPosts])

  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    )
  }

  return (
    <Context.Provider value={{ uid, setGetPosts, userData }}>
      <FeedWrapper>
        {!isEmpty(posts[0]) &&
          posts.map((post, index) => {
            return <Post post={post} key={post._id} />
          })}
      </FeedWrapper>
    </Context.Provider>
  )
}

export default Feed
