import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./utils/auth";
import Main from "./components/home/Main";
import NavBar from "./components/static/NavBar";
import Footer from "./components/static/Footer";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import UsersBrowser from "./components/users/UsersBrowser";
import UserProfile from "./components/users/UserProfile";
import ProfileEditor from "./components/users/ProfileEditor"
import DeckBuilder from "./components/decks/DeckBuilder";
import DeckViewer from "./components/decks/DeckViewer";
import DeckEditor from "./components/decks/DeckEditor";
import DecksBrowser from "./components/decks/DecksBrowser";
import SearchResults from "./components/search/SearchResults";
import CardBrowser from "./components/cards/CardBrowser";
import DataFetch from "./components/updates/DataFetch";

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
    <>
      <div className="site-wrapper">
        <BrowserRouter>
          <NavBar
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          <Switch>
            <Route
              path="/users/:userId"
              exact={true}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            >
              <UserProfile
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                user={currentUser}
              />
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
              <DeckBuilder user={currentUser} authenticated={authenticated} />
            </ProtectedRoute>
            <Route path="/users" exact={true} authenticated={authenticated}>
              <UsersBrowser />
            </Route>
            <ProtectedRoute
              path="/decks/:id/edit"
              exact={true}
              authenticated={authenticated}
            >
              <DeckEditor user={currentUser} authenticated={authenticated} />
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
            </Route>
            <Route path="/decks" exact={true} authenticated={authenticated}>
              <DecksBrowser user={currentUser} authenticated={authenticated} />
              <Footer />
            </Route>
            <Route path="/cards" exact={true} authenticated={authenticated}>
              <CardBrowser user={currentUser} authenticated={authenticated} />
              <Footer />
            </Route>
            <Route path="/search/:query" exact={true}>
              <SearchResults user={currentUser} />
            </Route>
            {/* <Route path="/update" exact={true} authenticated={authenticated}>
              <DataFetch user={currentUser} authenticated={authenticated} />
            </Route> */}
            <Route path="/" exact={true} authenticated={authenticated}>
              <Main user={currentUser} authenticated={authenticated} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}

export default App;
