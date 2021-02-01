import React, { useState } from 'react';
import Avatar from "../users/Avatar";
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle  } from 'react-icons/io';


const Comment = (props) => {
  const [downvote, setDownvote] = useState(false);
  const [upvote, setUpvote] = useState(false);
  // console.log(comment)
  const {
    id,
    comment_upvotes,
    comment_downvotes,
    created_at,
    content, user_avatar} = props.comment;

  // convert db timestamp to a local timestamp for the user
  const localTimeStamp = new Date(created_at).toString();
  console.log(typeof(localTimeStamp));
  const postDate = localTimeStamp.slice(0,3) + ", " + localTimeStamp.slice(4, 15);
  const postTime = (() => {
    let time = localTimeStamp.slice(16,24);

    time = time.split(':');

    const hours = Number(time[0]);
    const minutes = Number(time[1]);
    const seconds = Number(time[2]);

    let timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours == 0) {
      timeValue = "12";
    }

    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
    // timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;
    timeValue += (hours >= 12) ? " PM" : " AM";

    return timeValue;
  })()

  console.log(postTime)

  console.log(created_at);
  console.log(localTimeStamp);
  console.log(postDate);
  console.log(localTimeStamp.slice(16,24))

  const newUpvote = async (e) => {
    await fetch(`/api/comments/${id}/upvote`, {
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

  const newDownvote = async (e) => {
    await fetch(`/api/comments/${id}/downvote`, {
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

  return (
    <div className="comment__container">
      <div className="comment__wrapper">
        <div className="comment__voting-panel">
          {props.authenticated &&
            <>
           <IoIosArrowDropupCircle className="comment__upvote-button" onClick={newUpvote}/>
           <div>{comment_upvotes.length - comment_downvotes.length}</div>
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
              {props.user.username}
            </div>
          </div>
          <div>
            <div style={{ marginTop: '.125rem', fontSize: '10px'}}>
              {postDate} {postTime}
            </div>
          </div>
        </div>
        <div className="comment__contents">
          {content}
        </div>
        <div className="comment__avatar-container">
          <Avatar avatar={user_avatar} size={"SML"}/>
        </div>
      </div>
    </div>

  )
}

export default Comment;
