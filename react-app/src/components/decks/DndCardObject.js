import React, { useState, useEffect } from 'react'
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../utils/helpers';

const DndCardObject = (props) => {
  const [normalIMG, setNormalIMG] = useState("");
  const [cardImgId, setCardImgId] = useState("");
  const { illustration, id, name, conv_mana_cost, type } = props.data.card;
  // const { illustration } = card;
  // console.log(props);
  const { showImagePreview, dropImagePreview, dragStart } = props;


  useEffect(() => {
    let mounted = true;
    if (illustration && id.length > 0 && mounted) {
      setNormalIMG(illustration.normal_image)
      setCardImgId(id.includes("deckBuilder") ? id.slice(11) : id)
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
          <img src={normalIMG} id={`deckBuilder${cardImgId}`} name={name} alt={name + " card image"} cmc={conv_mana_cost} type={type} onDragStart={dragStart} onMouseEnter={showImagePreview} onMouseLeave={dropImagePreview} />
        ) : null}
      </div>
    </section>
  )
}

export default DndCardObject;
