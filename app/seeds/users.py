from werkzeug.security import generate_password_hash
from app.models import db, User


def seed_demo():

    demo = User(
        username='Visitor',
        email='demo@spark.io',
        password='password'
    )

    db.session.add(demo)
    db.session.commit()


def seed_users():

    user1 = User(
        username='rcalabrese',
        email='rcalabrese@test.com',
        password='password'
    )
    db.session.add(user1)

    user2 = User(
        username='mkosova',
        email='mkosova@test.com',
        password='password'
    )
    db.session.add(user2)

    user3 = User(
        username='dfulton',
        email='dfulton@test.com',
        password='password'
    )
    db.session.add(user3)

    user4 = User(
        username='swhite',
        email='swhite@test.com',
        password='password'
    )
    db.session.add(user4)

    user5 = User(
        username='clemma',
        email='clemma@test.com',
        password='password'
    )
    db.session.add(user5)

    user6 = User(
        username='epeterson',
        email='epeterson@test.com',
        password='password',
        followers=[user2, user3, user4, user5]
    )
    db.session.add(user6)

    user7 = User(
        username='ximing',
        email='ximing@test.com',
        password='password'
    )
    db.session.add(user7)

    user8 = User(
        username='ljohnson',
        email='ljohnson@test.com',
        password='password'
    )
    db.session.add(user8)

    user9 = User(
        username='amaclachlan',
        email='amaclachlan@test.com',
        password='password'
    )
    db.session.add(user9)

    user10 = User(
        username='skatz',
        email='skatz@test.com',
        password='password'
    )
    db.session.add(user10)

    user11 = User(
        username='ilaghari',
        email='ilaghari@test.com',
        password='password'
    )
    db.session.add(user11)

    user12 = User(
        username='spetrovich',
        email='spetrovich@test.com',
        password='password'
    )
    db.session.add(user12)

    user13 = User(
        username='dbatbayar',
        email='dbatbayar@test.com',
        password='password'
    )
    db.session.add(user13)

    user14 = User(
        username='ksweeney',
        email='ksweeney@test.com',
        password='password'
    )
    db.session.add(user14)

    user15 = User(
        username='akarlsdotter',
        email='akarlsdotter@test.com',
        password='password'
    )
    db.session.add(user15)

    user16 = User(
        username='hokumura',
        email='hokumura@test.com',
        password='password'
    )
    db.session.add(user16)

    user17 = User(
        username='bconway',
        email='bconway@test.com',
        password='password'
    )
    db.session.add(user17)

    user18 = User(
        username='jwilson',
        email='jwilson@test.com',
        password='password'
    )
    db.session.add(user18)

    user19 = User(
        username='soliveira',
        email='soliveira@test.com',
        password='password'
    )
    db.session.add(user19)

    user20 = User(
        username='cedwards',
        email='cedwards@test.com',
        password='password'
    )
    db.session.add(user20)

    user21 = User(
        username='tjtaylor',
        email='webmaster@spark.io',
        password='fakepassword'
    )
    db.session.add(user21)
    db.session.commit()


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
    print('unseed users complete')
