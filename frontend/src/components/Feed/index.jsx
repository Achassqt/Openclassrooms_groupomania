import styled from 'styled-components'

import NoPost from '../../assets/Social Media_Flatline.svg'

import Post from './Post'

import { useState, useEffect, useContext } from 'react'
import { Context } from '../../utils/AppContext'
import axios from 'axios'
import Loader from '../../utils/Loader'

const FeedWrapper = styled.ul`
  margin: 0;
  padding: 0;

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
        font-size: 31px;
        font-weight: bold;
      }

      & > :last-child {
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
  // const [getAllUsersData, setGetAllUsersData] = useState(true)

  useEffect(() => {
    if (getPosts || onlyUserPosts || onlyUserPosts === false) {
      const getAllPosts = async () => {
        await axios({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}api/post/`,
          withCredentials: true,
        })
          .then((res) => {
            setPosts(res.data)
          })
          .catch((err) => console.log(err))
        setIsLoading(false)
      }
      getAllPosts()
      setGetPosts(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPosts, onlyUserPosts])

  useEffect(() => {
    // if (getAllUsersData) {
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
      //   setGetAllUsersData(false)
      // }
    }
    getAllUsers()
  }, [])

  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    )
  }

  const userPosts = posts.filter((post) => post.posterId.includes(uid))

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
                  <span>Vos posts apparaîtront ici.</span>
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
    </Context.Provider>
  )
}

export default Feed
