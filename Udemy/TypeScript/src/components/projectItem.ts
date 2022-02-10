import Project from "../interfaces/Project";
import AppState from "../store/AppState";
export default class ProjectItem implements Project {
  element: HTMLLIElement;
  titleElement: HTMLHeadingElement;
  descriptionElement: HTMLParagraphElement;
  peopleElement: HTMLLabelElement;
  id: number;
  constructor(
    public title: string,
    public description: string,
    public people: number,
    public hostElement?: HTMLUListElement
  ) {
    this.element = document.createElement("li");
    this.titleElement = document.createElement("h3");
    this.descriptionElement = document.createElement("p");
    this.peopleElement = document.createElement("label");
    this.titleElement.textContent = title;
    this.descriptionElement.textContent = description;
    this.peopleElement.textContent = people.toString();
    this.id = this.getRandomId();
    this.element.id = this.id.toString();
    this.element.insertAdjacentElement("afterbegin", this.titleElement);
    this.element.insertAdjacentElement("afterbegin", this.descriptionElement);
    this.element.insertAdjacentElement("afterbegin", this.peopleElement);
    this.element.draggable = true;
    this.element.ondragstart = this.onDragStart;
  }

  getRandomId() {
    return Math.floor(Math.random() * 10000000);
  }

  changeHostElement = (newHostElement: HTMLUListElement) => {
    if (this.hostElement) {
      this.hostElement.removeChild(this.element);
    }
    this.hostElement = newHostElement;
    this.attach();
  };

  private attach() {
    this.hostElement!.insertAdjacentElement("beforeend", this.element);
  }

  private onDragStart = () => {
    AppState.getInstance().setDraggedElement(this);
  };
}
