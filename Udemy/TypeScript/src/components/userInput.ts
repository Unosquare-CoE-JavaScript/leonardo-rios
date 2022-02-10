import Validatable from "../interfaces/Validatable";

export default class UserInput implements Validatable {
  constructor(
    private inputElement: HTMLInputElement | HTMLTextAreaElement,
    public minLength?: number,
    public maxLength?: number,
    public max?: number,
    public min?: number
  ) {}

  isValid = () => {
    const value = this.inputElement.value;
    if (typeof value === "string") {
      return (
        (typeof this.minLength === "undefined" ||
          this.minLength <= value.length) &&
        (typeof this.maxLength === "undefined" ||
          value.length <= this.maxLength)
      );
    } else {
      return (
        (typeof this.min === "undefined" || this.min <= value) &&
        (typeof this.max === "undefined" || value <= this.max)
      );
    }
  };

  clear = () => {
    this.inputElement.value = "";
  };

  getValue = (): string | number => {
    return this.inputElement.value;
  };
}
