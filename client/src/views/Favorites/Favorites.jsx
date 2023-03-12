import React from 'react'
import  useAppContext from './appContext';

const Favorites = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useAppContext();
  console.log("favorites are", favorites);
  const favoritesChecker = (name) => {
    const boolean = favorites.some((book) => book.name === name);
    return boolean;
  };
  return <div className='favorites'>
    {favorites.length > 0 ? favorites.map((book) => (
      <div key={book.name} className='book'>
        <div>
          <h4>{book.title}</h4>
        </div>
        <div>
          <img src={book.image_url} alt="#" />
        </div>
        <div>
          {favoritesChecker(book.name) ? (
            <button onClick={() => removeFromFavorites(book.name)}>
              Remove From Favorites
            </button>
          ) : (
            <button onClick={() => addToFavorites(book)}>
              Add To Favorites
            </button>
          )}
        </div>
      </div>
    )):<h1>You currently do not have any favorite books yet!!</h1>}
  </div>
};

export default Favorites;
