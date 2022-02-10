import Form from "./components/form";
import ProjectItem from "./components/projectItem";
import UserInput from "./components/userInput";
import ProjectList from "./projectList";
import AppState from "./store/AppState";
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: Form;

  constructor(private state: AppState) {
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
    const values = this.gatherUserInput()!;
    const projectItem = new ProjectItem(
      values[0].toString(),
      values[1].toString(),
      +values[2]
    );
    this.state.insertNewProject(projectItem);
    this.formElement.clearForm();
  };
}

const state = AppState.getInstance();
const prjInput = new ProjectInput(state);
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
state.addListener(activePrjList.listener);
state.addListener(finishedPrjList.listener);
