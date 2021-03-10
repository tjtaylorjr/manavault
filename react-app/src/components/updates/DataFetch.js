import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const DataFetch = (props) => {
  const [expansionData, setExpansionData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [multifacedData, setMultifacedData] = useState([]);
  const [formatData, setFormatData] = useState([]);
  const [illustrationData, setIllustrationData] = useState([]);

  const history = useHistory();

  if (props.user.id !== 22) {
    history.push("/");
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        const res = await fetch('https://api.scryfall.com/cards/search?order=set&q=e%3Akhm&unique=prints', {
          method: "GET",
          "Content-Type": "application/json; charset=utf-8",
        });

        if (!res.ok) {
          throw res;
        }

        const dataset1 = await res.json()
        //console.log(dataset1.data);

        if (dataset1 && dataset1.has_more) {
          const res2 = await fetch(dataset1.next_page, {
            "Content-Type": "application/json; charset=utf-8",
          })

          const dataset2 = await res2.json()
          // console.log(dataset2.data)

          if (dataset2 && dataset2.has_more) {
            const res3 = await fetch(dataset2.next_page, {
              "Content-Type": "application/json; charset=utf-8",
            })

            const dataset3 = await res3.json()
            //console.log(dataset3.data)

            if (dataset3 && dataset3.has_more) {
              const res4 = await fetch(dataset3.next_page, {
                "Content-Type": "application/json; charset=utf-8",
              })

              const dataset4 = await res4.json()
              //console.log(dataset4.data)

              if (dataset1 && dataset2 && dataset3 && dataset4) {
                setExpansionData([...dataset1.data, ...dataset2.data, ...dataset3.data, ...dataset4.data])
                return () => mounted = false;
              }

            } else if (dataset1 && dataset2 && dataset3) {
              setExpansionData([...dataset1.data, ...dataset2.data, ...dataset3.data])
              return () => mounted = false;
            }

          } else if (dataset1 && dataset2) {
            setExpansionData([...dataset1.data, ...dataset2.data])
            return () => mounted = false;
          }

        } else if (dataset1) {
          setExpansionData([...dataset1.data]);
          return () => mounted = false;
        }
      })()
    }
    console.log(expansionData);
    return () => mounted = false;
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted && expansionData.length > 0) {
      const cardList = expansionData.map((card) => {
        return {
          uuid: card.id,
          arena_id: card.arena_id ? card.arena_id : null,
          name: card.name,
          set_code: card.set,
          set_number: card.collector_number,
          rarity: card.rarity,
          type: card.type_line,
          power: card.power ? card.power : null,
          toughness: card.toughness ? card.toughness : null,
          loyalty: card.loyalty ? card.loyalty : null,
          mana_cost: card.mana_cost,
          conv_mana_cost: card.cmc,
          keywords: card.keywords,
          rules_text: card.oracle_text,
          flavor_text: card.flavor_text ? card.flavor_text : null,
          is_multifaced: card.layout === "modal_dfc" ? true : false,
          avg_rating: null
        }
      })
      //console.log(cardList);
      setCardData(cardList);
    }
    return () => mounted = false;
  }, [expansionData])

  useEffect(() => {
    let mounted = true;

    if (mounted && expansionData.length > 0) {
      const multifacedList = expansionData.map((card) => {
        if(card.card_faces) {
          const altCardFace = card.card_faces[1];
          return {
            base_card_uuid: card.id,
            face_change: card.layout,
            name: altCardFace.name,
            type: altCardFace.type_line,
            power: altCardFace.power ? altCardFace.power : null,
            toughness: altCardFace.toughness ? altCardFace.toughness : null,
            loyalty: altCardFace.loyalty ? altCardFace.loyalty : null,
            mana_cost: altCardFace.mana_cost ? altCardFace.mana_cost : null,
            keywords: card.keywords ? card.keywords : null,
            rules_text: altCardFace.oracle_text ? altCardFace.oracle_text : null,
            flavor_text: altCardFace.flavor_text ? altCardFace.flavor_text : null,
          }
        } else {
          return {object: "isEmpty"}
        }
      })
      console.log(multifacedList);
      setMultifacedData(multifacedList);
    }
    return () => mounted = false;
  }, [expansionData])

  useEffect(() => {
    let mounted = true;

    if (mounted && expansionData.length > 0) {
      const formatList = expansionData.map((card) => {
        return {
          card_uuid: card.id,
          standard: card.legalities.standard,
          future: card.legalities.future,
          historic: card.legalities.historic,
          pioneer: card.legalities.pioneer,
          modern: card.legalities.modern,
          legacy: card.legalities.legacy,
          pauper: card.legalities.pauper,
          vintage: card.legalities.vintage,
          penny: card.legalities.penny,
          commander: card.legalities.commander,
          brawl: card.legalities.brawl,
          duel: card.legalities.duel,
          oldschool: card.legalities.oldschool
        }
      })
      // console.log(formatList);
      setFormatData(formatList);
    }
    return () => mounted = false;
  }, [expansionData])

  useEffect(() => {
    let mounted = true;

    if (mounted && expansionData.length > 0) {
      const illustrationList = expansionData.map((card) => {
        if(card.image_uris) {
          const {small, normal, large, png, art_crop} = card.image_uris;

          return {
            card_uuid: card.id,
            alternate_cardface_id: null,
            side: "Front",
            artist: card.artist,
            // image_uris: card.image_uris,
            small_image: small,
            normal_image: normal,
            large_image: large,
            highres_png: png,
            art_crop: art_crop
          }
        } else if(card.card_faces) {
          const mainCard = card.card_faces[0];
          const {small, normal, large, png, art_crop} = mainCard.image_uris;

          return {
            card_uuid: card.id,
            alternate_cardface_uuid: null,
            side: "Front",
            artist: mainCard.artist,
            small_image: small,
            normal_image: normal,
            large_image: large,
            highres_png: png,
            art_crop: art_crop
          }
        }
      })
      //currently I have to generate an id for the alternate and then use that when creating the data for the illustrations.  Has to be done via csv mergining in excel.
      const altIllustrationList = expansionData.map((card) => {
        if(card.card_faces) {
          const backsideCard = card.card_faces[1];
          const {small, normal, large, png, art_crop} = backsideCard.image_uris;

          return {
            card_uuid: null,
            alternate_cardface_uuid: null,
            side: "Back",
            artist: backsideCard.artist,
            small_image: small,
            normal_image: normal,
            large_image: large,
            highres_png: png,
            art_crop: art_crop
          }
        } else {
          return {object: "isEmpty"};
        }
      })
      console.log(illustrationList);
      console.log(altIllustrationList);
      setIllustrationData([...illustrationList, ...altIllustrationList]);
    }
    return () => mounted = false;
  }, [expansionData])

  // useEffect(() => {
  //   let mounted = true;
  //   if (mounted && illustration1Data.length > 0) {
  //     const illustrationList2 = illustration1Data.map((card) => {
  //       return {
  //         card_uuid:card.card_uuid,
  //         alternate_cardface_uuid: null,
  //         artist: card.artist,
  //         small_image: card.image_uris.small,


  //       }
  //     })
  //   }
  // },[illustration1Data])
  return (
    <div style={{ paddingTop: "80px", height: "100%", position: "relative", display: "flex", flexDirection: "column", whiteSpace: "nowrap", backgroundColor: "#000" }}>
      <div>
        {expansionData.map((card, i) => (<p key={i} style={{ color: "#fff" }}>{JSON.stringify(card) + ','}</p>))}
      </div>
      <div style={{ color: "#FF6000" }}>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
      </div>
      <div>
        {cardData.map((card, i) => (<div key={i} style={{ color: "#fff" }}>{JSON.stringify(card) + ','}</div>))}
      </div>
      <div style={{ color: "#FF6000" }}>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
      </div>
      <div>
        {formatData.map((card, i) => (<div key={i} style={{ color: "#fff" }}>{JSON.stringify(card) + ','}</div>))}
      </div>
      <div style={{ color: "#FF6000" }}>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
      </div>
      <div>
        {multifacedData.map((card, i) => (<div key={i} style={{ color: "#fff" }}>{JSON.stringify(card) + ','}</div>))}
      </div>
      <div style={{ color: "#FF6000" }}>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
        <div>------------------------------------------------------------</div>
      </div>
      <div>
        {illustrationData.map((card, i) => (<div key={i} style={{ color: "#fff" }}>{JSON.stringify(card) + ','}</div>))}
      </div>
    </div>
  )
}

export default DataFetch;
