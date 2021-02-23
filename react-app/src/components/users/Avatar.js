import React from 'react';
import defaultAvatar from '../../assets/images/avatars/faceless-walker.png';

const Avatar = (props) => {
  const { avatar, size, isVIP } = props;
  // const { size } = props;
  // console.log(props, avatar, size)
  return (
    <>
      <div className={`avatar__container ${size}`} >
        <div className={`avatar__wrapper ${size}`} style={{ background: isVIP ? "linear-gradient(135deg, #FF5500 10%, #F59105 50%, #FF5500 90%)" : "linear-gradient(135deg, #766237 10%, #E6CD8C 50%, #766237 90%)"}}>
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
