import { createContext, useState } from "react";

export const UserListContext = createContext();

export function UserListProvider({ children }) {
  const [currentLoggedUser, setCurrentLoggedUser] = useState({
    email: "",
    name: "",
    role: "Guest",
    projectID: "5d7d339a-40f4-43df-bedc-92edaa5e6bb3",
  });
  const [users, setUsers] = useState();

  return (
    <UserListContext.Provider
      value={{
        users,
        // setUsers,
        currentLoggedUser,
        setCurrentLoggedUser,
      }}
    >
      {children}
    </UserListContext.Provider>
  );
}
