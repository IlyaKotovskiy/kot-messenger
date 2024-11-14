import { BaseAPI } from "../../api/base-api";
import { ApiResponse } from "../../interfaces";

class ChatAPI extends BaseAPI {
  constructor(){
    super('/chats');
  }

  public async getChats(): Promise<any> {
    return this.get('');
  }

  public async createChat(data: {}): Promise<any> {
    return await this.post('', { data });
  }

  public async deleteChat(data: {}): Promise<any> {
    return await this.delete('', { data });
  }

  public async getToken(chatId: {}): Promise<ApiResponse> {
    console.log('Токен из ChatAPI: ', chatId);
    
    return await this.post(`/token/${chatId}`);
  }
}

export default new ChatAPI();
