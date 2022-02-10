import React from "react";
import Alert from "react-bootstrap/Alert";

type Props = {
  message: String;
  variant?: string;
};
const AlertBanner: React.FC<Props> = ({ message, variant }) => {
  return (
    <Alert
      role="alert"
      style={{ backgroundColor: "red" }}
      variant={variant || "danger"}
    >
      {message}
    </Alert>
  );
};

export default AlertBanner;
