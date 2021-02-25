import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from "./Avatar";
import defaultAvatar from  '../../assets/images/avatars/faceless-walker.png';

const UserObject = (user) => {
  const userRef = useRef();
  const {data} = user
  const avatar = data.info.avatar;
  // const defaultAvatar = "faceless-walker.png";
  const history = useHistory();
  const renderUserProfile = () => {
    history.push(`/users/${data.id}`)
  }
  //console.log(data.info.VIP)
  const isVIP = data.info.VIP;


  useEffect(() => {
    if(isVIP) {
      userRef.current.classList.add("user-object--VIP")
    }
  },[user])

  return (
    <div>
      <div className="user-object" ref={userRef} style={{ background: isVIP ? "linear-gradient(135deg, #FF5500 5%, #F59105 50%, #FF5500 95%)" : "transparent" }} onClick={renderUserProfile}>
        {/* {avatar !== null ? (
          <Avatar avatar={avatar} size={"MED"}/>
        ) : (
          <Avatar avatar={defaultAvatar} size={"MED"}/>
        )} */}
        <Avatar avatar={avatar} isVIP={isVIP} size={"MED"} />
      </div>
      <p className="user-object__username">{data.username}</p>
    </div>
  )
}

export default UserObject;
