from app.models import db, Comment, User, User_Profile


def seed_comments():
    comment1 = Comment(user_id=1,
                       deck_id=1,
                       content="Will play this at FNM this weekend")

    comment2 = Comment(user_id=3,
                       deck_id=1,
                       content="Love this deck!")

    comment3 = Comment(user_id=4,
                       deck_id=1,
                       content="Gruul clan best clan")

    comment4 = Comment(user_id=7,
                       deck_id=2,
                       content="NGL Can be super annoying to play against")

    comment5 = Comment(user_id=11,
                       deck_id=3,
                       content="I like the lifegain version with the broodmoths and daxos")

    comment6 = Comment(user_id=15,
                       deck_id=3,
                       content="Sometimes it is fun to just turn cards sideways")

    comment7 = Comment(user_id=18,
                       deck_id=3,
                       content="Looks pretty good")

    comment8 = Comment(user_id=19,
                       deck_id=1,
                       content="Not a fan, personally")

    new_user = User(
                 username="icordova",
                 email="icordova@email.com",
                 password="password",
                 user_upvotes=[comment1, comment2],
                 user_downvotes=[comment3])

    user_profile27 = User_Profile(
                                user_id=27,
                                location="Sioux City, IA")

    db.session.add_all([comment1, comment2, comment3, comment4,
                        comment5, comment6, comment7, comment8,
                        new_user, user_profile27])
    db.session.commit()

    # print('---COMMENTS---', comment1.to_dict())
    # print('---COMMENTS---', comment2.to_dict())
    # print('---COMMENTS---', comment3.to_dict())
    # print('---UPVOTED_BY---', comment1.comment_upvotes)
    # print('---DOWNVOTED_BY---', comment3.comment_downvotes)


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE')
    db.session.commit()
    print('comments unseeded')
