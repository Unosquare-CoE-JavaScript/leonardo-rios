import Project from "./Project.js";
import ProjectItem from "../components/projectItem.js";

export default interface State {
  activeProjects: Project[];
  finishedProjects: Project[];
  draggedProject?: ProjectItem;
}
