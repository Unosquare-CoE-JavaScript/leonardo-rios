export default interface Project {
  title: string;
  description: string;
  people: number;
  id: number;
  changeHostElement: (newHostElement: HTMLUListElement) => void;
}
