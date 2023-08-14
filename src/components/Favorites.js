import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../UserContext';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import './SearchResults.css';

function Favorites({ item }) {
  const { user } = useContext(UserContext);
  const [isFavorited, setIsFavorited] = useState(false);
  
  useEffect(() => {
    let unsubscribe;
    if (user) {
      const userRef = doc(db, 'account', user.uid);
      unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.favorites && userData.favorites.some(favorite => favorite.id === item.id)) {
            setIsFavorited(true);
          } else {
            setIsFavorited(false);
          }
        }
      });
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, item]);
  
  const toggleFavorite = async () => {
    if (user) {
      const userRef = doc(db, 'account', user.uid);
      const docSnap = await getDoc(userRef);
      const favoriteItem = { id: item.id, type: item.type };

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.favorites && userData.favorites.some(favorite => favorite.id === item.id)) {
          await updateDoc(userRef, {
            favorites: arrayRemove(favoriteItem)
          });
        } else {
          await updateDoc(userRef, {
            favorites: arrayUnion(favoriteItem)
          }).catch(error => console.error('Error updating document:', error));
        }
      } else {
        await setDoc(userRef, {
          favorites: [favoriteItem]
        }, { merge: true });
        setIsFavorited(true);
      }
    }
  };

  return (
    <div className="search-result">
      <img src={item.first_photo ? item.first_photo.small_url : '/knitwit-logo.png'} alt={item.name}/>
      <h2>
        {item && item.download_location && item.download_location.url 
          ? <a href={item.download_location.url}>{item.name}</a> 
          : item.yarn_company && item.yarn_company.url 
            ? <a href={item.yarn_company.url}>{item.name}</a> 
            : item.name}
      </h2>
      {user && <button className="heart-button" onClick={toggleFavorite}>{isFavorited ? '❤️' : '🤍'}</button>}
    </div>
  );
}

export default Favorites;