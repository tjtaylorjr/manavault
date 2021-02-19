// import React, { useState, useEffect } from 'react'
// import useAsync from "../../utils/helpers.js";

// const DeckCardObject = (data) => {
//   const [smallIMG, setSmallIMG] = useState("");
//   // const [normalIMG, setNormalIMG] = useState("");
//   const [fullCard, setFullCard] = useState({});
//   // const [pictures, setPictures] = useState({"fake": "object"})
//   const [correctName, setCorrectName] = useState("");
//   const [mounted, setMounted] = useState(false);

//   // const {card_id} = card.card;


//   useEffect(() => {
//     setMounted(false);
//     (async () => {
//       const {card_id} = data.data;

//       const res = await fetch(`/api/cards/${card_id}`, {
//         headers: {
//           "Content-Type": "application/json",
//         }
//       });

//       if(!res.ok) {
//         throw res
//       }

//       const result = await res.json();
//       if(result.length > 0) {
//         console.log(result.result)
//         setFullCard(result);
//         console.log(fullCard)
//         setMounted(true);
//       }
//     })()

//   }, [data.data, fullCard])

//   useEffect(() => {
//     if (mounted && fullCard.length > 0) {
//       const { illustration } = fullCard;
//       console.log(fullCard)
//       const { small_image } = illustration;
//       setSmallIMG(small_image);
//       setCorrectName(fullCard.name.split(" //"));
//     }

//   },[mounted])

//   // const renderCardPage = () => {
//   //   alert('Card information modal coming soon!');
//   // }

//   return (
//     <section className="deckcard-object">
//       <h4 style={{ color: "#FFF" }}>{correctName}</h4>
//       <div className="deckcard-object__image-container">
//           <img src={smallIMG} alt={correctName + " card image"} />
//       </div>
//     </section>
//   )
// }

// export default DeckCardObject;


import React, { useState, useEffect } from 'react'

const DeckCardObject = (props) => {
  const [smallIMG, setSmallIMG] = useState("")
  const [normalIMG, setNormalIMG] = useState("")
  const { card } = props.data;
  // const numCopies = props.num;

  // console.log(card)
  //const formatted_name = card.name.split(" //")

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setSmallIMG(card.illustration.small_image)
    }
    return () => mounted = false;
  }, [card])

  const renderCardPage = () => {
    alert('Card information modal coming soon!');
  }

  return (
    <section className="deckcard-object" onClick={renderCardPage}>
      <div className="deckcard-object__image-container">
        {smallIMG ? (
          <img src={smallIMG} alt={props.data.name + " card image"} />
        ) : null}
        {smallIMG ? (
          <div className="deckcard-object__reported-copies">{`x` + props.num}</div>
        ) : null}
      </div>
    </section>
  )
}

export default DeckCardObject;
