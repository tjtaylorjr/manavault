<div align="center">
  <h1>Capstone</h1>
</div>

<br>

![picture goes here](http://pictureurl)

<br>


> CAPSTONE-PLACEHOLDER is a collection tracking and deck building tool for Magic: the Gathering.

<br>


<div align="center">
  <h2>Table of Contents</h2>
</div>


- [Features](#features)
- [Wireframes](#wireframes)
- [Schema](#schema)
- [Routes](#routes)
- [Components](#components)
- [Technologies and Packages](#technologies-and-packages)
---
<div align="center">
  <h2>Features</h2>
</div>

### MVP

- Browse for cards throughout the history of Magic
- Build decks
- Rate and comment on the creations of other users
---

### Bonus Features
- Statistical analysis of your deck composition
- Hand drawing algorithm
- Track your collection
---
<div align="center">
  <h2>Wireframes</h2>
</div>

### Registration Page

![Register](https://user-images.githubusercontent.com/62177226/103712090-e8825680-4f86-11eb-9fcc-2c59820c239c.JPG)

### Login Page
![Login](https://user-images.githubusercontent.com/62177226/103712100-ee783780-4f86-11eb-9786-f227fd3eeb9b.JPG)

### Main Page
![Main](https://user-images.githubusercontent.com/62177226/103712106-f46e1880-4f86-11eb-8293-5a43fd26ee2a.JPG)

### Explore Decks
![Deck-Browser](https://user-images.githubusercontent.com/62177226/103716847-00130c80-4f92-11eb-86e9-da148466aabb.JPG)

### Explore Users
![Users](https://user-images.githubusercontent.com/62177226/103732172-de774c80-4fb4-11eb-9914-6b60aecd695f.JPG)

### User Profiles
![User-Profile](https://user-images.githubusercontent.com/62177226/103735560-5301b980-4fbc-11eb-8e2a-85dbd8b430da.JPG)

### Deck Builder and View (top half)
![Deck-Breakdown-top-level](https://user-images.githubusercontent.com/62177226/103759111-2f049f00-4fe1-11eb-90b0-70d53e65efb6.JPG)

### Deck Builder and View (bottom half)
![Deck-Breakdown-bottom-level](https://user-images.githubusercontent.com/62177226/103765847-d8e92900-4feb-11eb-9819-ff2876383320.JPG)

---
<div align="center">
  <h2>Schema</h2>
</div>

![Schema](https://user-images.githubusercontent.com/62177226/103941027-44bab700-50fc-11eb-8b48-2a96f96ffcbd.JPG)



---
<div align="center">
  <h2>Routes</h2>
</div>

- GET api/users (serves data to the users page)
- GET api/users/:user_id (serves data to the user profile)
- GET api/users/:user_id/followers (serves data to the followers page, which is a filtered users page)
- GET api/users/:user_id/following (serves data to the following page, which is a filtered users page)
- POST api/users/:user_id/follow (a "form" to follow a user)
- DELETE api/users/:user_id/unfollow (cancel a follow)
- POST api/search (broad search function on magin page that queries all tables)
- POST api/search/decks (search function on the decks page)
- POST api/search/cards (search function on the deck building page)
- POST api/search/users (search function on the users page)
- GET api/cards/:card_id (serves individual card data *unsure if going to use)
- GET api/cards/:card_id/rating (an average rating by users *unsure if going to use)
- POST api/cards/:card_id/rate (rate a card *may not use)
- PUT api/cards/:card_id/rate (change your rating of a card *may not use)
- POST api/decks/ (a form to create a new deck)
- GET api/decks/:deck_id (serves individual deck page)
- PUT api/decks/:deck_id (alter a deck)
- DELETE api/decks/:deck_id (delete a deck)
- GET api/decks/:deck_id/likes (serves total likes for a deck)
- POST api/decks/:deck_id/likes (like a deck)
- DELETE api/decks/:deck_id/likes (remove a like)
- GET api/decks/:deck_id/rating (average rating by users)
- POST api/decks/:deck_id/rating (rate a deck)
- PUT api/decks/:deck_id/rating (change your rating)
- DELETE api/decks/:deck_id/rating (delete your rating)
- GET api/decks/:deck_id/comments (serves up all comments by users)
- POST api/decks/:deck_id/comments (post a comment about a deck)
- PUT api/decks/:deck_id/comments (change your comment)
- DELETE api/decks/:deck_id/comments (remove your comment)
- GET api/decks/:deck_id/comments/likes (serves up total likes for a comment)
- POST api/decks/:deck_id/comment/likes (like a comment)
- DELETE api/decks/:deck_id/comment/likes (remove a like on a comment)


---
<div align="center">
  <h2>Components</h2>
</div>

---
<div align="center">
  <h2>Technologies and Packages</h2>
</div>

---
