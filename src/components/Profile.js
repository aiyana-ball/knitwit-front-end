import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../UserContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Favorites from './Favorites';
import { makeRavelryRequest } from './ravelry';
import './Profile.css'

function Profile() {
  const { user, signIn, signOut } = useContext(UserContext);
  const photoURL = user ? user.photoURL.replace('s96-c', 's125-c') : null;
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false); //to reload the page upon user login

  async function fetchItemDetails(id, type) {
    try {
      let itemData;
      if (type === 'pattern') {
        itemData = await makeRavelryRequest(`patterns/${id}.json`);
        //itemData.pattern.first_photo = {};
        if (itemData.pattern && itemData.pattern.photos && itemData.pattern.photos[0] && itemData.pattern.photos[0].small_url) {
          itemData.pattern.first_photo = {};
          itemData.pattern.first_photo.small_url = itemData.pattern.photos[0].small_url
        }
        itemData.pattern.type = 'pattern'
        return itemData.pattern;
      } else if (type === 'yarn') {
        itemData = await makeRavelryRequest(`yarns/${id}.json`); 
        //itemData.yarn.first_photo = {};
        if (itemData.yarn && itemData.yarn.photos && itemData.yarn.photos[0] && itemData.yarn.photos[0].small_url) {
          itemData.yarn.first_photo = {};
          itemData.yarn.first_photo.small_url = itemData.yarn.photos[0].small_url
        }
        itemData.yarn.type = 'yarn'
        return itemData.yarn;
      }
    } catch (error) {
      console.error("Item not found:", id);
      return null;
    }
  }

  useEffect(() => {
    if (user) {
      const db = getFirestore();
      const userRef = doc(db, 'account', user.uid);
      getDoc(userRef).then(docSnap => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if(userData && userData.favorites) {
          const favoriteItems = userData.favorites.map(favorite => {
            return fetchItemDetails(favorite.id, favorite.type);
          });
          Promise.all(favoriteItems).then(favoriteItems => {
            setFavorites(favoriteItems);
            setFavoritesLoaded(true); //to reload the page upon user login
          });
        }
        else {
          //console.log("no favorites");
        }
          //console.log("no userdata");
        }
      });
    }
  }, [user]);

  return (
    <div>
      {user ? (
        <div className="user-info">
          <h1><img className="profile-pic" src={photoURL} alt="Profile" /></h1>
          <div>
            <p>Welcome, {user.displayName}!</p>
            <button className="sign-button" onClick={signOut}>Sign out</button>
          </div>
          <h2 className="title"> ✨My Favorites✨ </h2>
        </div>
      ) : null}
    {!user && (
      <div className="sign-in-section">
        <p>Sign in to save your favorite yarns and patterns!</p>
        <button className="sign-button" onClick={signIn}>Sign in with Google</button>
      </div>
    )}
    {user && (
      <div className="search-results">
        {favorites.length > 0 ? (
          favorites.map((favorite, index) => {
            return <Favorites key={index} item={favorite}/>
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )}
  </div>
);
}

export default Profile;
