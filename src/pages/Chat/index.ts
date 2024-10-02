import './chat.scss';
import Block from "../../framework/block";
import templ from "./chat.template.hbs?raw";

export class ChatPage extends Block {
  constructor(props: {}) {
    super({
      ...props,
      events: {
        submit: (e: Event) => this.handleSendMessage(e)
      }
    });
  }

  public handleSendMessage(e: Event): void {
    e.preventDefault();
    const input = this._element?.querySelector('.chat-content__message-input') as HTMLInputElement;
    const messageContent = input.value.trim();
    console.log(messageContent)

    if (messageContent) {
      const activeChat = this.children.chatList.lists.chats.find(chat => chat.props.activeChat);
      if (activeChat) {
        activeChat.sendMessage(messageContent);
      }
      this.setProps({ messages: activeChat?.props.messages })
      input.value = '';
    }
  }

  protected render(): string {
    return templ;
  }
}
