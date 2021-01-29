from app.models import db, Comment, User, User_Profile


def seed_comments():
    comment1 = Comment(user_id=1,
                       user_avatar="faceless-walker.png",
                       deck_id=1,
                       content="Demo example of a comment")

    comment2 = Comment(user_id=3,
                       user_avatar="faceless-walker.png",
                       deck_id=1,
                       content="Love this deck!")

    comment3 = Comment(user_id=4,
                       user_avatar="faceless-walker.png",
                       deck_id=1,
                       content="Gruul clan best clan")

    new_user = User(
                 username="icordova",
                 email="icordova@email.com",
                 password="password",
                 user_upvotes=[comment1, comment2],
                 user_downvotes=[comment3])

    user_profile27 = User_Profile(
                                user_id=27,
                                location="Sioux City, IA")

    db.session.add_all([comment1, comment2, comment3, new_user, user_profile27])
    db.session.commit()

    print('---COMMENTS---', comment1.to_dict())
    print('---COMMENTS---', comment2.to_dict())
    print('---COMMENTS---', comment3.to_dict())
    print('---UPVOTED_BY---', comment1.comment_upvotes)
    print('---DOWNVOTED_BY---', comment3.comment_downvotes)


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE')
    db.session.commit()
    print('comments unseeded')
