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

  //   {
  //     id: 123,
  //     firstName: "Mark",
  //     middleName: "Meir",
  //     lastName: "Etin",
  //     email: "g@g.com",
  //     password: "1234",
  //     address: "street",
  //     favouriteCardList: [1],
  //     myCards: [],
  //     imageUrl: "",
  //     imageAlt: "",
  //     stateUsa: "",
  //     country: "",
  //     city: "",
  //     street: "",
  //     houseNumber: "",
  //     zip: "",
  //     isBusiness: "",
  //   },
  //   {
  //     id: 1234,
  //     firstName: "George",
  //     middleName: "Bill",
  //     lastName: "Lucas",
  //     email: "a@a.com",
  //     password: "1234",
  //     favouriteCardList: [],
  //     myCards: [],
  //     imageUrl: "",
  //     imageAlt: "",
  //     stateUsa: "",
  //     country: "",
  //     city: "",
  //     street: "",
  //     houseNumber: "",
  //     zip: "",
  //     isBusiness: true,
  //   },
  // ]);

  // const addFavouriteCard = (cardID) => {
  //   let itemId = cardID;
  //   let userFavouriteArray = [...currentLoggedUser.favouriteCardList];
  //   if (!currentLoggedUser.favouriteCardList.find((u) => u === cardID)) {
  //     userFavouriteArray.push(itemId);
  //     console.log("fav");
  //   } else {
  //     let indexToRemove = userFavouriteArray.findIndex((u) => u == cardID);
  //     userFavouriteArray.splice(indexToRemove, 1);
  //     // setHasFavourite(false);
  //     console.log("add");
  //   }

  //   setCurrentLoggedUser({
  //     ...currentLoggedUser,
  //     favouriteCardList: [...userFavouriteArray],
  //   });
  //   console.log(currentLoggedUser.favouriteCardList);
  //   // console.log(currentLoggedUser.favouriteCardList);
  // };

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
