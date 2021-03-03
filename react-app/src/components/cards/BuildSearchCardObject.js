import React, { useState, useEffect } from 'react';
import { ItemTypes } from '../../utils/helpers';
import { useDrag } from 'react-dnd';

const BuildSearchCardObject = ( props ) => {
  const [normalIMG, setNormalIMG] = useState("");
  const [ID, setID] = useState("");
  const [type, setType] = useState("");
  const [cmc, setCMC] = useState("");
  const [keywords, setKeywords] = useState("");

  // const [card, setCard] = useState("");

  //console.log(props);
  const {
         data,
         showImagePreview,
         dropImagePreview,
         cardDrop,
         dragStart,
        } = props;

 console.log(data);
  const id = data.id;
  const name = data.name;
  const formatted_name = data.name.split(" //")

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setNormalIMG(data.illustration.normal_image);
      setID(data.id)
      // let cardData = JSON.stringify(data)
      // setCard(cardData)
      // const cardType = data.type.split(" //")
      setType(data.type)
      setCMC(data.conv_mana_cost)
      setKeywords(data.keywords)
    }
    return () => mounted = false;
  },[props.data, data.illustration.normal_image])

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
    <section className="build-search-card-object card"
      // onClick={renderCardPage}
      ref={dragRef}
      style={{opacity: isDragging ? .5 : 1, cursor: 'grab',}}
    >
      <div className="build-search-card-object__image-container">
        {normalIMG ? (
          <img src={normalIMG} id={ID} name={name} alt={data.name + " card image"} cmc={cmc} keywords={keywords} type={type} onDragStart={dragStart} onDrop={cardDrop} onMouseEnter={showImagePreview} onMouseLeave={dropImagePreview}/>
        ) : null}
      </div>
    </section>
  )
}

export default BuildSearchCardObject;
