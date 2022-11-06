import { createContext, useContext, useState } from "react";

const UserContext = createContext({ userData: {} });

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserContext);
}
