import React from 'react';

const Avatar = (props) => {
  const { avatar } = props;
  const { size } = props;
  console.log(props, avatar, size)
  return (
    <>
      <div className={`avatar__container ${size}`} >
        <div className={`avatar__wrapper ${size}`} >
          <div className={`avatar__image ${size}`} style={{ backgroundImage: `url("/avatars/${avatar}")` }}></div>
        </div>
      </div>
    </>
  )
}

export default Avatar;
