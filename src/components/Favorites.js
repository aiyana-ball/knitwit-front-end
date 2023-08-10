import React, { useContext } from 'react';
import UserContext from '../UserContext';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import './SearchResults.css';

function Favorites({ item }) {
  const { user } = useContext(UserContext);
  
  // console.log(user)
  const toggleFavorite = async () => {
    console.log("toggleFavorite")
    if (user) {
      const userRef = doc(db, 'account', user.uid);
      console.log("user exists")
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        console.log("docSnap exists")
        const userData = docSnap.data();
        if (userData.favorites && userData.favorites.includes(item.id)) {
          //console.log(userData.Favorites)
          console.log("favorites includes item")
          //console.log(item)
          //console.log(item.id)
          await updateDoc(userRef, {
            favorites: arrayRemove(item.id)
          });
        } else {
          console.log("favorites does not include item")
          await updateDoc(userRef, {
            favorites: arrayUnion(item.id)
          }).catch(error => console.error('Error updating document:', error));
        }

      } else {
        console.log("favorites field doesn't exist")
        await setDoc(userRef, {
          favorites: [item.id]
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