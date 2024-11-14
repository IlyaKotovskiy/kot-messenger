import "./modal.scss";
import Block from "../../framework/block";
import templ from "./modal.template.hbs?raw";
import ChatController from "../../pages/Chat/ChatController";

export class Modal extends Block {
  constructor(props = {}) {
    super({
      ...props,
      events: {
        click: (e: PointerEvent) => this.handleCloseModal(e),
        submit: (e: SubmitEvent) => this.handleSubmitModal(e),
      },
    });

    console.log(props);
  }

  public on(): void {
    this._element?.classList.add("modal--visible");
  }

  public off() {
    this._element?.classList.remove("modal--visible");
  }

  public handleCloseModal(e: Event) {
    if (e.target === document.querySelector("#modalClose")) {
      this.off();
    }
  }

  public handleSubmitModal(e: Event): void {
    if (e.target === document.querySelector(".modal-form")) {
      e.stopImmediatePropagation();
      e.preventDefault();

      const input = this._element?.querySelector(
        ".modal-input"
      ) as HTMLInputElement;
      const chatTitleValue = input.value.trim();

      if (chatTitleValue) {
        ChatController.createChat({ title: chatTitleValue });
        this.off();
      }
    }
  }

  private mountModal(selector: string): void {
    if (!this._element) {
      throw new Error("Нету элемента");
    }
    document.querySelector(selector)?.appendChild(this._element);
  }

  protected componentDidMount(): void {
    this.mountModal("#app");
  }

  protected render(): string {
    return templ;
  }
}
