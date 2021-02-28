import React, { useState, useEffect } from 'react'

const DndCardObject = (props) => {
  const [normalIMG, setNormalIMG] = useState("")
  const { illustration } = props.data.card;
  // const { illustration } = card;
  console.log(props);
  const { showImagePreview, dropImagePreview } = props;


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



  return (
    <section className="dndcard-object">
      <div className="dndcard-object__image-container">
        {normalIMG ? (
          <img src={normalIMG} alt={props.data.card.name + " card image"} onMouseEnter={showImagePreview} onMouseLeave={dropImagePreview} />
        ) : null}
      </div>
    </section>
  )
}

export default DndCardObject;
