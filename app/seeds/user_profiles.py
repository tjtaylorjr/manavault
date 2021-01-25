from app.models import db, User_Profile

def seed_user_profiles():

  user_profile1 = User_Profile(
      user_id=1,
      location="Nowhere, OK",
      about="Thanks for visiting Spark.  We hope you enjoy the site.",
      VIP=True,
  )

  db.session.add(user_profile1)

  user_profile2 = User_Profile(
      user_id=2,
  )

  db.session.add(user_profile2)

  user_profile3 = User_Profile(
      user_id=3,
      location="Hartford, CT",
      about="Please like my decks!"
  )

  db.session.add(user_profile3)

  user_profile4 = User_Profile(
      user_id=4,
      location="Columbus, OH"
  )

  db.session.add(user_profile4)

  user_profile5 = User_Profile(
      user_id=5,
      location="Miami, FL"
  )

  db.session.add(user_profile5)

  user_profile6 = User_Profile(
      user_id=6,
      location="Los Angeles, CA",
  )

  db.session.add(user_profile6)

  user_profile7 = User_Profile(
      user_id=7,
      location="Denver, CO",
      about="Looking for friends on Arena.  PM me with Arena ID.",
      VIP=True,
      background_img="https://c1.scryfall.com/file/scryfall-cards/art_crop/front/0/9/09fd2d9c-1793-4beb-a3fb-7a869f660cd4.jpg?157249029"
  )

  db.session.add(user_profile7)

  user_profile8 = User_Profile(
      user_id=8,
      location="Bangor, ME",
  )

  db.session.add(user_profile8)

  user_profile9 = User_Profile(
      user_id=9,
      location="Inverness, UK",
  )

  db.session.add(user_profile9)

  user_profile10 = User_Profile(
      user_id=10,
      location="New York, NY",
  )

  db.session.add(user_profile10)

  user_profile11 = User_Profile(
      user_id=11,
      location="Ahmedabad, Gujarat",
  )

  db.session.add(user_profile11)

  user_profile12 = User_Profile(
      user_id=12,
      location="Boise, ID",
  )

  db.session.add(user_profile12)

  user_profile13 = User_Profile(
      user_id=13,
      location="Ulaanbaatar, MOG",
  )

  db.session.add(user_profile13)

  user_profile14 = User_Profile(
      user_id=14,
      location="Kearney, NE",
  )

  db.session.add(user_profile14)

  user_profile15 = User_Profile(
      user_id=15,
      location="Helsingborg, SE",
  )

  db.session.add(user_profile15)

  user_profile16 = User_Profile(
      user_id=16,
      location="Fuefuki, JP",
  )

  db.session.add(user_profile16)

  user_profile17 = User_Profile(
      user_id=17,
      location="Washington, D.C.",
  )

  db.session.add(user_profile17)

  user_profile18 = User_Profile(
      user_id=18,
      location="Cranston, RI",
  )

  db.session.add(user_profile18)

  user_profile19 = User_Profile(
      user_id=19,
      location="Recife, BR",
  )

  db.session.add(user_profile19)

  user_profile20 = User_Profile(
      user_id=20,
      location="Kalamazoo, MI",
  )

  db.session.add(user_profile20)

  user_profile21 = User_Profile(
      user_id=21,
      location="Orlando, FL",
      about="Thanks for visiting my site!"
  )

  db.session.add(user_profile21)





def undo_user_profiles():
    db.session.execute('TRUNCATE user_profiles;')
    db.session.commit()
    print('unseed user_profiles complete')
