import type { PropsWithChildren } from "react";
import "./style.scss";

type ContainerProps = PropsWithChildren & {
  className?: string;
};

export const Container = ({ children, className = "" }: ContainerProps) => {
  return <div className={`container ${className}`}>{children}</div>;
};
