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
        background_img='https://c1.scryfall.com/file/scryfall-cards/art_crop/front/d/f/df99f770-2c39-4025-a8a2-a5890f61eb53.jpg?1594736416',
        video_url='<iframe width="560" height="315" src="https://www.youtube.com/embed/BUzmdkeOLTw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    )

    deck3 = Deck(
        user_id=2,
        creator_name='rcalabrese',
        deck_name="Mono White Aggression",
        description="A surprisingly strong deck",
        background_img='https: // c1.scryfall.com/file/scryfall-cards/art_crop/front/9/8/98c85699-2daf-4e87-a3be-465d02bd64bb.jpg?1594734775',
        video_url=''
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

    db.session.add_all([deck1, deck2, deck3, new_user1, new_user2,
                        new_user3, new_user4, user_profile23, user_profile24, user_profile25, user_profile26])
    db.session.commit()

def seed_deck_cards():
    card1 = Deck_Card(
        deck_id = 1,
        card_id = 26498,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card1)

    card2 = Deck_Card(
        deck_id = 1,
        card_id = 30648,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card2)

    card3 = Deck_Card(
        deck_id = 1,
        card_id = 15472,
        in_deck = 2,
        in_sideboard = 0
    )
    db.session.add(card3)

    card4 = Deck_Card(
        deck_id = 1,
        card_id = 2178,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card4)

    card5 = Deck_Card(
        deck_id = 1,
        card_id = 10185,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card5)

    card6 = Deck_Card(
        deck_id = 1,
        card_id = 16434,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card6)

    card7 = Deck_Card(
        deck_id = 1,
        card_id = 48996,
        in_deck = 2,
        in_sideboard = 0
    )
    db.session.add(card7)

    card8 = Deck_Card(
        deck_id = 1,
        card_id = 54953,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card8)

    card9 = Deck_Card(
        deck_id = 1,
        card_id = 40403,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card9)

    card10 = Deck_Card(
        deck_id = 1,
        card_id = 36550,
        in_deck = 2,
        in_sideboard = 0
    )
    db.session.add(card10)

    card11 = Deck_Card(
        deck_id = 1,
        card_id = 37629,
        in_deck = 3,
        in_sideboard = 0
    )
    db.session.add(card11)

    card12 = Deck_Card(
        deck_id = 1,
        card_id = 46895,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card12)

    card13 = Deck_Card(
        deck_id = 1,
        card_id = 45347,
        in_deck = 4,
        in_sideboard = 0
    )
    db.session.add(card13)

    card14 = Deck_Card(
        deck_id = 1,
        card_id = 55212,
        in_deck = 9,
        in_sideboard = 0
    )
    db.session.add(card14)

    card15 = Deck_Card(
        deck_id = 1,
        card_id = 55211,
        in_deck = 5,
        in_sideboard = 0
    )
    db.session.add(card15)

    card16 = Deck_Card(
        deck_id = 1,
        card_id = 26697,
        in_deck = 1,
        in_sideboard = 0
    )
    db.session.add(card16)

    card17 = Deck_Card(
        deck_id = 1,
        card_id = 23217,
        in_deck = 0,
        in_sideboard = 2
    )
    db.session.add(card17)

    card18 = Deck_Card(
        deck_id = 1,
        card_id = 36337,
        in_deck = 0,
        in_sideboard = 3
    )
    db.session.add(card18)

    card20 = Deck_Card(
        deck_id = 1,
        card_id = 19490,
        in_deck = 0,
        in_sideboard = 2
    )
    db.session.add(card20)

    card21 = Deck_Card(
        deck_id = 1,
        card_id = 25117,
        in_deck = 0,
        in_sideboard = 3
    )
    db.session.add(card21)

    card22 = Deck_Card(
        deck_id = 1,
        card_id = 17169,
        in_deck = 0,
        in_sideboard = 2
    )
    db.session.add(card22)

    card23 = Deck_Card(
        deck_id = 2,
        card_id = 19400,
        in_deck = 0,
        in_sideboard = 1,
        is_companion=True
    )
    db.session.add(card23)

    card24 = Deck_Card(
        deck_id = 2,
        card_id = 3758,
        in_deck = 3,
        in_sideboard = 0
    )
    db.session.add(card24)

    card25 = Deck_Card(
        deck_id=2,
        card_id=24647,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card25)

    card26 = Deck_Card(
        deck_id=2,
        card_id=2952,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card26)

    card27 = Deck_Card(
        deck_id=2,
        card_id=29853,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card27)

    card28 = Deck_Card(
        deck_id=2,
        card_id=20422,
        in_deck=1,
        in_sideboard=0
    )
    db.session.add(card28)

    card29 = Deck_Card(
        deck_id=2,
        card_id=48039,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card29)

    card30 = Deck_Card(
        deck_id=2,
        card_id=1222,
        in_deck=1,
        in_sideboard=0
    )
    db.session.add(card30)

    card31 = Deck_Card(
        deck_id=2,
        card_id=49144,
        in_deck=2,
        in_sideboard=0
    )
    db.session.add(card31)

    card32 = Deck_Card(
        deck_id=2,
        card_id=22214,
        in_deck=3,
        in_sideboard=0
    )
    db.session.add(card32)

    card33 = Deck_Card(
        deck_id=2,
        card_id=25429,
        in_deck=1,
        in_sideboard=0
    )
    db.session.add(card33)

    card34 = Deck_Card(
        deck_id=2,
        card_id=43203,
        in_deck=1,
        in_sideboard=1
    )
    db.session.add(card34)

    card35 = Deck_Card(
        deck_id=2,
        card_id=53906,
        in_deck=2,
        in_sideboard=1
    )
    db.session.add(card35)

    card36 = Deck_Card(
        deck_id=2,
        card_id=43157,
        in_deck=2,
        in_sideboard=0
    )
    db.session.add(card36)

    card37 = Deck_Card(
        deck_id=2,
        card_id=54896,
        in_deck=1,
        in_sideboard=2
    )
    db.session.add(card37)

    card38 = Deck_Card(
        deck_id=2,
        card_id=42913,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card38)

    card39 = Deck_Card(
        deck_id=2,
        card_id=34558,
        in_deck=1,
        in_sideboard=1
    )
    db.session.add(card39)

    card40 = Deck_Card(
        deck_id=2,
        card_id=38719,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card40)

    card41 = Deck_Card(
        deck_id=2,
        card_id=45347,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card41)

    card42 = Deck_Card(
        deck_id=2,
        card_id=55209,
        in_deck=5,
        in_sideboard=0
    )
    db.session.add(card42)

    card43 = Deck_Card(
        deck_id=2,
        card_id=55210,
        in_deck=3,
        in_sideboard=0
    )
    db.session.add(card43)

    card44 = Deck_Card(
        deck_id=2,
        card_id=48944,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card44)

    card45 = Deck_Card(
        deck_id=2,
        card_id=43822,
        in_deck=2,
        in_sideboard=0
    )
    db.session.add(card45)

    card46 = Deck_Card(
        deck_id=2,
        card_id=17640,
        in_deck=0,
        in_sideboard=2
    )
    db.session.add(card46)

    card47 = Deck_Card(
        deck_id=2,
        card_id=26528,
        in_deck=0,
        in_sideboard=2
    )
    db.session.add(card47)

    card48 = Deck_Card(
        deck_id=2,
        card_id=54868,
        in_deck=0,
        in_sideboard=1
    )
    db.session.add(card48)

    card49 = Deck_Card(
        deck_id=2,
        card_id=52835,
        in_deck=0,
        in_sideboard=1
    )
    db.session.add(card49)

    card50 = Deck_Card(
        deck_id=2,
        card_id=49988,
        in_deck=0,
        in_sideboard=1
    )
    db.session.add(card50)

    card51 = Deck_Card(
        deck_id=3,
        card_id=19400,
        in_deck=2,
        in_sideboard=0
    )
    db.session.add(card51)

    card52 = Deck_Card(
        deck_id=3,
        card_id=11834,
        in_deck=2,
        in_sideboard=0
    )
    db.session.add(card52)

    card53 = Deck_Card(
        deck_id=3,
        card_id=25046,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card53)

    card54 = Deck_Card(
        deck_id=3,
        card_id=22441,
        in_deck=2,
        in_sideboard=1
    )
    db.session.add(card54)

    card55 = Deck_Card(
        deck_id=3,
        card_id=54494,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card55)

    card56 = Deck_Card(
        deck_id=3,
        card_id=54521,
        in_deck=2,
        in_sideboard=0
    )
    db.session.add(card56)

    card57 = Deck_Card(
        deck_id=3,
        card_id=54835,
        in_deck=1,
        in_sideboard=0
    )
    db.session.add(card57)

    card58 = Deck_Card(
        deck_id=3,
        card_id=54829,
        in_deck=2,
        in_sideboard=0
    )
    db.session.add(card58)

    card59 = Deck_Card(
        deck_id=3,
        card_id=51764,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card59)

    card60 = Deck_Card(
        deck_id=3,
        card_id=21849,
        in_deck=3,
        in_sideboard=0
    )
    db.session.add(card60)

    card61 = Deck_Card(
        deck_id=3,
        card_id=6750,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card61)

    card62 = Deck_Card(
        deck_id=3,
        card_id=53563,
        in_deck=2,
        in_sideboard=1
    )
    db.session.add(card62)

    card63 = Deck_Card(
        deck_id=3,
        card_id=384,
        in_deck=2,
        in_sideboard=0
    )
    db.session.add(card63)

    card64 = Deck_Card(
        deck_id=3,
        card_id=32609,
        in_deck=2,
        in_sideboard=0
    )
    db.session.add(card64)

    card65 = Deck_Card(
        deck_id=3,
        card_id=55090,
        in_deck=15,
        in_sideboard=0
    )
    db.session.add(card65)

    card66 = Deck_Card(
        deck_id=3,
        card_id=55069,
        in_deck=1,
        in_sideboard=0
    )
    db.session.add(card66)

    card67 = Deck_Card(
        deck_id=3,
        card_id=573,
        in_deck=4,
        in_sideboard=0
    )
    db.session.add(card67)

    card68 = Deck_Card(
        deck_id=3,
        card_id=27150,
        in_deck=2,
        in_sideboard=0
    )
    db.session.add(card68)

    card69 = Deck_Card(
        deck_id=3,
        card_id=5988,
        in_deck=0,
        in_sideboard=2
    )
    db.session.add(card69)

    card70 = Deck_Card(
        deck_id=3,
        card_id=18392,
        in_deck=0,
        in_sideboard=4
    )
    db.session.add(card70)

    card71 = Deck_Card(
        deck_id=3,
        card_id=32589,
        in_deck=0,
        in_sideboard=2
    )
    db.session.add(card71)

    card72 = Deck_Card(
        deck_id=3,
        card_id=54843,
        in_deck=0,
        in_sideboard=2
    )
    db.session.add(card72)

    card73 = Deck_Card(
        deck_id=3,
        card_id=40675,
        in_deck=0,
        in_sideboard=3
    )
    db.session.add(card73)

    db.session.commit()

def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()
    print('unseed decks complete')


# def undo_likes():
#     db.session.execute('TRUNCATE likes;')
#     db.session.commit()
#     print('unseed likes complete')
