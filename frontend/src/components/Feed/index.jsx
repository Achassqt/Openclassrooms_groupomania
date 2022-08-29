import styled from 'styled-components'
import colors from '../../utils/style/colors'

import NoPost from '../../assets/Social Media_Flatline.svg'

import Post from '../Post'

import { useState, useEffect, useContext } from 'react'
import { Context } from '../../utils/AppContext'
import axios from 'axios'
import Loader from '../../utils/style/Loader'

const FeedWrapper = styled.ul`
  margin: 0;
  padding: 0;
  /* box-sizing: border-box; */
  /* animation: opacity 500ms ease-out; */

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

  .no-posts {
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    max-width: 500px;
    margin: 32px auto;

    & > img {
      width: 100%;
    }

    .text {
      color: white;
      text-align: center;

      & > span {
        padding: 0 8px;
      }

      & > :first-child {
        margin: 0;
        /* width: 50%; */
        font-size: 31px;
        font-weight: bold;
      }

      & > :last-child {
        /* width: 50%; */
        text-align: right;
      }
    }
  }
`

const LoaderContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  margin-top: 40px;
`

function Feed({ getPosts, setGetPosts, posts, setPosts, onlyUserPosts }) {
  const {
    uid,
    userRole,
    isLoading,
    setIsLoading,
    userData,
    userDeleted,
    setUserDeleted,
  } = useContext(Context)

  const [usersData, setUsersData] = useState({})
  const [getAllUsersData, setGetAllUsersData] = useState(true)

  const [count, setCount] = useState(5)

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setGetPosts(true)
    }
  }

  useEffect(() => {
    if (getPosts || onlyUserPosts || onlyUserPosts === false) {
      const getAllPosts = async () => {
        await axios({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}api/post/`,
          withCredentials: true,
        })
          .then((res) => {
            const array = res.data.slice(0, count)
            setPosts(array)
            // console.log('ici', array)
          })
          .catch((err) => console.log(err))
        setIsLoading(false)
      }
      getAllPosts()
      setGetPosts(false)
      setCount(count + 5)
    }

    window.addEventListener('scroll', loadMore)
    return () => window.removeEventListener('scroll', loadMore)
  }, [getPosts, onlyUserPosts])

  useEffect(() => {
    setGetAllUsersData(true)
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
      // setGetAllUsersData(false)
    }
  }, [getAllUsersData, setIsLoading])

  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    )
  }

  const userPosts = posts.filter((post) => post.posterId.includes(uid))

  console.log('ici', userPosts)

  return (
    <Context.Provider
      value={{
        uid,
        userRole,
        setGetPosts,
        userData,
        userDeleted,
        setUserDeleted,
      }}
    >
      {/* {isLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : ( */}

      {onlyUserPosts ? (
        <>
          {isLoading && (
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
          )}
          <FeedWrapper
            style={{
              scale: isLoading ? '0' : '1',
              animation: isLoading === false && 'opacity 500ms ease-in-out',
            }}
          >
            {!isEmpty(userPosts[0]) ? (
              userPosts.map((post) => {
                return <Post usersData={usersData} post={post} key={post._id} />
              })
            ) : (
              <div className="no-posts">
                <img src={NoPost} alt="fake-post" />
                <div className="text">
                  <span>Mes Posts !</span>
                  <span>Vos posts apparîtront ici.</span>
                </div>
              </div>
            )}
          </FeedWrapper>
        </>
      ) : (
        <>
          {isLoading && (
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
          )}
          <FeedWrapper
            style={{
              scale: isLoading ? '0' : '1',
              animation: isLoading === false && 'opacity 500ms ease-in-out',
            }}
          >
            {!isEmpty(posts[0]) &&
              posts.map((post) => {
                return <Post usersData={usersData} post={post} key={post._id} />
              })}
          </FeedWrapper>
        </>
      )}

      {/* )} */}
    </Context.Provider>
  )
}

export default Feed
