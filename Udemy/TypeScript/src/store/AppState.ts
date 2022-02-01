import ProjectItem from "../components/projectItem";
import Project from "../interfaces/Project";
import State from "../interfaces/State";
export default class AppState {
  state: {
    activeProjects: Project[];
    finishedProjects: Project[];
    draggedProject?: ProjectItem;
  };

  listeners: ((state: State) => void)[];

  private static instance?: AppState;

  private constructor() {
    this.state = {
      activeProjects: [],
      finishedProjects: [],
    };
    this.listeners = [];
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AppState();
    return this.instance;
  }

  insertNewProject(projectItem: ProjectItem) {
    this.addActiveProject(projectItem);
    this.notifyListeners();
  }

  addActiveProject(project: Project) {
    this.state.activeProjects.push(project);
  }

  addFinishedProject(project: Project) {
    this.state.finishedProjects.push(project);
  }

  moveActiveToFinished = (projectId: number) => {
    const project = this.state.activeProjects.find((p) => p.id === projectId)!;
    this.addFinishedProject(project);
    this.state.activeProjects = this.state.activeProjects.filter(
      (p) => p.id !== projectId
    );
    this.notifyListeners();
  };

  moveFinishedToActive = (projectId: number) => {
    const project = this.state.finishedProjects.find(
      (p) => p.id === projectId
    )!;
    this.addActiveProject(project);
    this.state.finishedProjects = this.state.finishedProjects.filter(
      (p) => p.id !== projectId
    );
    this.notifyListeners();
  };

  getDraggedElement = () => this.state.draggedProject;

  setDraggedElement = (draggable: ProjectItem) =>
    (this.state.draggedProject = draggable);

  addListener = (listener: (state: State) => void) => {
    this.listeners.push(listener);
  };

  notifyListeners = () => {
    this.listeners.forEach((l) => l(this.state));
  };
}
