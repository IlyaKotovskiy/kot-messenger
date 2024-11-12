import Block from "../../framework/block";
import { ChatItem } from "../ChatItem";
import templ from './chatList.template.hbs?raw';

interface IChatList {
  chats: ChatItem[]
}

export class ChatList extends Block {
  private activeChatId: number | null = null;

  constructor(props: IChatList) {
    super({ ...props });
  }

  public setActiveChatById(chatId: number): void {
    if (this.activeChatId === chatId) return;

    this.lists.chats.forEach(chat => {
      chat.setProps({ activeChat: chat.props.id === chatId });
    });

    this.activeChatId = chatId;
    this.setProps({ chats: this.lists.chats });
  }

  public addChat(chat: ChatItem): void {
    this.lists.chats.push(chat);
    this.setProps({ ...this.lists.chats, chats: this.lists.chats });
  }

  public getActiveChat(): ChatItem | undefined {
    return this.lists.chats.find(chat => chat.props.activeChat);
  }

  protected render(): string {
    return templ;
  }
}
