import './chat.scss';
import Block from "../../framework/block";
import templ from "./chat.template.hbs?raw";
import { ChatList } from '../../components/ChatList';
import { ChatApi } from './ChatAPI';
import { ChatItem } from '../../components/ChatItem';

export class ChatPage extends Block {
  private chatApi: ChatApi;
  constructor(props: {}) {
    super({
      ...props,
      events: {
        submit: (e: Event) => this.handleSendMessage(e)
      }
    });
    this.chatApi = new ChatApi();
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

  public async getChats(): Promise<void> {
    try {
      const data = await this.chatApi.getChats().then(data => JSON.parse(data.response));
      console.log('Получение данных чата: ', data);
      data.map(elem => {
        const chatItem = new ChatItem({
          id: elem.id,
          isRead: true,
          online: true,
          activeChat: false,
          interlocutorName: elem.title,
          messages: []
        });
        console.log(chatItem)
        const newProps = this.children.chatList.lists.chats.push(chatItem);
        this.setProps({newProps});
      })
    } catch (err) {
      console.error('Failed to fetch chats:', err);
    }
  }

  protected componentDidMount(): void {
    this.getChats();
  }

  protected render(): string {
    return templ;
  }
}
