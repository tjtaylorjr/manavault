import React, { useState, useEffect } from 'react'

const CardObject = ( card ) => {
  const [imageURLs, setImageURLs] = useState([]);
  const [smallIMG, setSmallIMG] = useState("")
  const [normalIMG, setNormalIMG] = useState("")
  const {data} = card;

  const formatted_name = data.name.split(" //")

  useEffect(() => {

    (async () => {
      const res = await fetch(`/api/illustrations/${data.uuid}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const images = await res.json();
      const {image_data} = images
      const image_urls = image_data[0]
      setSmallIMG([image_urls.small_image])
    })()

  },[card])

  const background = {backgroundImage:`${smallIMG}`}

  return (
    <section className="card-object">
      <h4 style={{ color:"#FFF" }}>{formatted_name[0]}</h4>
      <div className="card-object__image">
        <img src={smallIMG} />
      </div>
    </section>
  )
}

export default CardObject;
