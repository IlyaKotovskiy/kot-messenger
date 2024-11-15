import Block from "../../framework/block";
import ChatController from "../../pages/Chat/ChatController";
import { Message } from "../Message";
import templ from './chatItem.template.hbs?raw';

interface IChatItem {
  id: number,
  isRead: boolean,
  online: boolean,
  activeChat: boolean,
  interlocutorName: string,
  messages: Message[],
  setActiveChatById: (id: number) => void;
}

export class ChatItem extends Block {
  constructor(props: IChatItem) {
    super({
      ...props,
      lastMessage: 'Loading...',
      events: {
        click: () => this.setActiveChat()
      }
    });

    this.setProps({
      lastMessage: this.getLastMessage(),
    });
  }

  public getLastMessage(): string {
    if (this.lists.messages.length > 0) {
      return this.lists.messages[this.lists.messages.length - 1].props.message
    }
    return 'No messages yet';
  }

  public getOnline(): boolean {
    return this.props.online ? this.props.online : false;
  }

  // public getMessages(): Message[] {
  //   return this.lists.messages;
  // }

  public sendMessage(content: string): void {
    const newMessage = ChatController.createMessage(content);
    this.lists.messages.push(newMessage);
    this.setProps({
      lastMessage: this.getLastMessage()
    });
  }

  public setActiveChat(): void {    
    if (!this.props.activeChat) {
      this.props.setActiveChatById(this.props.id);
    }
  }

  protected render(): string {
    return templ;
  }
};
