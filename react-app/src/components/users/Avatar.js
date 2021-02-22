import React from 'react';
import defaultAvatar from '../../assets/images/avatars/faceless-walker.png';

const Avatar = (props) => {
  const { avatar } = props;
  const { size } = props;
  // console.log(props, avatar, size)
  return (
    <>
      <div className={`avatar__container ${size}`} >
        <div className={`avatar__wrapper ${size}`} >
          {avatar !== null ? (
            <div className={`avatar__image ${size}`} styel={{ backgroundImage: `url(${avatar})`}}></div>
          ) : (
            <div className={`avatar__image ${size}`} style={{ backgroundImage: `url(${defaultAvatar})` }}></div>
          )}
        </div>
      </div>
    </>
  )
}

export default Avatar;
