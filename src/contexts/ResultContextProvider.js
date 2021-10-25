import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext()
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1/search/q=elon+musk&num=100'

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    // /videos, /search, /images
    const getResults = async (type) => {
        setIsLoading(true)

        const response = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'x-user-agent': 'desktop',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': 'SIGN-UP-FOR-KEY'
              }
        })

        const data = await response.json()

        setResults(data)
        setIsLoading(false)

    }

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading}}>
            { children }
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext)