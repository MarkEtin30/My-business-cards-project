import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { CardListContext } from "../contexts/CardListContext";
import { UserListContext } from "../contexts/UserListContext";
import { Card, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

import {
  Globe,
  Facebook,
  Linkedin,
  Telephone,
  Envelope,
  GeoAlt,
} from "react-bootstrap-icons";
import { AuthContext } from "../contexts/AuthContext";
import { BusinessCardsContext } from "../contexts/BusinessCardsContext";
import { deleteItem, updateItem } from "../services/api";

function CardItem({ card }) {
  const { theme, reversedTheme } = useContext(ThemeContext);
  const { setSelectedItem, setItems, items, favChange, setFavChange } =
    useContext(CardListContext);
  const { token } = useContext(AuthContext);
  const { deleteCard, setCards, cards, updateCard } =
    useContext(BusinessCardsContext);
  const { user } = useContext(AuthContext);

  const { currentLoggedUser, setCurrentLoggedUser, users, setUsers } =
    useContext(UserListContext);

  let handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (isConfirmed) {
      deleteItem(token, "BusinessCards", card.ItemID);
      deleteCard(card.ItemID);
    } else {
      console.log("Deletion cancelled.");
    }
  };

  const [isFavourite, setIsFavourite] = useState(null);

  let addFavouriteCard = () => {};

  useEffect(() => {
    let isFavouriteInArray;
    if (user) {
      isFavouriteInArray = card.Data.usersIdWhoFavourCardList.findIndex(
        (cardIds) => cardIds === user.email
      );
      if (isFavouriteInArray >= 0) {
        setFavChange(true);
        setIsFavourite(true);
      }
    }
  }, [, user]);

  useEffect(() => {
    let isFavouriteInArray;
    if (user) {
      let indexOfCurrentCard;
      if (cards) {
        indexOfCurrentCard = cards.findIndex(
          (cardfromArray) => cardfromArray.ItemID === card.ItemID
        );
      }

      if (isFavourite === true) {
        let indicatorForOneIsFav = card.Data.usersIdWhoFavourCardList.findIndex(
          (favId) => favId === user.email
        );

        if (indicatorForOneIsFav == -1) {
          card.Data.usersIdWhoFavourCardList.push(user.email);
        }

        updateItem(token, "BusinessCards", card.ItemID, {
          Scope: "Public",
          Data: card.Data,
        });
      }
      if (isFavourite === false) {
        card.Data.usersIdWhoFavourCardList.splice(user.email, 1);
        updateItem(token, "BusinessCards", card.ItemID, {
          Scope: "Public",
          Data: card.Data,
        });
        // );
      }
    }
    updateCard(card);
  }, [, isFavourite]);

  return (
    <>
      <Container className="p-5">
        <div className="col-12 mb-3" style={{ height: "500px" }}>
          <div
            className={`card h-100 bg-${
              theme === "dark" ? "dark" : "light"
            } text-${theme}`}
          >
            <img
              src={card.Data.imageUrl}
              alt={card.Data.imageAlt}
              className="card-img-top"
              style={{ height: "200px", width: "100%", objectFit: "cover" }}
              onClick={() => {
                setSelectedItem({ ...card });
              }}
            />

            <div
              className={`card-body bg-${theme === "dark" ? "light" : "dark"}`}
            >
              <h5 className={`card-title text-${theme} my-3`}>
                {card.Data.title}
              </h5>
              <h6 className={`card-title text-${theme} `}>
                {card.Data.secondaryTitle}
              </h6>
              <hr className="hr" />
              <div>
                <p className={`card-text text-${theme}`}>
                  Phone: {card.Data.phone}
                </p>

                <p className={`card-text text-${theme}`}>
                  Address:
                  {` ${card.Data.state} 
                  ${card.Data.city} 
                  ${card.Data.street} 
                  ${card.Data.houseNumber} 
                `}
                </p>
              </div>

              <div className="row text-center container-fluid ps-4 pt-3">
                <span className="col-md-4 text-centers p-2 ">
                  <a
                    href={`tel:${card.Data.phone}`}
                    className="btn btn-primary btn-sm"
                  >
                    <i className="bi bi-telephone text-center"></i>
                  </a>
                </span>
                <span className=" col-md-4 text-center p-2 ">
                  {token !== null ? (
                    <>
                      {isFavourite === true ? (
                        <button
                          onClick={() => {
                            setIsFavourite(false);
                            setFavChange(false);
                          }}
                          className="btn btn-primary btn-sm"
                        >
                          <i className=" bi bi-heart-fill text-center"></i>
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setIsFavourite(true);
                              setFavChange(true);
                            }}
                            className="btn btn-primary btn-sm"
                          >
                            <i className=" bi bi-heart text-center"></i>
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </span>

                {card.Data.createdBy == currentLoggedUser.email ? (
                  <>
                    <span className=" col-md-4 text-center p-2">
                      <button
                        onClick={handleDelete}
                        className="btn btn-danger btn-sm text-center"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default CardItem;
