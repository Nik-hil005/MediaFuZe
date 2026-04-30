import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [ watchlist, setWatchlist ] = useState([]);

    // Load from localStorage
        useEffect(() => {
            const stored = localStorage.getItem("your_watchlist");
        if (stored) {
            setWatchlist(JSON.parse(stored));
      }
    }, []);

// save to localStorage
    useEffect(() => {
        localStorage.setItem(
            "your_watchlist",
            JSON.stringify(watchlist)
        );
    }, [watchlist]);


    const toggleWatchlist = (item) => {
        setWatchlist((prev) => {
            const exists = prev.find(
                (fav) => fav.id === item.id && fav.type === item.type
            );
            if (exists) {
                return prev.filter(
                    (fav) => !(fav.id === item.id && fav.type === item.type)
                );
            } else {
                return [ ...prev, item ];
            }
        });
    };

    const isWatchlisted = (item) => {
        return watchlist.some(
            (fav) => fav.id === item.id && fav.type === item.type
        );
    };

    return (
        <AppContext.Provider
            value={{ watchlist, toggleWatchlist, isWatchlisted}}
            >
                {children}
        </AppContext.Provider>
    );      
};

export const useAppContext = () => useContext(AppContext)