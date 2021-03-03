import React from 'react';

const SideboardDnd = (props) => {
  // const handleDragEnter = e => {
  //   e.preventDefault();
  //   e.stopPropagation();
  // };
  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  // const handleDragOver = e => {
  //   e.preventDefault();
  //   e.stopPropagation();
  // };
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className={'dnd-list'}
      onDrop={e => handleDrop(e)}
      // onDragOver={e => handleDragOver(e)}
      // onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
    >
    </div>
  );
};
export default SideboardDnd;
