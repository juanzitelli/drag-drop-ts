import { Draggable } from "./../model/drag-drop";
import { Component } from "./../components/component-base";
import { Autobind } from "./../decorators/autobind";
import { Project } from "./../model/project";
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  projectTitleElement: HTMLHeadingElement;
  projectDescriptionElement: HTMLParagraphElement;
  projectNumOfPeopleElement: HTMLParagraphElement;

  get persons(): string {
    if (this.project.numberOfPeople === 1) {
      return `1 person`;
    } else {
      return `${this.project.numberOfPeople.toString()} people`;
    }
  }

  constructor(private project: Project, hostId: string) {
    super("single-project", hostId, true, project.id);
    this.projectTitleElement = document.createElement("h3");
    this.projectDescriptionElement = document.createElement("p");
    this.projectNumOfPeopleElement = document.createElement("p");

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.element.id);
    event.dataTransfer!.effectAllowed = "move";
  }
  @Autobind
  dragEndHandler(_: DragEvent): void {}

  configure(): void {
    this.projectTitleElement.textContent = this.project.title;
    this.projectDescriptionElement.textContent = this.project.description;
    this.projectNumOfPeopleElement.textContent = `${this.persons} 👥 assigned`;
    this.element.appendChild(this.projectTitleElement);
    this.element.appendChild(document.createElement("hr"));
    this.element.appendChild(this.projectDescriptionElement);
    this.element.appendChild(this.projectNumOfPeopleElement);
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  renderContent(): void {
    this.hostElement.appendChild(this.element);
  }
}
