import { Header } from "./Header/Header";
import { Outlet } from "react-router";
import { Footer } from "./Footer/Footer";
import { BackToTop } from "../BackToTop/BackToTop";

export const MainLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <BackToTop />
      <Footer />
    </div>
  );
};
