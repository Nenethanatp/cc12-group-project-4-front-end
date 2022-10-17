import { Outlet } from "react-router-dom";
import Container from "../container/Container";
import Footer from "../footer/Footer";
import Header from "../header/Header";

function AuthLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default AuthLayout;
