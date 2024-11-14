import { BaseAPI } from "../../api/base-api";
import { IUser } from "../../interfaces";

class SettingsAPI extends BaseAPI {
  constructor(){
    super('');
  }

  public async getUser(): Promise<any> {
    return this.get('/auth/user');
  }

  public async updateUser(data: IUser) {
    return this.put('/user/profile', { data });
  }

  public async updatePassword(data: {
    oldPassword: string,
    newPassword: string
  }) {
    return this.put('/user/password', { data });
  }
}

export default new SettingsAPI();
