import Block from "../../framework/block";
import Router from "../../framework/Router";
import { selectors } from "../../framework/selectors";
import store from "../../framework/store";
import ChatController from "../../pages/Chat/ChatController";
import { ChatItem } from "../ChatItem";
import templ from "./chatList.template.hbs?raw";

interface IChatList {
  chats: ChatItem[];
}

export class ChatList extends Block {
  private activeChatId: number | null = null;
  private router: Router;

  constructor(props: IChatList) {
    super({
      ...props,
      events: {
        click: (e: Event) => this.handleClickSettings(e)
      }
    });
    this.router = new Router('app');
  }

  public handleClickSettings(e: Event): void {
    if (e.target === document.querySelector('.chat-text')) {
      this.router.go('/settings')
    }
  }

  public async setActiveChatById(chatId: number): Promise<void> {
    try {
      const userId = selectors.getUser()?.id;

      if (userId) {
        await ChatController.connectToChat(userId, chatId)
      }
      store.setState({
        chatsData: {
          activeChatId: chatId,
        },
      });
      if (this.activeChatId === chatId) return;

      this.lists.chats.forEach((chat) => {
        chat.setProps({ activeChat: chat.props.id === chatId });
      });

      this.activeChatId = chatId;
      this.setProps({ chats: this.lists.chats });
    } catch (err) {
      throw new Error('Возникла ошибка при подключении WS к чату')
    }
  }

  public addChat(chat: ChatItem): void {
    this.lists.chats.push(chat);
    this.setProps({ ...this.lists.chats, chats: this.lists.chats });
  }

  public getActiveChat(): ChatItem | undefined {
    return this.lists.chats.find((chat) => chat.props.activeChat);
  }

  protected render(): string {
    return templ;
  }
}
