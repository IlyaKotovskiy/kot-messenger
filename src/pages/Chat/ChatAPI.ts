import { BaseAPI } from "../../api/base-api";

export class ChatApi extends BaseAPI {
  constructor(){
    super();
  }

  public async getChats(): Promise<any> {
    return this.get('/chats');
  }

  async register(data: {}): Promise<any> {
    return this.post('/auth/signup', { data });
  }
}
