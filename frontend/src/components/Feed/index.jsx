import styled from 'styled-components'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'
import { TbMessageCircle2 } from 'react-icons/tb'
import { AiOutlineRetweet, AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineIosShare } from 'react-icons/md'
// import white from '../../assets/white.png'
import colors from '../../utils/style/colors'

// const FeedData = [
//   {
//     pp: white,
//     blaze: 'Goku',
//     arobase: '@Gokudu17',
//     text: 'Ouais ouais ouais le dragon là',
//     img: white,
//   },
//   {
//     pp: white,
//     blaze: 'Goku',
//     arobase: '@Gokudu17',
//     text: 'Ouais ouais ouais le dragon là',
//     img: white,
//   },
//   {
//     pp: white,
//     blaze: 'Goku',
//     arobase: '@Gokudu17',
//     text: 'Ouais ouais ouais le dragon là',
//     img: white,
//   },
//   {
//     pp: white,
//     blaze: 'Goku',
//     arobase: '@Gokudu17',
//     text: 'Ouais ouais ouais le dragon là',
//     img: white,
//   },
//   {
//     pp: white,
//     blaze: 'Goku',
//     arobase: '@Gokudu17',
//     text: 'Ouais ouais ouais le dragon là',
//     img: white,
//   },
// ]

const FeedWrapper = styled.section`
  /* border-right: solid 1px ${colors.secondary}; */
  /* box-sizing: border-box; */
`

const FeedPost = styled.div`
  display: flex;
  border-bottom: solid 1px ${colors.secondary};
  /* border-right: solid 1px ${colors.secondary}; */
  padding: 0 16px;
  padding-top: 12px;
  box-sizing: border-box;
`

const FeedPostLeft = styled.div`
  margin-right: 13px;

  img {
    height: 48px;
    width: 48px;
    border-radius: 50%;
  }
`

const FeedPostRight = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 12px;
`

const FeedPostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 15px;
  height: 22px;

  & > span {
    font-weight: 700;
  }

  .troispoints {
    font-size: 18.5px;
    display: flex;
    align-items: center;
  }
`

const FeedPostText = styled.div`
  color: white;
`

const FeedPostImage = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: flex-start;
  /* box-sizing: border-box; */

  img {
    /* border: 1px solid grey; */
    border-radius: 16px;
    min-width: 400px;
    max-width: 504px;
    height: auto;
    outline: solid grey 1px;
    /* object-fit: cover; */
  }
`

const FeedPostIcons = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.25em;
  margin-top: 12px;
  width: 425px;
  color: ${colors.secondary};
`

function Feed({ usersData }) {
  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    )
  }

  return (
    <FeedWrapper>
      {!isEmpty(usersData[0]) &&
        usersData.map((val, index) => (
          <FeedPost key={index}>
            <FeedPostLeft>
              <img src={val.imageUrl} alt="img" />
            </FeedPostLeft>
            <FeedPostRight>
              <FeedPostHeader>
                <span>{val.pseudo}</span>
                <div className="troispoints">
                  <IoEllipsisHorizontalSharp />
                </div>
              </FeedPostHeader>
              <FeedPostText>{/* <span>{val.text}</span> */}</FeedPostText>
              <FeedPostImage>
                {/* <img src={val.img} alt="img" /> */}
              </FeedPostImage>
              <FeedPostIcons>
                <div>
                  <TbMessageCircle2 />
                </div>
                <div>
                  <AiOutlineRetweet />
                </div>
                <div>
                  <AiOutlineHeart />
                </div>
                <div>
                  <MdOutlineIosShare />
                </div>
              </FeedPostIcons>
            </FeedPostRight>
          </FeedPost>
        ))}
    </FeedWrapper>
  )
}

export default Feed
