import store from "../../framework/store";
import authAPI from "../Аuthorization/authAPI";
import settingsAPI from "./settingsAPI";

class SettingsController {
  public async getUser(): Promise<any> {
    try {
      const data = await settingsAPI
        .getUser()
        .then((res) => JSON.parse(res.response))

      store.setState({
        user: data,
        greetings: `Hello, ${data.first_name}!`,
      });
      
      Object.entries(data).forEach(([key, value]) => {
        const inputElement = document.querySelector(`input[name="${key}"]`) as HTMLInputElement;
        
        if (inputElement) {
          inputElement.value = value ? value.toString() : '';
        }
      });
      this.updateGreeting();
    } catch (err) {
      throw new Error('При получении пользователя произошла ошибка: ', err);
    }
  }

  public async updateUserData(): Promise<void> {
    const inputs = document.querySelectorAll('input:not([type="password"])') as NodeListOf<HTMLInputElement>;

    const updatedData: Record<string, string> = {};
    inputs.forEach((input) => {
      const { name, value } = input;
      if (name) {
        updatedData[name] = value;
      }
    });

    try {
      await settingsAPI.updateUser(updatedData);

      store.setState({
        user: updatedData,
        greetings: `Hello, ${updatedData.first_name}!`
      });

      console.log("Данные успешно обновлены:", updatedData);
      this.updateGreeting();
    } catch (err) {
      console.error("Ошибка при обновлении данных:", err);
    }
  }

  public async updatePassword(): Promise<void> {
    const oldPasswordInput = document.querySelector('input[name="oldPassword"]') as HTMLInputElement;
    const newPasswordInput = document.querySelector('input[name="newPassword"]') as HTMLInputElement;

    if (!oldPasswordInput || !newPasswordInput) {
      console.error("Не удалось найти один из элементов пароля.");
      return;
    }

    const oldPassword = oldPasswordInput.value;
    const newPassword = newPasswordInput.value;

    if (newPassword && oldPassword !== newPassword) {
      try {
        await settingsAPI.updatePassword({ oldPassword, newPassword });
        console.log("Пароль успешно обновлен");
      } catch (err) {
        console.error("Ошибка при обновлении пароля:", err);
      }
    } else {
      console.error("Новый пароль и подтвержденный пароль не совпадают или совпадают со старым паролем.");
    }
  }

  private updateGreeting = () => {
    const greetings = document.querySelector('.greetings');
    const userName = store.getState().greetings ?? `Hello, Guest!`;
    if (greetings) {
      console.log(userName);
      
      greetings.textContent = userName;
    }
  }

  public async handleClick(e: Event): Promise<void> {
    const target = e.target as HTMLElement;

    if (target.textContent?.trim() === 'Save new Data') {
      await this.updateUserData();
    }
    if (target.textContent?.trim() === 'Save New Password') {
      await this.updatePassword();
    }
    if (target.textContent?.trim() === 'Quit') {
      authAPI.logout()
    }
  }
}

export default new SettingsController();
