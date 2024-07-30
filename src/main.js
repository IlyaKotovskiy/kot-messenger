import './style.scss';
import Handlebars from 'handlebars';
import NotFoundPage from './pages/404';
import ServerErrorPage from './pages/500';
import AuthPage from './pages/Аuthorization';
import SettingsPage from './pages/Settings';

const app = document.getElementById('app');
const username = 'Илья';

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
const page_settings = SettingsPage({
    name: username,
    profile_settings: [
        {title_input: 'Имя:', type_input: 'text', name_input: 'first_name', value_input: 'Илья'},
        {title_input: 'Фамилия:', type_input: 'text', name_input: 'second_name', value_input: 'Котовский'},
        {title_input: 'Никнейм:', type_input: 'text', name_input: 'display_name', value_input: 'Iluha'},
        {title_input: 'Логин:', type_input: 'text', name_input: 'login', value_input: 'ilya.kot'},
        {title_input: 'Почта:', type_input: 'email', name_input: 'email', value_input: 'ilya.kot.web@gmail.com'},
        {title_input: 'Номер телефона:', type_input: 'tel', name_input: 'phone', value_input: '+79964181340'},
    ],
    buttons_settings: [
        {theme: 'red', title: 'Выйти'},
        {theme: 'blue', title: 'Сменить пароль'}
    ]
});
const page_changePassword = SettingsPage({
    name: username,
    profile_settings: [
        {title_input: 'Старый пароль:', type_input: 'password', name_input: 'oldPassword', value_input: 'oldpass'},
        {title_input: 'Новый пароль:', type_input: 'password', name_input: 'newPassword', value_input: 'newpassword783'},
    ],
    buttons_settings: [
        {theme: 'red', title: 'Назад'},
        {theme: 'blue', title: 'Сохранить новый пароль'}
    ]
})

const result = Handlebars.compile(page_settings)();

app.innerHTML = result;
