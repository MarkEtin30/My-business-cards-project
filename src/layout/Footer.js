import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Form, Link, useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { UserListContext } from "../contexts/UserListContext";
import { CardListContext } from "../contexts/CardListContext";
import { AuthContext } from "../contexts/AuthContext";
import { Navbar, Row, Col, Container, Button } from "react-bootstrap";
import { BusinessCardsContext } from "../contexts/BusinessCardsContext";
import Searched from "../components/searched/Searched";

function Footer() {
  const { cards } = useContext(BusinessCardsContext);
  const [searchQuery, setSearchQuery] = useState("");
  const { token, setToken, user } = useContext(AuthContext);
  const { setSelectedItem, setItems } = useContext(CardListContext);
  const {
    currentLoggedUser,
    setCurrentLoggedUser,

    addFavouriteCard,
  } = useContext(UserListContext);

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <footer
      className={`footer bg-${theme} text-${
        theme === "dark" ? "light" : "dark"
      }`}
    >
      <Container>
        <div className="navbar-nav  d-flex flex-column">
          <Row className="p-3">
            {token ? (
              <>
                <>
                  <Col></Col>

                  <Col>
                    <Link to="/about" className="nav-link ">
                      <center>
                        <i class="bi bi-info-circle">
                          <br></br>About
                        </i>
                      </center>
                    </Link>
                  </Col>

                  <Col>
                    <Link to="/favourite-card-list" className="nav-link">
                      <center>
                        <i class="bi bi-heart-fill">
                          <br></br>Favourite Card List
                        </i>
                      </center>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/my-card-list" className="nav-link">
                      <center>
                        <i class="bi bi-person-badge-fill">
                          <br></br>My Card List
                        </i>
                      </center>
                    </Link>
                  </Col>
                  <Col></Col>
                </>
              </>
            ) : (
              <>
                <Link to="/about" className="nav-link ">
                  <center>
                    <i class="bi bi-info-circle">
                      <br></br>About
                    </i>
                  </center>
                </Link>
              </>
            )}
          </Row>
        </div>

        <div className="container text-center py-2">
          <p>
            &copy; 2023 CardCraft Pro - Your Professional Business Card Partner
          </p>
          <p>
            123 Main Street, Cityville, State, 12345 | Phone: 123-456-7890 |
            Email: info@cardcraftpro.com
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
