import './style.scss';
import { ChatPage } from './pages/Chat';
import { ChatItem } from './components/ChatItem';
import { ChatList } from './components/ChatList';
import { Message } from './components/Message';
import { ErrorPage } from './pages/Error';
import { AuthPage } from './pages/Аuthorization';
import { Input } from './components/Input';
import { Link } from './components/Link';
import { Button } from './components/Button';
import { SettingsPage } from './pages/Settings';
import Router from './framework/Router';
import { connect } from './framework/HOC';

const username: string = 'Илья';
const router = new Router('app');

const props_page_404 = {
  status: 404,
  error: 'Страница не найдена'
}
const props_page_500 = {
  status: 500,
  error: 'Внутренняя ошибка сервера'
};
const props_page_auth = {
  title: 'Вход',
  inputs: [
    new Input({ titleInp: 'Логин', wrapInp: 'input-wrap', input: { type: 'text', name: 'login' } }),
    new Input({ titleInp: 'Пароль', wrapInp: 'input-wrap', input: { type: 'password', name: 'password' } }),
  ],
  submit_btn: new Button({ class: 'submit-btn', text: 'Авторизоваться' }),
  links: [
    new Link({ text: 'Нет аккаунта?', to: '/reg' }),
    new Link({ text: 'Забыли пароль?' }),
  ],
};
const props_page_register = {
  title: 'Регистрация',
  inputs: [
    new Input({ titleInp: 'Имя', wrapInp: 'input-wrap', input: { type: 'text', name: 'first_name' } }),
    new Input({ titleInp: 'Фамилия', wrapInp: 'input-wrap', input: { type: 'text', name: 'second_name' } }),
    new Input({ titleInp: 'Логин', wrapInp: 'input-wrap', input: { type: 'text', name: 'login' } }),
    new Input({ titleInp: 'Номер телефона', wrapInp: 'input-wrap', input: { type: 'tel', name: 'phone' } }),
    new Input({ titleInp: 'Email', wrapInp: 'input-wrap', input: { type: 'email', name: 'email' } }),
    new Input({ titleInp: 'Пароль', wrapInp: 'input-wrap', input: { type: 'password', name: 'password' } }),
  ],
  submit_btn: new Button({ class: 'submit-btn', text: 'Зарегистрироваться' }),
  links: [
    new Link({ text: 'Уже есть аккаунт?', to: '/' }),
  ]
};
const props_page_settings = {
  name: username,
  profile_settings: [
    new Input({ titleInp: 'Name: ', wrapInp: 'settings-input-wrap', input: { type: 'text', name: 'first_name', value: 'Ilya' } }),
    new Input({ titleInp: 'Surname: ', wrapInp: 'settings-input-wrap', input: { type: 'text', name: 'second_name', value: 'Kotovskiy' } }),
    new Input({ titleInp: 'Nickname: ', wrapInp: 'settings-input-wrap', input: { type: 'text', name: 'display_name', value: 'ilya.kot' } }),
    new Input({ titleInp: 'Email: ', wrapInp: 'settings-input-wrap', input: { type: 'email', name: 'email', value: 'ilya.kot.web@gmail.com' } }),
    new Input({ titleInp: 'Phone: ', wrapInp: 'settings-input-wrap', input: { type: 'tel', name: 'phone', value: '+79964181340' } }),
    new Input({ titleInp: 'Login: ', wrapInp: 'settings-input-wrap', input: { type: 'text', name: 'login', value: 'ilya.kot26' } }),
  ],
  buttons_settings: [
    new Button({ theme: 'red', class: 'settings-btn', text: 'Quit', linkTo: '/' }),
    new Button({ theme: 'blue', class: 'settings-btn', text: 'Change Password', linkTo: '/change-password' }),
  ]
};
const props_page_changePassword = {
  name: username,
  profile_settings: [
    new Input({ titleInp: 'Old password: ', wrapInp: 'settings-input-wrap', input: { type: 'password', name: 'oldPassword', value: 'oldpass' } }),
    new Input({ titleInp: 'New password: ', wrapInp: 'settings-input-wrap', input: { type: 'password', name: 'newPassword', value: 'newsdpass' } }),
  ],
  buttons_settings: [
    new Button({ theme: 'red', class: 'settings-btn', text: 'Back', linkTo: 'back' }),
    new Button({ theme: 'blue', class: 'settings-btn', text: 'Save New Password' }),
  ]
};
const chatList = new ChatList({
  chats: [
    // new ChatItem({
    //   id: 1,
    //   isRead: true,
    //   online: true,
    //   activeChat: true,
    //   interlocutorName: 'Steven',
    //   messages: [
    //     new Message({id: 1, message: 'Welcome to the my Messanger :)', author: 'Steven'}),
    //     new Message({id: 2, message: 'Hello, thanks', author: 'Me'}),
    //     new Message({id: 3, message: 'It looks cool', author: 'Me'}),
    //     new Message({id: 4, message: 'Yes, I am glad to hear that', author: 'Steven'}),
    //   ]
    // })
  ]
})
const props_page_chat = {
  chatList,
  interlocutorName: chatList.getActiveChat()?.getInterlocutorName(),
  online: chatList.getActiveChat()?.getOnline() ? 'online' : 'offline',
  messages: chatList.getActiveChat()?.getMessages(),
};

const errorPage = connect(ErrorPage);
const authPage = connect(AuthPage);
const settingsPage = connect(SettingsPage);
const chatPage = connect(ChatPage);
router
  .use('/404', errorPage(props_page_404))
  .use('/500', errorPage(props_page_500))
  .use('/', authPage(props_page_auth))
  .use('/reg', authPage(props_page_register))
  .use('/settings', settingsPage(props_page_settings))
  .use('/change-password', settingsPage(props_page_changePassword))
  .use('/chats', chatPage(props_page_chat))

  .start();
