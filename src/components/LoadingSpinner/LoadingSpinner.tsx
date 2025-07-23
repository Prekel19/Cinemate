import { ClipLoader } from "react-spinners";
import "./style.scss";

export const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <ClipLoader color="#9ca3af80" size={60} />
    </div>
  );
};
