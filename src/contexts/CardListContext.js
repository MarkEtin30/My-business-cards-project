import { createContext, useState } from "react";

export const CardListContext = createContext();

export function CardListProvider({ children }) {
  const [items, setItems] = useState([
    {
      cardId: 1,
      title: `Business Title 1`,
      secondaryTitle: `Secondary Business Title 1`,
      description: "description 1 ",
      phone: "004-778-5555",
      email: "email1@g.com",
      web: "B1.com",
      imageUrl: "https://picsum.photos/200/100?random=" + 1,
      imageAlt: "image of bussness",
      state: "New York",
      country: "USA",
      city: "New York",
      street: "41 St,",
      houseNumber: "6",
      zip: "555",
      usersIdWhoSeeCardList: [],
      usersIdWhoFavourCardList: [],
      userIdOfCardCreator: "",
    },
    {
      cardId: 2,
      title: `Business Title 2`,
      secondaryTitle: `Secondary Business Title 2`,
      description: "description 2 ",
      phone: "004-778-5555",
      email: "email2@g.com",
      web: "B2.com",
      imageUrl: "https://picsum.photos/200/100?random=" + 2,
      imageAlt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
    {
      cardId: 3,
      title: `Business Title 3`,
      secondaryTitle: `Secondary Business Title 3`,
      description: "description 3 ",
      phone: "004-778-5555",
      email: "email3@g.com",
      web: "B1.com",
      imageUrl: "https://picsum.photos/200/100?random=" + 3,
      imageAlt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [favChange, setFavChange] = useState(null);
  return (
    <CardListContext.Provider
      value={{
        items,
        setItems,
        selectedItem,
        setSelectedItem,
        setFavChange,
        favChange,
      }}
    >
      {children}
    </CardListContext.Provider>
  );
}
