import { Header } from "./Header/Header";
import { Outlet, ScrollRestoration } from "react-router";
import { Footer } from "./Footer/Footer";
import { BackToTop } from "../BackToTop/BackToTop";
import { Toaster } from "../ui/sonner";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ErrorFallback/ErrorFallback";

export const MainLayout = () => {
  return (
    <div className="app">
      <Header />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Outlet />
      </ErrorBoundary>
      <BackToTop />
      <Toaster position="bottom-right" />
      <ScrollRestoration />
      <Footer />
    </div>
  );
};
