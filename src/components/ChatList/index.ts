import Block from "../../framework/block";
import { ChatItem } from "../ChatItem";
import templ from './chatList.template.hbs?raw';

interface IChatList {
  chats: ChatItem[]
}

export class ChatList extends Block {
  constructor(props: IChatList) {
    super({ ...props });
  }

  public getActiveChat(): ChatItem | undefined {
    return this.lists.chats.find(chat => chat.props.activeChat);
  }

  protected render(): string {
    return templ;
  }
}
