    import React, { createContext, useContext, useState, useEffect } from 'react';
    import { useColorScheme } from 'react-native';

    const ThemeContext = createContext();

    export function useTheme() {
    return useContext(ThemeContext);
    }

    export function ThemeProvider({ children }) {
    const scheme = useColorScheme(); // Detecta o tema atual (light ou dark)
    const [isDarkMode, setIsDarkMode] = useState(scheme === 'dark');

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    useEffect(() => {
        setIsDarkMode(scheme === 'dark');
    }, [scheme]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
    }
