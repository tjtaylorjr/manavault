import React, { useState, useEffect } from 'react'

const CardObjectNormal = ( card ) => {
  const [normalIMG, setNormalIMG] = useState("")
  const {data} = card;

  const formatted_name = data.name.split(" //")

  useEffect(() => {
      setNormalIMG(data.illustration.normal_image)
  },[card, data.illustration.normal_image])

  const renderCardPage = () => {
    alert('Card information modal coming soon!');
  }

  return (
    <section className="search-card-object" onClick={renderCardPage}>
      <h4 style={{ color:"#FFF" }}>{formatted_name[0]}</h4>
      <div className="search-card-object__image-container">
        {normalIMG ? (
          <img src={normalIMG} alt={data.name + " card image"}/>
        ) : null}
      </div>
    </section>
  )
}

export default CardObjectNormal;
