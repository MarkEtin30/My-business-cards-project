import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContext } from "../contexts/AuthContext";
import { CardListContext } from "../contexts/CardListContext";
import { useNavigate } from "react-router-dom";
import { BusinessCardsContext } from "../contexts/BusinessCardsContext";
import { deleteItem, updateItem } from "../services/api";
import { UserListContext } from "../contexts/UserListContext";
import { Container, Row, Col, Button } from "react-bootstrap";
function CardDetails({ category }) {
  const [isFavourite, setIsFavourite] = useState();
  const { user } = useContext(AuthContext);
  const { currentLoggedUser, setCurrentLoggedUser, users, setUsers } =
    useContext(UserListContext);
  const { cards, addCard, updateCard, deleteCard, loading } =
    useContext(BusinessCardsContext);
  const { token } = useContext(AuthContext);
  const { theme, reversedTheme } = useContext(ThemeContext);
  const {
    selectedItem,
    setSelectedItem,
    items,
    setItems,
    setFavChange,
    favChange,
  } = useContext(CardListContext);
  const navigate = useNavigate();
  const currentIndex = cards.findIndex((x) => x.ItemID === selectedItem.ItemID);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < cards.length - 1;
  const handlePrevious = () => {
    setSelectedItem(cards[currentIndex - 1]);
  };
  const handleNext = () => {
    {
      console.log(currentIndex);
      console.log(cards);
    }
    setSelectedItem(cards[currentIndex + 1]);
  };
  let handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirmed) {
      deleteItem(token, "BusinessCards", selectedItem.ItemID);
      deleteCard(selectedItem.ItemID);
      setSelectedItem(null);
      navigate("/");
    } else {
      console.log("Deletion cancelled.");
    }
  };
  useEffect(() => {
    let isFavouriteInArray;
    if (user) {
      isFavouriteInArray = selectedItem.Data.usersIdWhoFavourCardList.findIndex(
        (cardIds) => cardIds === user.email
      );
      console.log(isFavouriteInArray + "isFavouriteInArray");
      if (isFavouriteInArray >= 0) {
        setIsFavourite(true);
        setFavChange(true);
      } else {
        setIsFavourite(false);
        setFavChange(false);
      }
    }
  }, [, selectedItem]);
  useEffect(() => {
    console.log(selectedItem.Data.title);
    let address;
    if (user) {
      let indexOfCurrentCard;
      if (cards) {
        indexOfCurrentCard = cards.findIndex(
          (cardfromArray) => cardfromArray.ItemID === selectedItem.ItemID
        );
      }
      if (isFavourite == true) {
        let indicatorForOneIsFav =
          selectedItem.Data.usersIdWhoFavourCardList.findIndex(
            (favId) => favId === user.email
          );

        if (indicatorForOneIsFav == -1) {
          selectedItem.Data.usersIdWhoFavourCardList.push(user.email);
        }
        updateItem(token, "BusinessCards", selectedItem.ItemID, {
          Scope: "Public",
          Data: selectedItem.Data,
        });
      }
      if (isFavourite == false) {
        selectedItem.Data.usersIdWhoFavourCardList.splice(user.email, 1);
        updateItem(token, "BusinessCards", selectedItem.ItemID, {
          Scope: "Public",
          Data: selectedItem.Data,
        });
      }
    }
  }, [selectedItem, isFavourite]);
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <div className="col-4"></div>
            <div className={`card`} style={{ minWidth: "300px" }}>
              <div className={`card`}>
                <img
                  src={selectedItem.Data.imageUrl}
                  alt={selectedItem.Data.imageAlt}
                  className="card-img-top"
                ></img>
                <div className={`card-body bg-${reversedTheme}`}>
                  <h5 className={`card-title text-center text-${theme}`}>
                    {selectedItem.Data.title}
                  </h5>
                  <p className={`card-text text-${theme}`}>
                    {selectedItem.Data.description}
                  </p>
                  <p className={`card-text text-${theme}`}>
                    Address:
                    {` ${selectedItem.Data.state}
      ${selectedItem.Data.city}
      ${selectedItem.Data.street}
      ${selectedItem.Data.houseNumber}
    `}
                  </p>
                  <Col
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                    className="mx-auto text-center"
                  >
                    {selectedItem.Data.createdBy == currentLoggedUser.email ? (
                      <>
                        <Button
                          className="btn btn-info mt-3 "
                          onClick={() =>
                            navigate("/edit-card/" + selectedItem.ItemID)
                          }
                        >
                          <i class="bi bi-pencil"></i>
                        </Button>
                        <span className=" col-md-4 text-center ps-2  "></span>
                        <button
                          className="btn btn-danger mt-3 ms-3"
                          onClick={handleDelete}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </Col>
                  <Col
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                    className="mx-auto text-center"
                  >
                    {token !== null ? (
                      <>
                        {isFavourite == true ? (
                          <button
                            onClick={() => {
                              setIsFavourite(false);
                              setFavChange(false);
                            }}
                            className="btn btn-primary m-3"
                          >
                            <i className=" bi bi-heart-fill text-center ml-4"></i>
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setIsFavourite(true);
                                setFavChange(true);
                              }}
                              className="btn btn-primary m-3"
                            >
                              <i className=" bi bi-heart text-center"></i>
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </Col>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="col-4 text-center ">
                        {hasPrevious ? (
                          <>
                            <Button
                              variant="primary"
                              className="btn-icon"
                              onClick={handlePrevious}
                            >
                              <i className="bi bi-arrow-left"></i>
                            </Button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-4 text-center">
                        <Button
                          variant="secondary"
                          className="btn-icon"
                          onClick={() => {
                            setSelectedItem(null);
                          }}
                        >
                          <i className="bi bi-x-circle"></i>
                        </Button>
                      </div>
                      <div className="col-4 text-center">
                        {hasNext ? (
                          <>
                            <Button
                              variant="primary"
                              className="btn-icon"
                              onClick={handleNext}
                            >
                              <i className="bi bi-arrow-right"></i>
                            </Button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4"></div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default CardDetails;
