import { BaseAPI } from "../../api/base-api";

class ChatAPI extends BaseAPI {
  constructor(){
    super('/chats');
  }

  public async getChats(): Promise<any> {
    return this.get('');
  }

  public async createChat(title: {}): Promise<any> {
    return await this.post('', title);
  }

  public async deleteChat(chatId: {}): Promise<any> {
    return await this.delete('', chatId);
  }
}

export default new ChatAPI();