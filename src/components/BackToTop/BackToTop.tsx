import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import "./style.scss";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const buttonVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", buttonVisibility);

    return () => {
      window.removeEventListener("scroll", buttonVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Button className={`backToTop ${isVisible ? "active" : ""}`} onClick={scrollToTop}>
      <ChevronUp size={26} />
    </Button>
  );
};
