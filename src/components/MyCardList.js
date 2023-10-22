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
        console.log(cards[0].Data.createdBy);

        if (currentLoggedUser) {
          // console.log(currentLoggedUser.email);

          if (currentLoggedUser.email == cards[i].Data.createdBy) {
            myCardArray.push(cards[i]);
            // console.log(myCardArray);
          }
        }
      }
      setMyCardArrayState([...myCardArray]);
      // console.log(cards);

      // console.log(myCardArray);
      // console.log(myCardArray[0].Data.city);
    }
  }, [, cards]);

  //because react redirects to chnaged hooks, the momet selectItem(which is a useState instance) changes(with setSelelctedIrem when onClicked), it rediercts to this
  // if and does its codes, therfore it direcets to the component CardDetails that takes the seletedIrem
  if (selectedItem) {
    return (
      <>
        {/* {console.log(selectedItem)} */}
        {/* <h2 className={`text-${reversedTheme}`}>Selected Item:</h2> */}
        <CardDetails></CardDetails>
      </>
    );
  }

  let handleAddCard = () => {
    <>{navigate("/card-form")}</>;
  };

  // let category = "FavouriteCardList";
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
