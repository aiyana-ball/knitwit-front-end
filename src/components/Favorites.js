import React, { useContext } from 'react';
import UserContext from '../UserContext';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import './SearchResults.css';

function Favorites({ item }) {
  const { user } = useContext(UserContext);
  
  // console.log(user)
  const toggleFavorite = async () => {
    // console.log("toggleFavorite")
    if (user) {
      const userRef = doc(db, 'account', user.uid);
      // console.log("user exists")
      const docSnap = await getDoc(userRef);
      const favoriteItem = { id: item.id, type: item.type }; // the item type is in the 'type' field of the 'item' object

      if (docSnap.exists()) {
        // console.log("docSnap exists")
        const userData = docSnap.data();
        if (userData.favorites && userData.favorites.some(favorite => favorite.id === item.id)) {
          // console.log("favorites includes item")
          await updateDoc(userRef, {
            favorites: arrayRemove(favoriteItem)
          });
        } else {
          // console.log("favorites does not include item")
          await updateDoc(userRef, {
            favorites: arrayUnion(favoriteItem)
          }).catch(error => console.error('Error updating document:', error));
        }
      } else {
        // console.log("favorites field doesn't exist")
        await setDoc(userRef, {
          favorites: [favoriteItem]
        }, { merge: true });
      }
    }
  };

  return (
      <div className="search-result">
        <img src={item.first_photo.small_url} alt={item.name}/>
        <h2>{item.name}</h2>
        {user && <button onClick={toggleFavorite}>❤️</button>}
      </div>
  );
}

export default Favorites;