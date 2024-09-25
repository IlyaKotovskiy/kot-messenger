import './style.scss';
import SettingsPage from './pages/Settings';
import { ErrorPage } from './pages/Error';
import { render } from './utils/renderDOM';
import { AuthPage } from './pages/Аuthorization';
import { Input } from './components/Input';

const username: string = 'Илья';

const page_404 = new ErrorPage({
  status: 404,
  error: 'Страница не найдена'
});
const page_500 = new ErrorPage({
  status: 500,
  error: 'Внутренняя ошибка сервера'
});
const page_auth = new AuthPage({
  title: 'Вход',
  inputs: [
    new Input({ type: 'text', class: 'input', name: 'login' }),
    new Input({ type: 'password', class: 'input', name: 'password' })
    // { type: 'text', title_input: 'Логин', name_input: 'login' },
    // { type: 'password', title_input: 'Пароль', name_input: 'password' },
  ],
  submit_btn: 'Авторизоваться',
  // links: [
  //   'Нет аккаунта?',
  //   'Забыли пароль?'
  // ],
});
// const page_register = new AuthPage({
//   title: 'Регистрация',
//   inputs: [
//     { type: 'text', title_input: 'Имя', name_input: 'first_name' },
//     { type: 'text', title_input: 'Фамилия', name_input: 'second_name' },
//     { type: 'text', title_input: 'Логин', name_input: 'login' },
//     { type: 'tel', title_input: 'Номер телефона', name_input: 'phone' },
//     { type: 'email', title_input: 'Email', name_input: 'email' },
//     { type: 'password', title_input: 'Пароль', name_input: 'password' },
//   ],
//   submit_btn: 'Зарегистрироваться',
//   links: [
//     'Авторизоваться'
//   ]
// });
const page_settings: string = SettingsPage({
  name: username,
  profile_settings: [
    { title_input: 'Имя:', type_input: 'text', name_input: 'first_name', value_input: 'Илья' },
    { title_input: 'Фамилия:', type_input: 'text', name_input: 'second_name', value_input: 'Котовский' },
    { title_input: 'Никнейм:', type_input: 'text', name_input: 'display_name', value_input: 'Iluha' },
    { title_input: 'Логин:', type_input: 'text', name_input: 'login', value_input: 'ilya.kot' },
    { title_input: 'Почта:', type_input: 'email', name_input: 'email', value_input: 'ilya.kot.web@gmail.com' },
    { title_input: 'Номер телефона:', type_input: 'tel', name_input: 'phone', value_input: '+79964181340' },
  ],
  buttons_settings: [
    { theme: 'red', title: 'Выйти' },
    { theme: 'blue', title: 'Сменить пароль' }
  ]
});
const page_changePassword: string = SettingsPage({
  name: username,
  profile_settings: [
    { title_input: 'Старый пароль:', type_input: 'password', name_input: 'oldPassword', value_input: 'oldpass' },
    { title_input: 'Новый пароль:', type_input: 'password', name_input: 'newPassword', value_input: 'newpassword783' },
  ],
  buttons_settings: [
    { theme: 'red', title: 'Назад' },
    { theme: 'blue', title: 'Сохранить новый пароль' }
  ]
});

console.log(page_auth);
render('app', page_auth);

// const profileTemplate = `
//     <div>
//     {{ userName }}
//         {{ button }}
//     </div>
// `;

// class UserProfile extends Block {
//   render() {
//     return this.compile(profileTemplate, {
//             userName: this.props.userName,
//             button: this.props.button,
//         });
//   }
// }

// const profile = new UserProfile({
//     userName: 'John Doe',
//     button: new Button({ text: 'Change name' }),
// });

// render('.app', profile);
