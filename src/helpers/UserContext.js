// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { USERS } from "../helpers/user.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [currentUser, setUser] = useState(USERS[0]);

  return (
    <>
      <UserContext.Provider value={{ currentUser, setUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export const useUser = () => useContext(UserContext);