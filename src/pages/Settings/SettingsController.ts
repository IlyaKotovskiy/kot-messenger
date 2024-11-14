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

      console.log(store.getState());
      

      // Пройтись по ключам данных пользователя и установить значение для каждого input
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

  public async updateUserData(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;

    const updatedData = {
      ...store.getState().user,
      [name]: value
    };

    try {
      await settingsAPI.updateUser(updatedData);
      
      store.setState({
        user: updatedData,
        greetings: `Hello, ${updatedData.first_name}!`
      });
      
      console.log("Данные обновлены:", updatedData);
      this.updateGreeting();
    } catch (err) {
      console.error("Ошибка при обновлении данных:", err);
    }
  }

  public async updatePassword(e: Event): Promise<void> {
    const target = e.target as HTMLInputElement;
    
    if (target && target.type === 'password') {
      // Получаем значения для старого, нового и подтвержденного паролей
      const oldPasswordInput = document.querySelector('input[name="oldPassword"]') as HTMLInputElement;
      const newPasswordInput = document.querySelector('input[name="newPassword"]') as HTMLInputElement;
  
      if (!oldPasswordInput || !newPasswordInput) {
        console.error("Не удалось найти один из элементов пароля.");
        return;
      }
  
      const oldPassword = oldPasswordInput.value;
      const newPassword = newPasswordInput.value;
  
      // Проверка, что новый пароль совпадает с подтвержденным и отличается от старого
      if (newPassword && oldPassword !== newPassword) {
        try {
          // Здесь вызывается API для обновления пароля
          await settingsAPI.updatePassword({ oldPassword, newPassword });
          console.log("Пароль успешно обновлен");
        } catch (err) {
          console.error("Ошибка при обновлении пароля:", err);
        }
      } else {
        console.error("Новый пароль и подтвержденный пароль не совпадают или совпадают со старым паролем.");
      }
    }
  }

  public updateData(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target && target.type !== 'password') {
      this.updateUserData(e);
    } else {
      this.updatePassword(e);
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

  public logout(e: Event): void {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' && target.textContent?.trim() === 'Quit') {
      authAPI.logout();
    }
  
  }
}

export default new SettingsController();
