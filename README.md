<div align="center">
  <h1>ManaVault</h1>
</div>

<br>

![gif goes here](http://pictureurl)

<br>

<div align='center'>
  <a href='https://manavault.herokuapp.com/'>ManVault</a>
</div>


<br>

> ManaVault is a collection tracking and deck building tool for Magic: the Gathering.

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
- Dark/Light Mode
- Card hover display on build page (displays image of card based on current hover location)
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

### Explore Cards
![Card-Page](https://user-images.githubusercontent.com/62177226/103947935-e7783300-5106-11eb-843f-2549ec92b410.JPG)

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

![Schema](https://user-images.githubusercontent.com/62177226/104072179-b10ae880-51d8-11eb-897c-fb206ac5db1c.JPG)



---
<div align="center">
  <h2>Routes</h2>
</div>

- GET /auth (authenticates user)
- POST /auth/login (enables login)
- POST /auth/signup (register account)
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
- GET api/image/:card_id (fetches image for a card)
- Get api/image/:deck_id (populates deck images in deck view/build screen)
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

- SignupForm (possibly a modal)
- LoginForm (possibly a modal)
- Navbar
- Header (for most pages, want to have alternating background image)
- DeckHeader (specific to individual deck page)
- UserHeader (specific to user profile page)
- Footer
- DeckCard
- UserCard
- SearchPanel (search input field with buttons for setting search terms)
- UserStatsPanel (different stats about user's decks like most used color)
- DeckStatsPanel (different stats about individual decks)
- CardPoolPanel (displays card search results represented as dragable card components)
- Card (a component that is largely just an image of the card, but may have plus and minus buttons on it in the build page)
- CardHoverDisplay (a component that will display an image of a card user is hovering on *This may or may not be too hard to include at this time)
- CardList (displays user deck in list form with clickable links)
- CardInfoPanel (a panel for the individual card page that displays information about the card)

---
<div align="center">
  <h2>Technologies and Packages</h2>
</div>

- TBD
---
