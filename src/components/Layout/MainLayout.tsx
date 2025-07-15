import { Header } from "../Header/Header";
import { Outlet } from "react-router";
import { Footer } from "../Footer/Footer";

export const MainLayout = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
