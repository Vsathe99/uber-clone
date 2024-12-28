import { createContext, useState, useContext, useEffect } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [ captain, setCaptain ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    // Retrieve captain data from local storage on component mount
    useEffect(() => {
        const storedCaptain = localStorage.getItem('captain');
        if (storedCaptain) {
            setCaptain(JSON.parse(storedCaptain));
        }
    }, []);

    // Save captain data to local storage when it changes
    useEffect(() => {
        if (captain) {
            localStorage.setItem('captain', JSON.stringify(captain));
        }
    }, [captain]);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;