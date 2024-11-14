import { WS_URL } from "../../api/url-api";
import WS from "../../api/WebSocket";
import { ChatItem } from "../../components/ChatItem";
import { ChatList } from "../../components/ChatList";
import { WS_EVENTS } from "../../enum";
import { selectors } from "../../framework/selectors";
import store, { IChat } from "../../framework/store";
import ChatAPI from "./ChatAPI";

interface IChatData {
  id: number;
  title: string;
  lastMessage?: string;
}

class ChatController {
  private chatAPI = ChatAPI;
  private socket?: WS;
  public chats: IChat[];

  public async connectToChat(userId: number, chatId: number): Promise<void> {
    const { token } = await ChatAPI.getToken(chatId);
    const url = `${WS_URL}${userId}/${chatId}/${token}`;
    
    this.socket = new WS(url);
    await this.socket.connect();
    

    this.socket.on(WS_EVENTS.Message, (data) => {
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      if (Array.isArray(parsedData)) {
        selectors.setMessages(parsedData);
        console.log('Old messages are received', parsedData);
      } else {
        selectors.addMessage(parsedData);
        console.log('New message is received', parsedData);
      }
    });

    this.socket.on(WS_EVENTS.Close, (event) => {
      console.log('Connection is closed', event);
    });

    this.socket.on(WS_EVENTS.Error, (event) => {
      console.log('Error connection', event);
    });

    this.getOldMessages();
  }

  public getOldMessages(offset: number = 0): void {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send({ content: offset.toString(), type: 'get old' });
  }

  public async getChats(chatList: ChatList): Promise<void> {
    try {
      const data: IChat[] = await this.chatAPI
        .getChats()
        .then((res) => {
          const data = JSON.parse(res.response);

          data.forEach((elem: IChat) => {
            const chatItem = new ChatItem({
              id: elem.id,
              isRead: true,
              online: true,
              activeChat: false,
              interlocutorName: elem.title,
              messages: [],
              setActiveChatById: chatList.setActiveChatById.bind(chatList),
            });
            chatList.addChat(chatItem);
          });

          return data;
        });

      store.setState({
        chatsData: {
          activeChatId: null,
          chats: data
        },
      });
      console.log(store.getState())
    } catch (err) {
      console.error("Ошибка при получении данных:", err);
    }
  }

  public async createChat(titleChat: {}): Promise<any> {    
    try {
      await this.chatAPI
        .createChat(titleChat)
        .then((res) => console.log('Чат успешно создан! ', res));
    } catch (err) {
      throw new Error('Что-то пошло не так при создании чата.')
    }
  }
}

export default new ChatController();
