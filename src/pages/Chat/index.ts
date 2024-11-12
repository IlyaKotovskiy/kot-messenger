import "./chat.scss";
import Block from "../../framework/block";
import templ from "./chat.template.hbs?raw";
import { ChatList } from "../../components/ChatList";
import ChatController from "./ChatController";

export class ChatPage extends Block {
  private chatList: ChatList;
  constructor(props: {}) {
    super({
      ...props,
      events: {
        submit: (e: Event) => this.handleSendMessage(e),
      },
    });
    this.chatList = this.children.chatList as ChatList;
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
      this.setProps({ messages: activeChat?.getMessages() });
      console.log("Сообщение: ", messageContent);

      input.value = "";
      console.log(this);
    }
  }

  protected componentDidMount(): void {
    ChatController.getChats(this.children.chatList as ChatList);
  }

  protected render(): string {
    return templ;
  }
}
