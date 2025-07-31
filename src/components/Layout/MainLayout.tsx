import { Header } from "./Header/Header";
import { Outlet, ScrollRestoration } from "react-router";
import { Footer } from "./Footer/Footer";
import { BackToTop } from "../BackToTop/BackToTop";

export const MainLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <ScrollRestoration />
      <BackToTop />
      <Footer />
    </div>
  );
};
