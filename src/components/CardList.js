import { useContext } from "react";
import { CardListContext } from "../contexts/CardListContext";
import CardItem from "./CardItem";
import { ThemeContext } from "../contexts/ThemeContext";
import CardDetails from "./CardDetails";
import CardFormPage from "./CardFormPage";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { BusinessCardsContext } from "../contexts/BusinessCardsContext";
import { AuthContext } from "../contexts/AuthContext";

function CardList() {
  //
  // This is used later to make large the selected item
  const { token } = useContext(AuthContext);
  const { selectedItem, searchAlert, setSearchALert } =
    useContext(CardListContext);
  const { user } = useContext(AuthContext);

  const { cards, loading } = useContext(BusinessCardsContext);

  const { theme, reversedTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  if (selectedItem) {
    return (
      <>
        <center>
          <h2 className={`text-${reversedTheme}`}>Selected Item:</h2>
        </center>
        <CardDetails></CardDetails>
      </>
    );
  }

  let handleAddCard = () => {
    <>{navigate("/card-form")}</>;
  };

  return (
    <>
      <div className="min-vh-100  flex-column d-flex align-items-center justify-content-center">
        <Container className="m-3 ">
          <Row>
            <center>
              <h2
                className={`card-title text-${
                  theme === "dark" ? "light" : "dark"
                } my-3`}
              >
                Card List
              </h2>
            </center>
            {cards.map((card) => (
              <Col sm={12} md={6} lg={4} className="mt-3">
                <CardItem key={card.cardId} card={card}></CardItem>
              </Col>
            ))}
          </Row>
          <div>
            {token ? (
              <div className="mt-3">
                <button
                  className="btn btn-secondary mt-5 "
                  onClick={handleAddCard}
                >
                  <i class="bi bi-file-plus"> Add Card</i>
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

export default CardList;
