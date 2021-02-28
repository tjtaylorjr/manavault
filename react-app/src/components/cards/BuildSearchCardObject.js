import React, { useState, useEffect } from 'react';
import { ItemTypes } from '../../utils/helpers';
import { useDrag } from 'react-dnd';
import { FaSatelliteDish } from 'react-icons/fa';

const BuildSearchCardObject = ( props ) => {
  const [normalIMG, setNormalIMG] = useState("");
  const [ID, setID] = useState("");
  // console.log(props);
  const {
         data,
         showImagePreview,
         dropImagePreview,
         cardDrop,
         dragStart,
        } = props;


  const id = data.id;
  const name = data.name;
  const formatted_name = data.name.split(" //")

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setNormalIMG(data.illustration.normal_image);
      setID(data.id)
    }
    return () => mounted = false;
  },[props.card, data.illustration.normal_image])

  const renderCardPage = () => {
    alert('Card information modal coming soon!');
  }



  const [{ isDragging }, dragRef] = useDrag(() => ({
    item: { type: ItemTypes.CARD },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))


  return (
    <section className="build-search-card-object card" onClick={renderCardPage}
      ref={dragRef}
      style={{opacity: isDragging ? .5 : 1, cursor: 'grab',}}
    >
      {/* <h4 style={{ color:"#FFF" }}>{formatted_name[0]}</h4> */}
      <div className="build-search-card-object__image-container">
        {normalIMG ? (
          <img src={normalIMG} id={ID} name={name} alt={data.name + " card image"} onDragStart={dragStart} onDrop={cardDrop} onMouseEnter={showImagePreview} onMouseLeave={dropImagePreview}/>
        ) : null}
      </div>
    </section>
  )
}

export default BuildSearchCardObject;
