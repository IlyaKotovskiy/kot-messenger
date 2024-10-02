import Block from "../../framework/block";
import { ChatItem } from "../ChatItem";
import { Message } from "../Message";
import templ from './chatList.template.hbs?raw';

interface IChatList {
  chats: ChatItem[]
}

export class ChatList extends Block {
  constructor(props: IChatList) {
    super({...props});
  }

  public changeActiveChat(chats: ChatItem[]): void {}

  public getCurrentInterlocutorName(): string {
    const currentChat = this.lists.chats.find((chat: ChatItem) => chat.props.activeChat);
    return currentChat.props.interlocutorName;
  }

  public getOnline(): boolean {
    return this.lists.chats.some((chat: ChatItem) => chat.props.online);
  }

  public getMessages(): Message[] {
    const currentChat = this.lists.chats.find((chat: ChatItem) => chat.props.activeChat);
    return currentChat.lists.messages;
  }

  protected render(): string {
    return templ;
  }
};
