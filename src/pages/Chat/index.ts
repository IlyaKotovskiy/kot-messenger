import "./chat.scss";
import Block from "../../framework/block";
import templ from "./chat.template.hbs?raw";
import modalContent from './chatModal.template.hbs?raw';
import { ChatList } from "../../components/ChatList";
import ChatController from "./ChatController";
import { Modal } from "../../components/Modal";

export class ChatPage extends Block {
  private chatList: ChatList;
  private modal: Modal;
  constructor(props: {}) {
    super({
      ...props,
      events: {
        submit: (e: Event) => this.handleSendMessage(e),
        click: (e: Event) => this.click(e)
      },
    });
    this.chatList = this.children.chatList as ChatList;
    this.modal = new Modal({
      title: 'Добавить новый чат',
      content: modalContent,
    });
    this.children.modal = this.modal;
  }

  public handleSendMessage(e: Event): void {
    e.preventDefault();
    const input = this._element?.querySelector(
      ".chat-content__message-input"
    ) as HTMLInputElement;
    const messageContent = input.value.trim();

    if (messageContent) {
      const activeChat = this.chatList.getActiveChat();

      if (activeChat) {
        activeChat.sendMessage(messageContent);
      }
      this.setLists({ messages: activeChat?.getMessages() });
      console.log(activeChat?.getMessages());
      
      console.log("Сообщение: ", messageContent);

      input.value = "";
      console.log(this);
    }
  }

  public click(e: Event): void {
    const btn = this._element?.querySelector("#addChat") as HTMLButtonElement;
    if (e.target === btn) {
      this.modal.on();
    }
  }

  protected componentDidMount(): void {
    ChatController.getChats(this.children.chatList as ChatList);
  }

  protected render(): string {
    return templ;
  }
}
