import React, { FormEvent } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { getHost } from "../../../utils/utils";

type Props = {
  name: String;
  imagePath: String;
  updateItemCount: (optionName: String, newCount: string) => void;
};

const ScoopOption: React.FC<Props> = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    updateItemCount(name, target.value);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        src={`${getHost()}/${imagePath}`}
        alt={`${name} scoop`}
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
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
