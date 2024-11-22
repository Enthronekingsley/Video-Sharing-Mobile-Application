import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/appwrite';

export const GlobalContext = createContext<any>(null);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if(res) {
                    setIsLoggedIn(true)
                    setUser(res as any)
                }else {
                    setIsLoggedIn(false)
                    setUser(null)
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

  return (
    <GlobalContext.Provider value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
    }}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;