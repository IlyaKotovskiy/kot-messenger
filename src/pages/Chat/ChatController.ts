import { ChatItem } from "../../components/ChatItem";
import { ChatList } from "../../components/ChatList";
import store from "../../framework/store";
import ChatAPI from "./ChatAPI";

interface IChatData {
  id: number;
  title: string;
  lastMessage?: string;
}

class ChatController {
  private chatAPI = ChatAPI;
  public chats: IChatData[];

  public async getChats(chatList: ChatList): Promise<void> {
    try {
      const data: IChatData[] = await this.chatAPI
        .getChats()
        .then((res) => {
          const data = JSON.parse(res.response);

          data.forEach((elem: IChatData) => {
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
        chats: data,
      });
    } catch (err) {
      console.error("Ошибка при получении данных:", err);
    }
  }
}

export default new ChatController();
