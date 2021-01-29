import React, { useState } from 'react';
import Avatar from "../users/Avatar";
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle  } from 'react-icons/io';


const Comment = (comment) => {
  const [downvote, setDownvote] = useState(false);
  const [upvote, setUpvote] = useState(false);
  // console.log(comment)
  const {
    id,
    comment_upvotes,
    comment_downvotes,
    content, user_avatar} = comment.comment;

  const newUpvote = async (e) => {
    await fetch(`/api/comments/${id}/upvote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_id": comment.user_id,
      })
    })
    setDownvote(true);
  }

  const newDownvote = async (e) => {
    await fetch(`/api/comments/${id}/downvote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_id": comment.user_id,
      })
    })
    setDownvote(true);
  }

  return (
    <div className="comment__container">
      <div className="comment__wrapper">
        <div className="comment__voting-panel">
          <IoIosArrowDropupCircle className="comment__upvote-button" onClick={upvote}/>
          <div>{comment_upvotes.length - comment_downvotes.length}</div>
          <IoIosArrowDropdownCircle className="comment__downvote-button" onClick={downvote}/>
        </div>
        <div className="comment__contents">
            <span>{content}</span>
        </div>
        <div className="comment_avatar-container">
          <Avatar avatar={user_avatar} size={"SML"}/>
        </div>
      </div>
    </div>

  )
}

export default Comment;
