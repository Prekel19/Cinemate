import { Header } from "./Header/Header";
import { Outlet, ScrollRestoration } from "react-router";
import { Footer } from "./Footer/Footer";
import { BackToTop } from "../BackToTop/BackToTop";
import { Toaster } from "../ui/sonner";

export const MainLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <BackToTop />
      <Toaster position="bottom-right" />
      <ScrollRestoration />
      <Footer />
    </div>
  );
};
