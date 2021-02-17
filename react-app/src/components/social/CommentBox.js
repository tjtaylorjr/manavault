import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "../users/Avatar";
import cn from "classnames";
import DynamicHeight from "./DynamicHeight";


const INITIAL_HEIGHT = 100;

const CommentBox = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [avatar, setAvatar] = useState("faceless-walker.png");
  const [username, setUsername] = useState("")
  const outerHeight = useRef(INITIAL_HEIGHT);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const {setPostFlag} = props;
  const history = useHistory();

  useEffect(() => {
    if (props.user_id) {
      (async () => {
        const res = await fetch(`/api/users/${props.user_id}`);
        const data = await res.json();
        setAvatar(data.info.avatar);
        setUsername(props.username)
      })()
    }
  },[props.user_id, props.username])

  DynamicHeight(textRef, commentValue);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
    }
  }

  const onChange = (e) => {
    setCommentValue(e.target.value);
  }

  const onClose = () => {
    setCommentValue("");
    setIsExpanded(false);
  };

  const onSubmit = async(e) => {
    e.preventDefault();

    if(props.authenticated) {
      const res = await fetch(`/api/decks/${props.deck_id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "user_id": props.user_id,
          "user_avatar": avatar,
          "deck_id": props.deck_id,
          "content": commentValue
        }),
      });
      if (!res.ok) {
        throw res;
      }
      setCommentValue("");
      setPostFlag(true);
    } else {
      setCommentValue("");
      history.push("/login");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      ref={containerRef}
      className={cn("comment-box", {
        expanded: isExpanded,
        collapsed: !isExpanded,
        modified: commentValue.length > 0,
      })}
      style={{
        minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
      }}
    >
      <div className="comment-box__header">
        <div className="comment-box__user">
          <Avatar avatar={avatar} size={"SML"}/>
          {/* <img
            src={props.avatar}
            alt="Your avatar"
          /> */}
          <span>{username}</span>
        </div>
      </div>
      <label htmlFor="comment">Leave a comment</label>
      <textarea
        ref={textRef}
        onClick={onExpand}
        onFocus={onExpand}
        onChange={onChange}
        className="comment-box__comment-field"
        placeholder={`Tell ${props.creator} what you think about ${props.deckName}`}
        value={commentValue}
        name="comment"
        id="comment"
      />
      <div className="comment-box__actions">
        <button type="button" className="comment-box__cancel" onClick={onClose}>
          Cancel
      </button>
        <button type="submit" disabled={commentValue.length < 1} onSubmit={onClose}>
          Comment
      </button>
      </div>
    </form>
  );
};

export default CommentBox;
