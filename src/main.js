import './style.scss';
import Handlebars from 'handlebars';
import NotFoundPage from './pages/404';
import ServerErrorPage from './pages/500';
import AuthPage from './pages/Аuthorization';

const app = document.getElementById('app');

const page_404 = NotFoundPage();
const page_500 = ServerErrorPage();
const page_auth = AuthPage({
    title: 'Вход',
    inputs: [
        {type: 'text', title_input: 'Логин', name_input: 'login'},
        {type: 'password', title_input: 'Пароль', name_input: 'password'},
    ],
    submit_btn: 'Авторизоваться',
    links: [
        'Нет аккаунта?',
        'Забыли пароль?'
    ]
});
const page_register = AuthPage({
    title: 'Регистрация',
    inputs: [
        {type: 'text', title_input: 'Имя', name_input: 'first_name'},
        {type: 'text', title_input: 'Фамилия', name_input: 'second_name'},
        {type: 'text', title_input: 'Логин', name_input: 'login'},
        {type: 'tel', title_input: 'Номер телефона', name_input: 'phone'},
        {type: 'email', title_input: 'Email', name_input: 'email'},
        {type: 'password', title_input: 'Пароль', name_input: 'password'},
    ],
    submit_btn: 'Зарегистрироваться',
    links: [
        'Авторизоваться'
    ]
});

const result = Handlebars.compile(page_register)();

app.innerHTML = result;
