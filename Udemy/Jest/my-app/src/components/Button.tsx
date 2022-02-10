import React, { useState } from "react";

type Props = {
  primaryColor: string;
  secondaryColor: string;
  disabled: boolean;
};

export const toCamelCase = function (color: String) {
  return color.replace(/\B[A-Z]\B/g, " $&") || {};
};

const Button: React.FC<Props> = ({
  primaryColor,
  secondaryColor,
  disabled,
}) => {
  const [color, setColor] = useState<string>(primaryColor);
  const onClick = () => {
    setColor((color) =>
      color == primaryColor ? secondaryColor : primaryColor
    );
  };
  return (
    <button
      style={{ backgroundColor: disabled ? "gray" : color }}
      onClick={onClick}
      disabled={disabled}
    >
      {color == primaryColor
        ? `Change to ${toCamelCase(secondaryColor)}`
        : `Change to ${toCamelCase(primaryColor)}`}
    </button>
  );
};

export default Button;
