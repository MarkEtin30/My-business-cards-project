import "./App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { ThemeProvider } from "./contexts/ThemeContext";

import CardList from "./components/CardList";
import MainWrapper from "./components/MainWrapper";
import MyRouter from "./components/MyRouter";

function App() {
  return (
    <>
      <MyRouter />;
    </>
  );
}

export default App;
