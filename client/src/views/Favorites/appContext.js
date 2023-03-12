import { createContext, useContext } from 'react';
import { useState } from 'react';

const AppContext = createContext(null);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if(context === undefined){
        throw new Error('Appcontext must be within appContextProvider');
    }
    return context;
};

const AppContextProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (book) => {
        const oldFavorites = [...favorites];
        const newFavorites = oldFavorites.concat(book);
        setFavorites(newFavorites);
    };

    const removeFromFavorites = (name) => {
        const oldFavorites = [...favorites];
        const newFavorites = oldFavorites.filter((book) => book.name !== name);
        setFavorites(newFavorites);
    };

    return (
        <AppContext.Provider value={{favorites, addToFavorites, removeFromFavorites}}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;