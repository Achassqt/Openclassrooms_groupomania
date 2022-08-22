import styled from 'styled-components'
import colors from '../../utils/style/colors'

import Post from '../Post'

import { useState, useEffect, useContext } from 'react'
import { Context } from '../../utils/AppContext'
import axios from 'axios'
import Loader from '../../utils/style/Loader'

const FeedWrapper = styled.ul`
  margin: 0;
  padding: 0;
  /* border-right: solid 1px ${colors.secondary}; */
  /* box-sizing: border-box; */
`

const LoaderContainer = styled.div`
  background-color: red;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

function Feed({ getPosts, setGetPosts, posts, setPosts }) {
  const {
    uid,
    userRole,
    isLoading,
    setIsLoading,
    userData,
    userDeleted,
    setUserDeleted,
  } = useContext(Context)
  // const [posts, setPosts] = useState([])
  // const [getPosts, setGetPosts] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/post/`,
      withCredentials: true,
    })
      .then((res) => {
        setPosts(res.data)
        setGetPosts(false)
        // setIsLoading(false)
      })
      .catch((err) => console.log(err))
  }, [getPosts, setGetPosts, setIsLoading, setPosts])

  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    )
  }

  return (
    <Context.Provider
      value={{
        uid,
        userRole,
        isLoading,
        setIsLoading,
        setGetPosts,
        userData,
        userDeleted,
        setUserDeleted,
      }}
    >
      {isLoading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      <FeedWrapper style={{ scale: isLoading ? '0' : '1' }}>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Post post={post} key={post._id} />
          })}
      </FeedWrapper>
    </Context.Provider>
  )
}

export default Feed
