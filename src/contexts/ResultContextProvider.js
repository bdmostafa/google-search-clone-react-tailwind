import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = process.env.REACT_APP_BASE_URL;

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("React+Tailwind");

  // /videos, /search, /images, /news, /scholar
  const getResults = async (urlWithParams) => {
    setIsLoading(true);
    setResults([]);

    const response = await fetch(`${baseUrl}${urlWithParams}`, {
      method: "GET",
      headers: {
        "x-user-agent": "desktop",
        "x-rapidapi-host": "google-search3.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      },
    });

    const data = await response.json();

    if (urlWithParams.includes("/images")) {
      setResults(data.image_results);
    } else if (urlWithParams.includes("/news")) {
      setResults(data.entries);
    } else if (urlWithParams.includes("/scholar")) {
      setResults(data.html);
    } else {
      setResults(data.results);
    }
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
