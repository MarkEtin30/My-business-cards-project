import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Form, Link, useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { UserListContext } from "../contexts/UserListContext";
import { CardListContext } from "../contexts/CardListContext";
import { AuthContext } from "../contexts/AuthContext";
import { Navbar, Row, Col } from "react-bootstrap";
import { BusinessCardsContext } from "../contexts/BusinessCardsContext";
import Searched from "../components/searched/Searched";

function Header() {
  const { cards } = useContext(BusinessCardsContext);
  const [searchQuery, setSearchQuery] = useState("");
  const { token, setToken, user } = useContext(AuthContext);
  const { setSelectedItem, setItems } = useContext(CardListContext);
  const {
    currentLoggedUser,
    setCurrentLoggedUser,

    addFavouriteCard,
  } = useContext(UserListContext);

  const { theme, toggleTheme } = useContext(ThemeContext); //This is a hook that takes variables or objects or functions and make them global across all selected pages, it needs though a seperate page that will make those global varibales work using always
  //the same codes.
  const navigate = useNavigate();
  const { users, setUsers } = useContext(UserListContext);

  const textColor = theme === "dark" ? "text-light" : "text-dark";

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const userName = isLoggedIn ? localStorage.getItem("userName") : "N/A";

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredCards = cards.filter((card) =>
      card.Data.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    navigate("/searched", { state: { filteredCards } });
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setCurrentLoggedUser({
      userId: "",
      email: "",
      name: "",
      role: "",
      projectID: "",
    });

    setToken(null);

    navigate("/");
  };

  return (
    <>
      <Navbar
        className="flex-column d-flex align-items-center justify-content-center"
        collapseOnSelect
        expand="lg"
        bg={theme}
        variant={theme}
        sticky="top"
      >
        <Link
          to="/"
          onClick={() => {
            setSelectedItem(null);
            navigate("/");
          }}
          className="navbar-brand"
        >
          CardCraft Pro
        </Link>{" "}
        <Row className="justify-content-center">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-center"
          >
            <Col>
              {/* Use Link to create a home page link */}
              <div className="container-fluid">
                <div className="navbar-nav">
                  {token ? (
                    <>
                      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active  m-3">
                          <Link to="/about" className="nav-link ">
                            About
                          </Link>
                        </li>

                        <li className="nav-item active  m-3">
                          <Link to="/users" className="nav-link">
                            Users List
                          </Link>
                        </li>

                        <li className="nav-item active  m-3">
                          <Link to="/favourite-card-list" className="nav-link">
                            Favourite Card List
                          </Link>
                        </li>

                        <li className="nav-item active m-3">
                          <Link to="/my-card-list" className="nav-link">
                            My Card List
                          </Link>
                        </li>

                        <li className="nav-item active m-3">
                          <span className="navbar-text mx-3">
                            Hello, {currentLoggedUser.name}
                          </span>

                          <button
                            onClick={handleLogout}
                            className="btn btn-info ms-3"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <div className=" row">
                        <div className="col-3 mx-4">
                          <Link to="/about" className="nav-link m-8">
                            About
                          </Link>
                        </div>
                        <div className="col-3">
                          <Link to={"/login"} className="nav-link">
                            Login
                          </Link>
                        </div>
                        <div className="col-3">
                          <Link to={"/add-user"} className="nav-link">
                            Register
                          </Link>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="form-check form-switch pt-2 ms-3 mt-3">
                    <input
                      type="checkbox"
                      id="cbToggleTheme"
                      className="form-check-input"
                      onChange={toggleTheme}
                      value={theme === "dark"}
                    ></input>
                    <label
                      className={`form-check-label ${textColor}`}
                      htmlFor="cbToggleTheme"
                    >
                      {theme}
                      <i
                        className={`bi bi-${
                          theme === "dark"
                            ? "moon-fill"
                            : "brightness-high-fill"
                        } ms-2`}
                      ></i>
                    </label>
                  </div>
                </div>
                <Col className="">
                  <form className={`d-flex ms-3 p-1 ${theme}`}>
                    <input
                      className="form-control me-3 smaller-search-bar"
                      placeholder="Search"
                      aria-label="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-success"
                      type="submit"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </form>
                </Col>

                <div
                  className={`navbar-brand text-${
                    theme === "dark" ? "light" : "dark"
                  }`}
                ></div>
              </div>
            </Col>
          </Navbar.Collapse>
        </Row>
      </Navbar>
    </>
  );
}
export default Header;
