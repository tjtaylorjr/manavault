import React from 'react'

const UserObject = (user) => {
  const {data} = user
  return (
    <p style={{color:"#FFF"}}>{data.username}</p>
  )
}

export default UserObject;
