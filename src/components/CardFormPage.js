import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserListContext } from "../contexts/UserListContext";
import { CardListContext } from "../contexts/CardListContext";
import { Form, Button, Row, Col } from "react-bootstrap";
import { ThemeContext } from "../contexts/ThemeContext";
import { deleteItem, postItem, updateItem } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { BusinessCardsCategory, defaultCardData } from "../constants/constants";
import { BusinessCardsContext } from "../contexts/BusinessCardsContext";
import CheckValid from "./functions/CheckValid";

const defaultCardData1 = defaultCardData;
const CardFormPage = ({ initialData = {}, onSave, onCancel }) => {
  const { id } = useParams();
  const [cardData, setCardData] = useState({
    ...defaultCardData1,
    ...initialData,
  });
  const [okConformation, setOkConformation] = useState(false);
  const { token, user } = useContext(AuthContext);
  const { cards, addCard, updateCard, deleteCard, loading } =
    useContext(BusinessCardsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { setSelectedItem, selectedItem, setItems, items } =
    useContext(CardListContext);
  const [canSubmit, setCanSubmit] = useState();
  const textColorClass = theme === "dark" ? "text-light" : "text-dark";
  const bgClass = theme === "dark" ? "bg-dark" : "bg-light";
  const [formData, setFormData] = useState({
    phoneValid: "1",
    emailValid: "1",
    secondaryTitleValid: "1",
    titleValid: "1",
    countryValid: "1",
    streetValid: "1",
    descriptionValid: "1",
    cityValid: "1",
    houseNumberValid: "1",
  });
  const propertiesToCheck = [
    "phoneValid",
    "emailValid",
    "secondaryTitleValid",
    "titleValid",
    "countryValid",
    "streetValid",
    "descriptionValid",
    "cityValid",
    "houseNumberValid",
  ];
  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        CheckValid("emailRegex", "email", setFormData, formData, e);
        break;
      case "phone":
        CheckValid("phoneRegex", "phone", setFormData, formData, e);
        break;
      case "secondaryTitle":
        CheckValid(
          "secondaryTitleRegex",
          "secondaryTitle",
          setFormData,
          formData,
          e
        );
        break;
      case "title":
        CheckValid("titleRegex", "title", setFormData, formData, e);
        break;
      case "country":
        CheckValid("countryRegex", "country", setFormData, formData, e);
        break;
      case "street":
        CheckValid("streetRegex", "street", setFormData, formData, e);
        break;
      case "description":
        CheckValid("descriptionRegex", "description", setFormData, formData, e);
        break;
      case "street":
        CheckValid("streetRegex", "street", setFormData, formData, e);
        break;
      case "city":
        CheckValid("cityRegex", "city", setFormData, formData, e);
        break;
      case "houseNumber":
        CheckValid("houseNumberRegex", "houseNumber", setFormData, formData, e);
        break;
      default:
        console.log(``);
    }
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataHasFalse = Object.values(formData).includes(false);
    const formDataHas1 = Object.values(formData).includes("1");
    let isConformationOk;
    if (formDataHasFalse || formDataHas1) {
      isConformationOk = false;
      setCanSubmit(false);
      setOkConformation(false);
    } else {
      setCanSubmit(true);
      setOkConformation(true);
      isConformationOk = true;
    }
    if (isConformationOk == true) {
      handleSave(cardData);
      navigate("/");
    } else {
      alert(
        "Some of the info is wrong, please check if all the required fields are correct"
      );
      isConformationOk = false;
    }
  };
  useEffect(() => {
    if (id) {
      setCardData({ ...selectedItem.Data });
      setEditCard({ ...selectedItem });
      setCanSubmit(true);
      setFormData({
        phoneValid: true,
        emailValid: true,
        secondaryTitleValid: true,
        titleValid: true,
        countryValid: true,
        streetValid: true,
        descriptionValid: true,
        cityValid: true,
        houseNumberValid: true,
      });
    }
  }, [selectedItem, id]);
  const handleSave = async (cardData) => {
    try {
      if (editCard) {
        const updatedData = {
          ...editCard,
          Data: cardData,
        };
        const response = await updateItem(
          token,
          BusinessCardsCategory,
          editCard.ItemID,
          updatedData
        );
        updateCard(response);
        alert("Card updated successfully!");
        setSelectedItem(null);
      } else {
        const cardDataWithUser = {
          ...cardData,
          createdBy: user ? user.email : null,
        };
        const response = await postItem(token, BusinessCardsCategory, {
          Scope: "Public",
          Data: cardDataWithUser,
        });
        addCard(response);
        alert("Card created successfully!");
      }
      setShowAddModal(false);
    } catch (error) {
      console.error("Error saving card:", error);
    }
    setIsLoading(false);
    navigate("/");
  };
  const handleCancel = () => {
    navigate("/");
  };
  return (
    <>
      <Form onSubmit={handleSubmit} className={`${textColorClass} ${bgClass}`}>
        <Row>
          {Object.entries(defaultCardData1)
            .filter(
              ([key]) =>
                key !== "usersIdWhoFavourCardList" &&
                key !== "usersIdWhoSeeCardList" &&
                key !== "createdBy"
            )
            .map(([key], index) => (
              <Col md={index < 2 ? 12 : 6} key={key}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {key == "phone" ? " *(required)" : ""}
                    {key == "email" ? " *(required)" : ""}
                    {key == "secondaryTitle" ? " *(required)" : ""}
                    {key == "title" ? " *(required)" : ""}
                    {key == "country" ? " *(required)" : ""}
                    {key == "street" ? " *(required)" : ""}
                    {key == "description" ? " *(required)" : ""}
                    {key == "city" ? " *(required)" : ""}
                    {key == "houseNumber" ? " *(required)" : ""}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name={key}
                    placeholder={`Enter ${key}`}
                    value={cardData[key] || ""}
                    onChange={handleChange}
                    className={
                      formData[`${key}Valid`] == false ? "is-invalid" : ""
                    }
                  />
                </Form.Group>{" "}
              </Col>
            ))}
        </Row>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </>
  );
};
export default CardFormPage;
