import AppState from "./store/AppState";
import State from "./interfaces/State";

export default class ProjectList {
  templateElement: HTMLTemplateElement;
  hostsElement: HTMLDivElement;
  element: HTMLElement;
  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    ) as HTMLTemplateElement;
    this.hostsElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    this.attach();
    this.renderContent();
    this.element.querySelector("ul")!.ondrop = this.onDrop;
    this.element.querySelector("ul")!.ondragover = this.onDragOver;
  }

  listener = (state: State) => {
    let projects = [];
    if (this.type === "active") {
      projects = state.activeProjects;
    } else {
      projects = state.finishedProjects;
    }
    const projectElements = this.element.querySelectorAll("li")!;
    if (projectElements.length < projects.length) {
      const project = projects.find((p) => {
        let exists = false;
        projectElements.forEach(
          (element) => (exists = exists || +element.id === p.id)
        );
        return !exists;
      })!;
      project.changeHostElement(this.element.querySelector("ul")!);
    }
  };

  private attach() {
    this.hostsElement.insertAdjacentElement("beforeend", this.element);
  }

  private renderContent() {
    const listId = `${this.type}-projects-lists`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private onDrop = (event: DragEvent) => {
    console.log(AppState.getInstance().getDraggedElement());
    if (this.type === "active") {
      AppState.getInstance().moveFinishedToActive(
        AppState.getInstance().getDraggedElement()!.id
      );
    } else {
      AppState.getInstance().moveActiveToFinished(
        AppState.getInstance().getDraggedElement()!.id
      );
    }
  };

  private onDragOver = (event: DragEvent) => {
    event.preventDefault();
    return false;
  };
}
