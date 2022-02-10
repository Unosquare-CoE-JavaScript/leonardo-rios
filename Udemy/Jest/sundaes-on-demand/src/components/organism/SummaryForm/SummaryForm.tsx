import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SummaryForm: React.FC = () => {
  const [isDisabled, setDisabled] = useState<boolean>(true);

  const checkBoxLabel = (
    <span>
      I agree{" "}
      <span
        style={{ color: "blue" }}
        title={"No ice cream will be actually delivered"}
      >
        Terms And Conditions
      </span>
    </span>
  );
  return (
    <Form.Group controlId="terms-and-conditions">
      <Form.Check
        type="checkbox"
        label={checkBoxLabel}
        onClick={() => setDisabled((state) => !state)}
      />
      <Button disabled={isDisabled} type={"submit"}>
        Confirm Order
      </Button>
    </Form.Group>
  );
};

export default SummaryForm;
