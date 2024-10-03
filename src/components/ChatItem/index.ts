import Block from "../../framework/block";
import { Message } from "../Message";
import templ from './chatItem.template.hbs?raw';

interface IChatItem {
  id: number,
  isRead: boolean,
  online: boolean,
  activeChat: boolean,
  interlocutorName: string,
  messages: Message[]
}

export class ChatItem extends Block {
  constructor(props: IChatItem) {
    super({
      ...props,
      lastMessage: 'Loading...',
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

  public getInterlocutorName(): string {
    return this.props.interlocutorName;
  }

  public getOnline(): boolean {
    return this.props.online ? this.props.online : false;
  }

  public getMessages(): Message[] {
    return this.lists.messages;
  }

  public sendMessage(content: string): void {
    const newMessage = new Message({ id: Date.now(), message: content, author: 'Me' });
    this.lists.messages.push(newMessage);
    this.setProps({
      messages: [...this.lists.messages, newMessage],
      lastMessage: this.getLastMessage()
    });
  }

  protected render(): string {
    return templ;
  }
};
