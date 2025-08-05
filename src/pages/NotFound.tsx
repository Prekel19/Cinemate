import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <h1 className="notfound-code">404</h1>
      <h2 className="notfound-title">Content Not Found</h2>
      <p className="notfound-text">
        The movie or show you're looking for has gone missing from
        <br /> our streaming library.
      </p>
      <div className="notfound-buttons">
        <Button className="notfound-btn red" onClick={() => navigate("/")}>
          <Home />
          Back to Home
        </Button>
        <Button className="notfound-btn" onClick={() => navigate(-1)}>
          <ArrowLeft />
          Go Back
        </Button>
      </div>
    </div>
  );
};
