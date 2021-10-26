import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext()
// const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1/search/q=elon+musk&num=100'
const baseUrl = process.env.REACT_APP_BASE_URL;

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('React+Tailwind')

    // /videos, /search, /images
    const getResults = async (urlWithParams) => {
        setIsLoading(true)
console.log(baseUrl, urlWithParams)
        const response = await fetch(`${baseUrl}${urlWithParams}`, {
            method: 'GET',
            headers: {
                'x-user-agent': 'desktop',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_API_KEY
              }
        })

        const data = await response.json()
console.log(data)
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