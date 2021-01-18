import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./utils/auth";
import Main from "./components/home/Main";
import NavBar from "./components/static/NavBar";
import Footer from "./components/static/Footer";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import {Profile, ProfileEditor} from "./components/users";
// import Profile from "./components/users/Profile";
// import ProfileEditor from "./components/users/ProfileEditor"
import DeckBuilder from "./components/decks/DeckBuilder";
import DeckViewer from "./components/decks/DeckViewer";
import DeckEditor from "./components/decks/DeckEditor";
import DeckBrowser from "./components/decks/DeckBrowser";
import SearchResults from "./components/search/SearchResults";
import CardBrowser from "./components/cards/CardBrowser";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        setCurrentUser(user);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Switch>
        <Route
          path="/users/:id"
          exact={true}
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        >
          <Profile user={currentUser} />
        </Route>
        <ProtectedRoute
          path="/users/:id/edit"
          exact={true}
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        >
          <ProfileEditor user={currentUser} />
          </ProtectedRoute>
        <ProtectedRoute
          path="/decks/build"
          exact={true}
          authenticated={authenticated}
        >
          <DeckBuilder />
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute
          path="/decks/:id/edit"
          exact={true}
          authenticated={authenticated}
        >
          <DeckEditor />
        </ProtectedRoute>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="/decks/:id" exact={true} authenticated={authenticated}>
          <DeckViewer user={currentUser} authenticated={authenticated} />
          <Footer />
        </Route>
        <Route path="/decks" exact={true} authenticated={authenticated}>
          <DeckBrowser user={currentUser} authenticated={authenticated} />
          <Footer />
        </Route>
        <Route path="/cards" exact={true} authenticated={authenticated}>
          <CardBrowser user={currentUser} authenticated={authenticated} />
          <Footer />
        </Route>
        <Route path="/search/?:query" exact={true}>
          <SearchResults />
        </Route>
        <Route path="/" exact={true} authenticated={authenticated}>
          <Main />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
