import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Loading } from "./Loading";

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const locationPath = useLocation().pathname;

  useEffect(() => {
    console.log(locationPath);
    if (searchTerm !== "") {
      if (locationPath === "/videos") {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${locationPath}/q=${searchTerm}&num=50`);
      }
    }
  }, [searchTerm, locationPath]);

  if (isLoading) {
    return <Loading />;
  }

  switch (locationPath) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.map(({ link, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );

    case "/images":
      return (
        <div className="flex flex-wrap justify-between items-center">
          {results?.map(({ image, link: { href, title } }, index) => (
            <a
              href={href}
              target="_blank"
              key={index}
              rel="noreferrer"
              className="sm:p-3 p-5"
            >
              <img src={image?.src} alt={title} loading="lazy" />
              <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );

    case "/news":
      return (
        <div className="flex flex-wrap justify-between items-center space-y-12 sm:px-56">
          {results?.map(({ id, links, source, title, published }) => (
            <div
              key={id}
              className="md:w-2/5 w-full border-opacity-5 rounded-lg border-gray-200 dark:border-gray-700"
            >
              <a
                href={links?.[0].href}
                target="_blank"
                rel="noreferrer "
                className="hover:underline "
              >
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
              <div className="flex gap-4">
                <a
                  href={source?.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline hover:text-blue-300"
                >
                  {" "}
                  {source?.href}
                </a>
              </div>
              <div className="flex">{new Date(published).toDateString()}</div>
            </div>
          ))}
        </div>
      );

    case "/videos":
      return (
        <div className="flex flex-wrap ">
          {results?.map(
            ({ link, title, description, cite: { domain } }, index) => (
              <div key={index} className="p-2">
                <p className="text-gray-500 dark:text-gray-200">{domain}</p>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline hover:text-blue-300"
                >
                  {" "}
                  <h2 className="font-bold text-2xl">{title}</h2>
                </a>

                <div className="flex">
                  <div className="flex-auto">
                    <ReactPlayer
                      url={link}
                      controls
                      width="200px"
                      height="125px"
                    />
                  </div>
                  <div className="flex-auto px-6">{description}</div>
                </div>
              </div>
            )
          )}
        </div>
      );
    default:
      return "Error!";
  }
};
