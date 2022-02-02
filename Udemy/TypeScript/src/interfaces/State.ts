import Project from "./Project";
import ProjectItem from "../components/projectItem";

export default interface State {
  activeProjects: Project[];
  finishedProjects: Project[];
  draggedProject?: ProjectItem;
}
