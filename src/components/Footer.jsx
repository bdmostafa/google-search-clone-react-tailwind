import React from "react";
import { Heart } from "../assets/icons/heart.js";

export const Footer = () => {
  return (
    <div className="text-center mt-10 border-t p-10 border-gray-200 dark:border-gray-700">
      Copyright © 2021. All Rights Reserved. Made with <Heart /> by{" "}
      <a href="https://mdmostafa.com" target="_blank" rel="noreferrer">
        Mostafa
      </a>
    </div>
  );
};
