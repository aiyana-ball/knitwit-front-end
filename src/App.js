import './App.css';
import './components/SearchBar.css';
import './components/MenuButtons.css';
import './components/Search.css';
import UserContext from './UserContext';
import { signInWithGoogle, firebaseSignOut } from './components/firebase.js';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { auth } from './components/firebase';
import Search from './components/Search';
import Profile from './components/Profile';
import Patterns from './components/Patterns';
import YarnPage from './components/Yarn';
import SearchBar from './components/SearchBar';
function App() {
  
  const [user, setUser] = useState(null); //If the user data updates, re-render
  //this line adds the user photo {user && <img src={user.photoURL} alt="User" />}  (to be used later)
  const handleSignIn = () => {
    signInWithGoogle().then(user => setUser(user));
  };

  const handleSignOut = () => {
    firebaseSignOut().then(() => setUser(null));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, signIn: handleSignIn, signOut: handleSignOut }}> {/*Give every component access to the user data context provider*/}
      <Router>
        <div className="container">
          <div className="menu">
            <div className="logo-placeholder">
              <img src="/knitwit-logo.png" alt="Logo" />
            </div>
            <Link to="/search"><button className="sidebar-button">Search</button></Link>
            <Link to="/profile"><button className="sidebar-button">Profile</button></Link>
            <Link to="/patterns"><button className="sidebar-button">Patterns</button></Link>
            <Link to="/yarn"><button className="sidebar-button">Yarn</button></Link>
          </div>
          {/* <div className="header">
            <div id="cover">
              <SearchBar />
            </div>
          </div> */}
          <div className="main">
            <Routes>
              <Route path="/" element={<Navigate to="/search" />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/patterns" element={<Patterns />} />
              <Route path="/yarn" element={<YarnPage />} />
            </Routes>
          </div>
          {/* <div className="main">Main Content</div> */}
          <div className="footer">Footer</div>
        </div>
      </Router>
    </UserContext.Provider>
  );
  }

export default App;
