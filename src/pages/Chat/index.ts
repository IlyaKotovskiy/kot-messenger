import './chat.scss';
import Block from "../../framework/block";
import templ from "./chat.template.hbs?raw";
import { ChatList } from '../../components/ChatList';

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

    if (messageContent) {
      const chatList = this.children.chatList as ChatList;
      const activeChat = chatList.getActiveChat();

      if (activeChat) {
        activeChat.sendMessage(messageContent);
      }
      this.setProps({ messages: activeChat?.getMessages() })
      input.value = '';
    }
  }

  protected render(): string {
    return templ;
  }
}
