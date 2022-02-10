import UserInput from "./userInput";
import Validatable from "../interfaces/Validatable";

export default class Form implements Validatable {
  userInputs: UserInput[] = [];
  formElement: HTMLFormElement;
  constructor(node: HTMLFormElement, id: string) {
    this.formElement = node;
    this.formElement.id = id;
  }

  addInput = (input: UserInput) => {
    this.userInputs.push(input);
  };

  getFormElement = () => {
    return this.formElement;
  };

  isValid = () => {
    return !this.userInputs.some((userInput) => !userInput.isValid());
  };

  getValues = () => {
    return this.userInputs.map((userInput) => userInput.getValue());
  };

  clearForm = () => {
    this.userInputs.forEach((userInput) => userInput.clear());
  };
}
