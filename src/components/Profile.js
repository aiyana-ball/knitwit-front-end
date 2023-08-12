import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../UserContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Favorites from './Favorites';
import { makeRavelryRequest } from './ravelry';

function Profile() {
  const { user, signIn, signOut } = useContext(UserContext);
  const photoURL = user ? user.photoURL.replace('s96-c', 's125-c') : null;
  const [favorites, setFavorites] = useState([]);

  async function fetchItemDetails(id, type) {
    try {
      let itemData;
      if (type === 'pattern') {
        itemData = await makeRavelryRequest(`patterns/${id}.json`);
      } else if (type === 'yarn') {
        itemData = await makeRavelryRequest(`yarns/${id}.json`); 
      }
      // console.log(itemData);
      return itemData;
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
          const favoriteItems = userData.favorites.map(favorite => {
            // console.log(favorite.id, favorite.type);
            return fetchItemDetails(favorite.id, favorite.type);
          });
          Promise.all(favoriteItems).then(favoriteItems => {
            // console.log(favoriteItems);
            setFavorites(favoriteItems);
          });
        }
      });
    }
  }, [user]);

  return (
    <div>
      {user ? (
        <div className="user-info">
          <h1><img src={photoURL} alt="Profile" /></h1>
          <div>
            <p>Welcome, {user.displayName}!</p>
            <button onClick={signOut}>Sign out</button>
          </div>
        </div>
      ) : (
        <button onClick={signIn}>Sign in with Google</button>
      )}
      {user && (
        <div>
          <h2>Here are your favorites!</h2>
          <div className="search-results">
            {favorites.map((favorite, index) => {
              return (
                <div key={index} className="search-result">
                  {(favorite.yarn && favorite.yarn.photos && favorite.yarn.photos[0]) ? (
                    <>
                      <img src={favorite.yarn.photos[0].small_url} alt={favorite.yarn.name} />
                      <h2>{favorite.yarn.name}</h2>
                    </>
                  ) : favorite.pattern && favorite.pattern.photos && favorite.pattern.photos[0] ? (
                    <>
                      <img src={favorite.pattern.photos[0].small_url} alt={favorite.pattern.name} />
                      <h2>{favorite.pattern.name}</h2>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      </div>
  );
}


export default Profile;
