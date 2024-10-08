import './style.scss';
import { render } from './utils/renderDOM';
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
import Block from './framework/block';

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
    new Input({ titleInp: 'Логин', wrapInp: 'input-wrap', input: { type: 'text', name: 'login' } }),
    new Input({ titleInp: 'Пароль', wrapInp: 'input-wrap', input: { type: 'password', name: 'password' } }),
  ],
  submit_btn: new Button({ class: 'submit-btn', text: 'Авторизоваться' }),
  links: [
    new Link({ text: 'Нет аккаунта?' }),
    new Link({ text: 'Забыли пароль?' }),
  ],
});
const page_register = new AuthPage({
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
    new Link({ text: 'Уже есть аккаунт?' }),
  ]
});
const page_settings = new SettingsPage({
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
    new Button({ theme: 'red', class: 'settings-btn', text: 'Quit' }),
    new Button({ theme: 'blue', class: 'settings-btn', text: 'Change Password' }),
  ]
});
const page_changePassword = new SettingsPage({
  name: username,
  profile_settings: [
    new Input({ titleInp: 'Old password: ', wrapInp: 'settings-input-wrap', input: { type: 'password', name: 'oldPassword', value: 'oldpass' } }),
    new Input({ titleInp: 'New password: ', wrapInp: 'settings-input-wrap', input: { type: 'password', name: 'newPassword', value: 'newsdpass' } }),
  ],
  buttons_settings: [
    new Button({ theme: 'red', class: 'settings-btn', text: 'Back' }),
    new Button({ theme: 'blue', class: 'settings-btn', text: 'Save New Password' }),
  ]
});
const chatList = new ChatList({
  chats: [
    new ChatItem({
      id: 1,
      isRead: true,
      online: true,
      activeChat: true,
      interlocutorName: 'Steven',
      messages: [
        new Message({id: 1, message: 'Welcome to the my Messanger :)', author: 'Steven'}),
        new Message({id: 2, message: 'Hello, thanks', author: 'Me'}),
        new Message({id: 3, message: 'It looks cool', author: 'Me'}),
        new Message({id: 4, message: 'Yes, I am glad to hear that', author: 'Steven'}),
      ]
    }),
    new ChatItem({
      id: 2,
      isRead: false,
      online: true,
      activeChat: false,
      interlocutorName: 'John',
      messages: [
        new Message({id: 1, message: 'Welcome', author: 'John'}),
        new Message({id: 2, message: 'Hello', author: 'Me'})
      ]
    }),
  ]
})
const page_chat = new ChatPage({
  chatList,
  interlocutorName: chatList.getActiveChat()?.getInterlocutorName(),
  online: chatList.getActiveChat()?.getOnline() ? 'online' : 'offline',
  messages: chatList.getActiveChat()?.getMessages(),
});

// Простая навигация на уровне клиентской части

// Навигация
const routes: { [key: string]: Block } = {
  '/': page_chat,
  '/login': page_auth,
  '/register': page_register,
  '/settings': page_settings,
  '/change-password': page_changePassword,
  '/404': page_404,
  '/500': page_500,
};

function renderPage(page: Block): void {
  render('app', page);
};

function handleRoute(): void {
  const path = window.location.pathname;
  const page = routes[path] || page_404;
  renderPage(page);
}

function initNavigation(): void {
  document.querySelectorAll('a.nav-link').forEach((link) => {
    link.addEventListener('click', (e: Event) => {
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (href) {
        history.pushState(null, '', href);
        handleRoute();
      }
    })
  });
};

// Рендер начальной страницы
handleRoute();
initNavigation();

window.addEventListener('popstate', handleRoute);
