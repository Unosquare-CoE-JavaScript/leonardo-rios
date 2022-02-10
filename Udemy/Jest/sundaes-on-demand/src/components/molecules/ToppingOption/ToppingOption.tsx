import React, { FormEvent } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { getHost } from "../../../utils/utils";

type Props = {
  name: String;
  imagePath: String;
  updateItemCount: (optionName: String, newCount: string) => void;
};
const ToppingOption: React.FC<Props> = ({
  imagePath,
  name,
  updateItemCount,
}) => {
  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    updateItemCount(name, target.checked ? "1" : "0");
  };

  return (
    <Col xs={12} sm={6} md={4} lg={2} style={{ textAlign: "center" }}>
      <img
        src={`${getHost()}/${imagePath}`}
        alt={`${name} topping`}
        style={{ width: "75%" }}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Check type="checkbox" onChange={handleChange} />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
