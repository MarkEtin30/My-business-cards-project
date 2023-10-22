import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ThemeContext } from "../contexts/ThemeContext";

const About = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Container
      className={`footer bg-${theme} text-${
        theme === "dark" ? "light" : "dark"
      }`}
    >
      <Row>
        <Col md={8} className="mx-auto">
          <h2>Welcome to CardCraft Pro!</h2>
          <p>
            At CardCraft Pro, we understand the significance of a perfect first
            impression. That's why we've designed a platform that empowers you
            to create stunning digital business cards, which are not just
            information hubs but also powerful marketing tools.
          </p>
          <h3>What Sets Us Apart:</h3>
          <ul>
            <li>
              <strong>Easy Business Card Creation:</strong> Crafting your
              professional identity is now just a few clicks away. Our intuitive
              interface allows you to design eye-catching business cards
              effortlessly.
            </li>
            <li>
              <strong>Versatile Display Options:</strong> Showcase your business
              in style! Save your digital business card for commercial displays,
              networking events, and more. Make your mark wherever you go.
            </li>
            <li>
              <strong>Card Management Made Simple:</strong> Managing your
              business cards has never been this convenient. Our platform lets
              you edit, update, and even delete cards as your business evolves.
              Keep your information current, always.
            </li>
            <li>
              <strong>Multiple Cards, One Account:</strong> Whether you have
              multiple businesses or want personalized cards for different
              purposes, you can create and manage them all under one account.
              Streamline your professional life with ease.
            </li>
            <li>
              <strong>Save Favorites:</strong> Found a business card that
              resonates with you? Save it as a favorite for quick access. Keep
              track of the contacts that matter most.
            </li>
            <li>
              <strong>Unleash Your Creativity:</strong> Don’t limit yourself to
              pre-made templates. With our customization options, you can design
              a card that mirrors your unique brand identity. From color schemes
              to font choices, the power is in your hands.
            </li>
          </ul>
          <h3>How It Works:</h3>
          <ol>
            <li>
              <strong>Create Your Card:</strong> Choose from our templates or
              start from scratch. Add your logo, contact details, social media
              links, and more.
            </li>
            <li>
              <strong>Save and Share:</strong> Once your card is ready, save it
              to your device. Share it via email, social media, or even print it
              for physical distribution.
            </li>
            <li>
              <strong>Manage with Ease:</strong> Log in to your account anytime,
              anywhere. Edit existing cards, create new ones, and organize your
              favorites effortlessly.
            </li>
          </ol>
          <p>
            At CardCraft Pro, we believe in empowering your business ventures.
            Join us today and revolutionize the way you network, share
            information, and make lasting impressions.
          </p>
          <p>
            Your business card speaks volumes. Let it speak brilliantly with
            CardCraft Pro.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
