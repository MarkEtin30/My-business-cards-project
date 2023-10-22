import { ListProvider } from "../contexts/CardListContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { UserListProvider } from "../contexts/UserListContext";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import CardList from "./CardList";
import MainWrapper from "./MainWrapper";

function HomePage() {
  return <CardList />;
}

export default HomePage;
