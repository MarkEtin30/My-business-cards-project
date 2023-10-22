import { useContext } from "react";
import { CardListContext } from "../../contexts/CardListContext";
import CardItem from "../CardItem";
import { ThemeContext } from "../../contexts/ThemeContext";
import CardDetails from "../CardDetails";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { BusinessCardsContext } from "../../contexts/BusinessCardsContext";
import { useLocation } from "react-router-dom";

function Searched() {
  const location = useLocation();
  const filteredCards = location.state.filteredCards;

  //
  // This is used later to make large the selected item
  const { selectedItem, searchAlert, setSearchAlert } =
    useContext(CardListContext);

  const { cards, loading } = useContext(BusinessCardsContext);

  const { theme, reversedTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  //because react redirects to chnaged hooks, the momet selectItem(which is a useState instance) changes(with setSelelctedIrem when onClicked), it rediercts to this
  // if and does its codes, therfore it direcets to the component CardDetails that takes the seletedIrem
  if (selectedItem) {
    return (
      <>
        {/* {console.log(selectedItem)} */}
        <center>
          <h2 className={`text-${reversedTheme}`}>Selected Item</h2>
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
      <Container className="mt-3">
        <Row>
          <h1
            className={`card-title text-${
              theme === "dark" ? "light" : "dark"
            } my-3`}
          >
            Search results:
          </h1>

          {filteredCards.map((card) => (
            <Col sm={12} md={6} lg={4} className="mt-3">
              <CardItem key={card.cardId} card={card}></CardItem>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Searched;
