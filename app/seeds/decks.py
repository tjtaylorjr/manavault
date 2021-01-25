from app.models import db, Deck, Deck_Card, Card, Alternate_Cardface, Illustration, User

def seed_decks():
    deck1 = Deck(
        user_id = 7,
        creator_name = 'epeterson',
        deck_name = "Gruul Adventures",
        description = "Abuse the adventure mechanic to create a draw engine that will overwhelm your opponents",
        background_img = 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/0/9/09fd2d9c-1793-4beb-a3fb-7a869f660cd4.jpg?157249029',
        video_url = '<iframe width="560" height="315" src="https://www.youtube.com/embed/ts7pZ87yLjM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    )

    db.session.add(deck1)
    db.session.commit()

def seed_deck_cards():
    card1 = Deck_Card(
        deck_id = 1,
        card_id = 26518,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card1)

    card2 = Deck_Card(
        deck_id = 1,
        card_id = 2857,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card2)

    card3 = Deck_Card(
        deck_id = 1,
        card_id = 4312,
        in_deck = 1,
        in_sideboard = 0
    )
    db.session.add(card3)

    card4 = Deck_Card(
        deck_id = 1,
        card_id = 2320,
        in_deck = 2,
        in_sideboard = 0
    )
    db.session.add(card4)

    card5 = Deck_Card(
        deck_id = 1,
        card_id = 2180,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card5)

    card6 = Deck_Card(
        deck_id = 1,
        card_id = 2144,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card6)

    card7 = Deck_Card(
        deck_id = 1,
        card_id = 11249,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card7)

    card8 = Deck_Card(
        deck_id = 1,
        card_id = 17796,
        in_deck = 2,
        in_sideboard = 0
    )
    db.session.add(card8)

    card9 = Deck_Card(
        deck_id = 1,
        card_id = 13382,
        in_deck = 1,
        in_sideboard = 1
    )
    db.session.add(card9)

    card10 = Deck_Card(
        deck_id = 1,
        card_id = 16304,
        in_deck = 1,
        in_sideboard = 2
    )
    db.session.add(card10)

    card11 = Deck_Card(
        deck_id = 1,
        card_id = 7808,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card11)

    card12 = Deck_Card(
        deck_id = 1,
        card_id = 13307,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card12)

    card13 = Deck_Card(
        deck_id = 1,
        card_id = 3894,
        in_deck = 2,
        in_sideboard = 0
    )
    db.session.add(card13)

    card14 = Deck_Card(
        deck_id = 1,
        card_id = 8816,
        in_deck = 2,
        in_sideboard = 1
    )
    db.session.add(card14)

    card15 = Deck_Card(
        deck_id = 1,
        card_id = 1099,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card15)

    card16 = Deck_Card(
        deck_id = 1,
        card_id = 13424,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card16)

    card17 = Deck_Card(
        deck_id = 1,
        card_id = 53343,
        in_deck = 9,
        in_sideboard = 0
    )
    db.session.add(card17)

    card18 = Deck_Card(
        deck_id = 1,
        card_id = 10906,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card18)

    card20 = Deck_Card(
        deck_id = 1,
        card_id = 18284,
        in_deck = 0,
        in_sideboard = 3
    )
    db.session.add(card20)

    card21 = Deck_Card(
        deck_id = 1,
        card_id = 14916,
        in_deck = 0,
        in_sideboard = 2
    )
    db.session.add(card21)

    card22 = Deck_Card(
        deck_id = 1,
        card_id = 21054,
        in_deck = 0,
        in_sideboard = 2
    )
    db.session.add(card22)

    card23 = Deck_Card(
        deck_id = 1,
        card_id = 14432,
        in_deck = 0,
        in_sideboard = 1
    )
    db.session.add(card23)

    card24 = Deck_Card(
        deck_id = 1,
        card_id = 12246,
        in_deck = 0,
        in_sideboard = 3
    )
    db.session.add(card24)

    db.session.commit()

def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()
    print('unseed decks complete')
