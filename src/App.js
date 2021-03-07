import React from "react";
import Container from "react-bootstrap/Container";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Album from "./components/albums/Album";
import Albums from "./components/albums/Albums";
import CreateAlbum from "./components/albums/CreateAlbum";
import AuthRoute from "./components/AuthRoute";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import UpdateProfile from "./components/UpdateProfile";
import AuthContextProvider from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import EditAlbum from "./components/albums/EditAlbum";
import Thanks from "./components/albums/Thanks";
import ReviewAlbum from "./components/albums/ReviewAlbum";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <NavBar />

        <Container className="py-5 mb-5">
          <header className="App-header mb-4">
            {/* <h1>Photo review</h1> */}
          </header>

          <Routes>
            <AuthRoute exact path="/">
              <Home />
            </AuthRoute>

            <AuthRoute path="/albums">
              <Route path="/">
                <Albums />
              </Route>

              <AuthRoute path="/create">
                <CreateAlbum />
              </AuthRoute>

              <Route path="/:albumId">
                <Album />
              </Route>
            </AuthRoute>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/albums/edit/:albumId">
              <EditAlbum />
            </Route>

            <Route path="/thanks">
              <Thanks />
            </Route>

            <Route path="/ReviewAlbum/:albumId">
              <ReviewAlbum />
            </Route>

            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>

            <Route path="/logout">
              <Logout />
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>

            <AuthRoute path="/update-profile">
              <UpdateProfile />
            </AuthRoute>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
