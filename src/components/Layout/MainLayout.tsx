import { Header } from "../Header/Header";
import { Outlet } from "react-router";
import { Footer } from "../Footer/Footer";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
