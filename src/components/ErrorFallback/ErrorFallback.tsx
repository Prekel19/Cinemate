import type { FallbackProps } from "react-error-boundary";
import { Button } from "../ui/button";
import "./style.scss";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="error-fallback">
      <h2 className="error-fallback-title">Something went wrong:</h2>
      <p className="error-fallback-message">{error.message}</p>
      <Button onClick={resetErrorBoundary} className="error-fallback-btn">
        Try again
      </Button>
    </div>
  );
};
