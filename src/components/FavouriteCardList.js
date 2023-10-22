import { useContext, useEffect, useRef, useState } from "react";
import { CardListContext } from "../contexts/CardListContext";
import CardItem from "./CardItem";
import { ThemeContext } from "../contexts/ThemeContext";
import CardDetails from "./CardDetails";
import CardFormPage from "./CardFormPage";
import { useNavigate } from "react-router-dom";
import { UserListContext } from "../contexts/UserListContext";
import { BusinessCardsContext } from "../contexts/BusinessCardsContext";
import { Container, Row, Col } from "react-bootstrap";

function FavouriteCardList() {
  const { items, selectedItem, setFavChange, favChange } =
    useContext(CardListContext);
  const { theme, reversedTheme } = useContext(ThemeContext);

  let prevMyFavouriteCardArray = useRef();

  const navigate = useNavigate();

  const { cards, card } = useContext(BusinessCardsContext);
  const { user } = useContext(BusinessCardsContext);

  const { currentLoggedUser, setCurrentLoggedUser, users, setUsers } =
    useContext(UserListContext);
  let myFavouriteCardArray = [];
  const [myFavouriteCardArrayState, setMyFavouriteCardArrayState] = useState();

  useEffect(() => {
    if (currentLoggedUser && cards) {
      let myFavouriteCardArray = cards.filter((card) =>
        card.Data.usersIdWhoFavourCardList.includes(currentLoggedUser.email)
      );
      prevMyFavouriteCardArray = myFavouriteCardArray;
      setMyFavouriteCardArrayState([...myFavouriteCardArray]);
    }
  }, [favChange]);

  if (selectedItem) {
    return (
      <>
        <CardDetails></CardDetails>
      </>
    );
  }

  return (
    <>
      <div className="min-vh-100 d-flex flex-column">
        <Container className="flex-grow-1 my-3">
          <Row sm={12} md={12} lg={12}>
            <div className="container">
              <center>
                <h2
                  className={`card-title text-${
                    theme === "dark" ? "light" : "dark"
                  } my-3`}
                >
                  My Favourite Card List
                </h2>
              </center>
              <div className="row">
                {myFavouriteCardArrayState ? (
                  myFavouriteCardArrayState.map((card) => (
                    <Col sm={12} md={6} lg={4} className="mt-3">
                      <CardItem key={card.Data.email} card={card}></CardItem>
                    </Col>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default FavouriteCardList;
