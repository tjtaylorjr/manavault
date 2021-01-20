import React from 'react'

const UserObject = ({user}) => {
  console.log(user)
  return (
    <p style={{color:"#FFF"}}>{user.username}</p>
  )
}

export default UserObject;
