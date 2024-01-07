"use client";

import React, { useEffect, useState } from "react";

export const Followers = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/test")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  return (
    <div>
      <h1>Instagram User Data</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        userData && <pre>{JSON.stringify(userData, null, 2)}</pre>
      )}
    </div>
  );
};
