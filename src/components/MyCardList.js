import { useContext, useEffect, useState } from "react";
import { CardListContext } from "../contexts/CardListContext";
import CardItem from "./CardItem";
import { ThemeContext } from "../contexts/ThemeContext";
import CardDetails from "./CardDetails";
import CardFormPage from "./CardFormPage";
import { useNavigate } from "react-router-dom";
import { UserListContext } from "../contexts/UserListContext";
import { BusinessCardsContext } from "../contexts/BusinessCardsContext";
import { Container, Row, Col } from "react-bootstrap";

function MyCardList() {
  const { items, selectedItem } = useContext(CardListContext);
  const { theme, reversedTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const { cards } = useContext(BusinessCardsContext);
  const { user } = useContext(BusinessCardsContext);

  const { currentLoggedUser, setCurrentLoggedUser, users, setUsers } =
    useContext(UserListContext);
  let myCardArray = [];
  const [myCardArrayState, setMyCardArrayState] = useState();

  useEffect(() => {
    if (cards) {
      myCardArray = [];

      for (let i = 0; i < cards.length; i++) {
        if (currentLoggedUser) {
          if (currentLoggedUser.email == cards[i].Data.createdBy) {
            myCardArray.push(cards[i]);
          }
        }
      }
      setMyCardArrayState([...myCardArray]);
    }
  }, [, cards]);

  if (selectedItem) {
    return (
      <>
        <CardDetails></CardDetails>
      </>
    );
  }

  let handleAddCard = () => {
    <>{navigate("/card-form")}</>;
  };

  return (
    <>
      <div className="min-vh-100 d-flex flex-column">
        <Container>
          <Row>
            <center>
              <h2
                className={`card-title text-${
                  theme === "dark" ? "light" : "dark"
                } my-3`}
              >
                My Card List
              </h2>
            </center>
            <div className="row">
              {myCardArrayState ? (
                myCardArrayState.map((card) => (
                  <Col sm={12} md={6} lg={4} className="mt-3">
                    <CardItem key={card.Data.email} card={card}></CardItem>
                  </Col>
                ))
              ) : (
                <></>
              )}

              <div className="mt-5">
                <button
                  className="btn btn-secondary mt-3 "
                  onClick={handleAddCard}
                >
                  <i class="bi bi-file-plus"> Add Card</i>
                </button>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default MyCardList;
