import { BaseAPI } from "../../api/base-api";

export class AuthAPI extends BaseAPI {
  constructor(){
    super();
  }

  public async login(data: {}): Promise<any> {
    return this.post('/auth/signin', { data });
  }

  async register(data: {}): Promise<any> {
    return this.post('/auth/signup', { data });
  }
}
