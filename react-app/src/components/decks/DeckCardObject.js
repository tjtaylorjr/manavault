import React, { useState, useEffect } from 'react'

const DeckCardObject = (props) => {
  const [normalIMG, setNormalIMG] = useState("")
  const { card } = props.data;
  const { showImagePreview, dropImagePreview} = props;

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setNormalIMG(card.illustration.normal_image)
    }
    return () => mounted = false;
  }, [card])

  // const renderCardPage = () => {
  //   alert('Card information modal coming soon!');
  // }

  return (
    <section className="deckcard-object">
      <div className="deckcard-object__image-container">
        {normalIMG ? (
          <img src={normalIMG} alt={props.data.name + " card image"} onMouseEnter={showImagePreview} onMouseLeave={dropImagePreview}/>
        ) : null}
        {normalIMG && props.num > 0 ? (
          <div className="deckcard-object__reported-copies">{`x` + props.num}</div>
        ) : null}
      </div>
    </section>
  )
}

export default DeckCardObject;
