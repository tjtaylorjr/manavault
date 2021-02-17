import React, { useEffect, useState } from 'react';
import Avatar from "../users/Avatar";
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle  } from 'react-icons/io';
import { convertTimeStamp } from '../../utils/helpers';


const Comment = (props) => {
  const [downvote, setDownvote] = useState(0);
  const [upvote, setUpvote] = useState(false);
  const [currentVotes, setCurrentVotes] = useState(false);
  console.log(props)
  const {
    id,
    comment_upvotes,
    comment_downvotes,
    created_at,
    content,
    posted_by,
    deck_id
  } = props.comment;
  const {
    username,
    info
  } = posted_by;
  const {avatar} = info;
  const messageTStamp = convertTimeStamp(created_at);

  useEffect(() => {
    const voteTally = comment_upvotes.length - comment_downvotes.length;
    console.log(upvote);

    setCurrentVotes(voteTally);
  }, []);

  useEffect(() => {
    if (upvote || downvote) {
      (async () => {
        const res = await fetch(`/api/decks/${deck_id}/comments/${id}`);
        const data = await res.json();
        if (data) {
          console.log(data);
          const voteTally = data.comment_upvotes.length - data.comment_downvotes.length;
          setCurrentVotes(voteTally)
        }
      })();
    }
    setUpvote(false)
    setDownvote(false)
  },[upvote, downvote])

  // console.log(currentVotes);

  const newUpvote = async (e) => {
    console.log(upvote)
    if (props.user.id !== posted_by.id) {
      await fetch(`/api/decks/${deck_id}/comments/${id}/upvote`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "user_id": props.user.id,
        })
      })
      setUpvote(true);
    }
  }

  const newDownvote = async (e) => {
    if(props.user.id !== posted_by.id) {
      await fetch(`/api/decks/${deck_id}/comments/${id}/downvote`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "user_id": props.user.id,
        })
      })
      setDownvote(true);
    }
  }

  return (
    <div className="comment__container">
      <div className="comment__wrapper">
        <div className="comment__voting-panel">
          {props.authenticated &&
            <>
           <IoIosArrowDropupCircle className="comment__upvote-button" onClick={newUpvote}/>
           <div>{currentVotes}</div>
           <IoIosArrowDropdownCircle className="comment__downvote-button" onClick={newDownvote}/>
           </>
          }
        </div>
        <div className="comment__info">
          <div className="comment__info-username">
            <div>
              Posted by:
            </div>
            <div style={{ marginLeft: '.25rem', fontWeight: 'bold'}}>
              {username}
            </div>
          </div>
          <div>
            <div style={{ marginTop: '.125rem', fontSize: '10px'}}>
              {messageTStamp}
            </div>
          </div>
        </div>
        <div className="comment__contents">
          {content}
        </div>
        <div className="comment__avatar-container">
          <Avatar avatar={avatar} size={"SML"}/>
        </div>
      </div>
    </div>

  )
}

export default Comment;
