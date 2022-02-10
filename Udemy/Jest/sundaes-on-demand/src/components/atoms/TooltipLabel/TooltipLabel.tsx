import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

type Props = {
  message: String;
  tooltipMessage: String;
};

const TooltipLabel: React.FC<Props> = ({ message, tooltipMessage }) => {
  const popover = (
    <Popover role={"tooltip"}>
      <Popover.Body>{tooltipMessage}</Popover.Body>
    </Popover>
  );
  return (
    <OverlayTrigger placement="top" overlay={popover}>
      <span>{message}</span>
    </OverlayTrigger>
  );
};

export default TooltipLabel;
