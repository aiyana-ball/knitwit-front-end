import './App.css';
import './components/SearchBar.css';
import './components/MenuButtons.css';
import UserContext from './UserContext';
import db from './firebase.js';
import { getAccountData } from './firebase.js';
import { getAuth, GoogleAuthProvider, signInWithGoogle} from './firebase.js';
import React, { useState } from 'react';

function App() {

  getAccountData();
  return (
    <div className="container">
      <div className="menu">
        <div className='logo-placeholder'></div>
        <button className="sidebar-button">Home</button>
        <button className="sidebar-button">Profile</button>
        <button className="sidebar-button">Patterns</button>
        <button className="sidebar-button">Yarn</button>
      </div>
      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
      <div className="header">
        <div id="cover">
          <form method="get" action="">
            <div className="tb">
              <div className="td"><input type="text" placeholder="Search" required/></div>
              <div className="td" id="s-cover">
                <button type="submit">
                  <div id="s-circle"></div>
                  <span></span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="main">Main Content</div>
      <div className="footer">Footer</div>
    </div>
  );
}

export default App;
