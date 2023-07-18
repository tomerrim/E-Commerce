import { Alert } from "react-bootstrap";

export const MessageBox = ({ children, variant }) => {
  return (
    <div className="text-center">
      <Alert variant={variant || "info"}>{children}</Alert>
    </div>
  );
};
