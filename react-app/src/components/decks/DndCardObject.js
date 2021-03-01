import React, { useState, useEffect } from 'react'
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../utils/helpers';

const DndCardObject = (props) => {
  const [normalIMG, setNormalIMG] = useState("")
  const { illustration } = props.data.card;
  // const { illustration } = card;
  console.log(props);
  const { showImagePreview, dropImagePreview, dragStart } = props;


  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setNormalIMG(illustration.normal_image)
    }
    return () => mounted = false;
  }, [props])

  // const renderCardPage = () => {
  //   alert('Card information modal coming soon!');
  // }
  const [{ isDragging }, dragRef] = useDrag(() => ({
    item: { type: ItemTypes.CARD },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))


  return (
    <section className="dndcard-object" ref={dragRef}>
      <div className="dndcard-object__image-container">
        {normalIMG ? (
          <img src={normalIMG} id={`deckBuilder${props.data.card.id}`} name={props.data.card.name} alt={props.data.card.name + " card image"} onDragStart={dragStart} onMouseEnter={showImagePreview} onMouseLeave={dropImagePreview} />
        ) : null}
      </div>
    </section>
  )
}

export default DndCardObject;
