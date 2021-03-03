from app.models import db, Deck, Deck_Card, Card, Alternate_Cardface, Illustration, User, User_Profile

def seed_decks():
    deck1 = Deck(
        user_id = 7,
        creator_name = 'epeterson',
        deck_name = "Gruul Adventures",
        description = "Abuse the adventure mechanic to create a draw engine that will overwhelm your opponents",
        background_img = 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/0/9/09fd2d9c-1793-4beb-a3fb-7a869f660cd4.jpg?157249029',
        video_url = '<iframe width="560" height="315" src="https://www.youtube.com/embed/ts7pZ87yLjM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    )

    deck2 = Deck(
        user_id=14,
        creator_name='dbatbayar',
        deck_name="Dimir Rogues",
        description="How can you beat me, if you have no cards?",
        background_img='https://https://c1.scryfall.com/file/scryfall-cards/art_crop/front/d/f/df99f770-2c39-4025-a8a2-a5890f61eb53.jpg?1594736416',
        video_url='<iframe width="560" height="315" src="https://www.youtube.com/watch?v=BUzmdkeOLTw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    )

    new_user1 = User(
        username="fcooper",
        email="fcooper@email.com",
        password="password",
        user_likes=[deck1]
    )

    new_user2 = User(
        username="vlemon",
        email="vlemon@email.com",
        password="password",
        user_likes=[deck1]
    )

    new_user3 = User(
        username="tmacron",
        email="tmacron@email.com",
        password="password",
        user_likes=[deck1]
    )

    new_user4 = User(
        username="kgreen",
        email="kgreen@email.com",
        password="password",
        user_likes=[deck1]
    )

    user_profile23 = User_Profile(
        user_id=23,
        location="Boston, MA"
    )


    user_profile24 = User_Profile(
        user_id=24,
        location="San Francisco, CA"
    )


    user_profile25 = User_Profile(
        user_id=25,
        location="Baltimore, MD"
    )


    user_profile26 = User_Profile(
        user_id=26,
        location="Deep River, CT"
    )

    db.session.add_all([deck1, deck2, new_user1, new_user2,
                        new_user3, new_user4, user_profile23, user_profile24, user_profile25, user_profile26])
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
        card_id = 30672,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card2)

    card3 = Deck_Card(
        deck_id = 1,
        card_id = 23235,
        in_deck = 1,
        in_sideboard = 0
    )
    db.session.add(card3)

    card4 = Deck_Card(
        deck_id = 1,
        card_id = 15484,
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
        card_id = 10192,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card6)

    card7 = Deck_Card(
        deck_id = 1,
        card_id = 16447,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card7)

    card8 = Deck_Card(
        deck_id = 1,
        card_id = 49032,
        in_deck = 2,
        in_sideboard = 0
    )
    db.session.add(card8)

    card9 = Deck_Card(
        deck_id = 1,
        card_id = 17184,
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
        card_id = 40436,
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
        card_id = 37658,
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
        card_id = 46931,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card15)

    card16 = Deck_Card(
        deck_id = 1,
        card_id = 45383,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card16)

    card17 = Deck_Card(
        deck_id = 1,
        card_id = 17080,
        in_deck = 9,
        in_sideboard = 0
    )
    db.session.add(card17)

    card18 = Deck_Card(
        deck_id = 1,
        card_id = 52290,
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
        card_id = 25137,
        in_deck = 0,
        in_sideboard = 3
    )
    db.session.add(card24)

    card25 = Deck_Card(
        deck_id=2,
        card_id=19418,
        in_deck=0,
        in_sideboard=1
    )
    db.session.add(card25)

    card26 = Deck_Card(
        deck_id=2,
        card_id=3761,
        in_deck=3,
        in_sideboard=0
    )
    db.session.add(card26)

    card27 = Deck_Card(
        deck_id=2,
        card_id=24666,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card27)

    card28 = Deck_Card(
        deck_id=2,
        card_id=48075,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card28)

    card29 = Deck_Card(
        deck_id=2,
        card_id=2955,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card29)

    card30 = Deck_Card(
        deck_id=2,
        card_id=1222,
        in_deck=2,
        in_sideboard=1
    )
    db.session.add(card30)

    card31 = Deck_Card(
        deck_id=2,
        card_id=29877,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card31)

    card32 = Deck_Card(
        deck_id=2,
        card_id=53342,
        in_deck=2,
        in_sideboard=0
    )
    db.session.add(card32)

    card33 = Deck_Card(
        deck_id=2,
        card_id=20440,
        in_deck=1,
        in_sideboard=0
    )
    db.session.add(card33)

    card34 = Deck_Card(
        deck_id=2,
        card_id=49180,
        in_deck=1,
        in_sideboard=0
    )
    db.session.add(card34)

    card35 = Deck_Card(
        deck_id=2,
        card_id=22232,
        in_deck=2,
        in_sideboard=0
    )
    db.session.add(card35)

    card36 = Deck_Card(
        deck_id=2,
        card_id=25449,
        in_deck=1,
        in_sideboard=0
    )
    db.session.add(card36)

    card37 = Deck_Card(
        deck_id=2,
        card_id=43239,
        in_deck=2,
        in_sideboard=0
    )
    db.session.add(card37)

    card38 = Deck_Card(
        deck_id=2,
        card_id=43193,
        in_deck=3,
        in_sideboard=0
    )
    db.session.add(card38)

    card39 = Deck_Card(
        deck_id=2,
        card_id=42949,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card39)

    card40 = Deck_Card(
        deck_id=2,
        card_id=38748,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card40)

    card41 = Deck_Card(
        deck_id=2,
        card_id=45383,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card41)

    card42 = Deck_Card(
        deck_id=2,
        card_id=2546,
        in_deck=5,
        in_sideboard=0
    )
    db.session.add(card42)

    card43 = Deck_Card(
        deck_id=2,
        card_id=12169,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card43)

    card44 = Deck_Card(
        deck_id=2,
        card_id=48980,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card44)

    card45 = Deck_Card(
        deck_id=2,
        card_id=43858,
        in_deck=2,
        in_sideboard=0
    )
    db.session.add(card45)

    card46 = Deck_Card(
        deck_id=2,
        card_id=17656,
        in_deck=0,
        in_sideboard=2
    )
    db.session.add(card46)

    card47 = Deck_Card(
        deck_id=2,
        card_id=369,
        in_deck=0,
        in_sideboard=2
    )
    db.session.add(card47)

    card48 = Deck_Card(
        deck_id=2,
        card_id=17270,
        in_deck=0,
        in_sideboard=3
    )
    db.session.add(card48)

    card49 = Deck_Card(
        deck_id=2,
        card_id=53947,
        in_deck=0,
        in_sideboard=3
    )
    db.session.add(card49)

    card50 = Deck_Card(
        deck_id=2,
        card_id=47289,
        in_deck=0,
        in_sideboard=3
    )
    db.session.add(card50)

    db.session.commit()

def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()
    print('unseed decks complete')

# def seed_likes():
#     like1 = likes(
#         user_id = 1,
#         deck_id = 1
#     )
#     db.session.add(like1)

#     like2 = likes(
#         user_id = 2,
#         deck_id = 1
#     )
#     db.session.add(like2)

#     like3 = likes(
#         user_id = 3,
#         deck_id = 1
#     )
#     db.session.add(like3)

#     like4 = likes(
#         user_id = 4,
#         deck_id = 1
#     )
#     db.session.add(like4)

#     like5 = likes(
#         user_id = 10,
#         deck_id = 1
#     )
#     db.session.add(like5)
#     db.session.commit()

# def undo_likes():
#     db.session.execute('TRUNCATE likes;')
#     db.session.commit()
#     print('unseed likes complete')
