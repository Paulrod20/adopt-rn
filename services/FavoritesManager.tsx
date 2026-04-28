import React, { createContext, useContext, useState } from 'react';
import { Shelter } from '../models/Shelter';

// Like my swift ObservableObject
interface FavoritesContextType {
    favorites: Shelter[];
    addFavorite: (shelter: Shelter) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

// createContext is like defining the @EnvironmentObject in SwiftUI
const FavoritesContext = createContext<FavoritesContextType | null>(null);

// This wraps the app
export function FavoritesProvider({ children }: { children: React.ReactNode }) { 
    const [favorites, setFavorites] = useState<Shelter[]>([]);

    const addFavorite = (shelter: Shelter) => {
        setFavorites(prev => [...prev, shelter]);
    };

    const removeFavorite = (id: string) => {
        setFavorites(prev => prev.filter(shelter => shelter.id !== id));
    };

    const isFavorite = (id: string) => {
        return favorites.some(shelter => shelter.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

// how a component accesses the favorites
export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
