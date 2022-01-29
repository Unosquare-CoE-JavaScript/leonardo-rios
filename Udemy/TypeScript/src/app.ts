import Form from "./components/form.js";
import UserInput from "./components/userInput.js";
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: Form;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;

    this.hostElement = document.getElementById("app") as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    const formElement = importedNode.firstElementChild as HTMLFormElement;
    this.formElement = new Form(formElement, "user-input");
    this.formElement.addInput(
      new UserInput(formElement.querySelector("#title") as HTMLInputElement, 1)
    );
    this.formElement.addInput(
      new UserInput(
        formElement.querySelector("#description") as HTMLTextAreaElement,
        5
      )
    );
    this.formElement.addInput(
      new UserInput(
        formElement.querySelector("#people") as HTMLInputElement,
        undefined,
        undefined,
        10,
        1
      )
    );

    this.attach();
    this.configure();
  }

  private attach = () => {
    this.hostElement.insertAdjacentElement(
      "afterbegin",
      this.formElement.getFormElement()
    );
  };

  private configure = () => {
    this.formElement
      .getFormElement()
      .addEventListener("submit", this.submitHandler);
  };

  private gatherUserInput = (): (string | number)[] | void => {
    if (this.formElement.isValid()) {
      return this.formElement.getValues();
    } else {
      alert("fill form!!");
    }
  };

  private submitHandler = (event: Event) => {
    event.preventDefault();
    const values = this.gatherUserInput();
    console.log(values);
    this.formElement.clearForm();
  };
}

const prjInput = new ProjectInput();
