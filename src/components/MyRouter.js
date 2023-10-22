import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import { UserListProvider } from "../contexts/UserListContext";
import Header from "../layout/Header";
import { ThemeProvider } from "../contexts/ThemeContext";
import MainWrapper from "./MainWrapper";
import Footer from "../layout/Footer";
import UserFormPage from "./UserFormPage";
import UserListPage from "./UserListPage";
import { CardListProvider } from "../contexts/CardListContext";
import CardFormPage from "./CardFormPage";
import FavouriteCardList from "./FavouriteCardList";
import MyCardList from "./MyCardList";
import About from "./About";
import { AuthProvider } from "../contexts/AuthContext";
import BusinessCardsProvider from "../contexts/BusinessCardsContext";
import UserManagement from "./users/UserManagement";
import ProtectedRoute from "./shared/ProtectedRoute";
import Searched from "./searched/Searched";

function MyRouter() {
  return (
    <>
      <ThemeProvider>
        <MainWrapper>
          <CardListProvider>
            <UserListProvider>
              <AuthProvider>
                <BusinessCardsProvider>
                  <MainWrapper>
                    <BrowserRouter>
                      <Header />
                      <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/login" element={<LoginPage />}></Route>

                        <Route path="/users" element={<ProtectedRoute />}>
                          <Route index element={<UserManagement />} />
                        </Route>

                        <Route
                          path="/add-user"
                          element={
                            <>
                              <UserFormPage></UserFormPage>
                            </>
                          }
                        ></Route>

                        <Route
                          path="/card-form"
                          element={
                            <>
                              <center>
                                <h2> Add Card:</h2>
                              </center>
                              <CardFormPage></CardFormPage>
                            </>
                          }
                        ></Route>

                        <Route
                          path="/edit-card/:id"
                          element={
                            <>
                              <center>
                                <h2>Edit Card</h2>
                              </center>
                              <CardFormPage></CardFormPage>
                            </>
                          }
                        ></Route>

                        <Route
                          path="/favourite-card-list"
                          element={
                            <>
                              <FavouriteCardList></FavouriteCardList>
                            </>
                          }
                        ></Route>

                        <Route
                          path="/my-card-list"
                          element={
                            <>
                              <MyCardList></MyCardList>
                            </>
                          }
                        ></Route>

                        <Route
                          path="/about"
                          element={
                            <>
                              <About></About>
                            </>
                          }
                        ></Route>

                        <Route
                          path="/searched"
                          element={
                            <>
                              <Searched></Searched>
                            </>
                          }
                        ></Route>
                      </Routes>
                      <Footer />
                    </BrowserRouter>
                  </MainWrapper>
                </BusinessCardsProvider>
              </AuthProvider>
            </UserListProvider>
          </CardListProvider>
        </MainWrapper>
      </ThemeProvider>
    </>
  );
}
export default MyRouter;
