import "./chat.scss";
import Block from "../../framework/block";
import templ from "./chat.template.hbs?raw";
import modalContent from './chatModal.template.hbs?raw';
import { ChatList } from "../../components/ChatList";
import ChatController from "./ChatController";
import { Modal } from "../../components/Modal";
import store from "../../framework/store";
import { STORE_EVENTS } from "../../enum";

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
    store.on(STORE_EVENTS.Updated, this.handleStoreUpdate.bind(this));
    this.chatList = this.children.chatList as ChatList;
    this.modal = new Modal({
      title: 'Добавить новый чат',
      content: modalContent,
    });
    this.children.modal = this.modal;
  }

  private handleStoreUpdate(prevState: any, nextState: any): void {
    if (prevState.messages !== nextState.messages) {
      this.setProps({ messages: nextState.messages });
    }
  }

  public handleSendMessage(e: Event): void {
    e.preventDefault();
  
    const input = this._element?.querySelector(
      ".chat-content__message-input"
    ) as HTMLInputElement;
    const messageContent = input.value.trim();
    const activeChat = this.chatList.getActiveChat();
    const message = ChatController.createMessage(messageContent);

    if (activeChat && messageContent) {
      try {
        this.setLists({ 
          messages: [...this.lists.messages, message]
        })
        activeChat.sendMessage(messageContent);
        ChatController.sendMessage(messageContent);
        console.log("Message sent:", messageContent);
        input.value = "";
      } catch (err) {
        console.error(err.message);
      }
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
    ChatController.getUser();
  }

  protected render(): string {
    return templ;
  }
}
