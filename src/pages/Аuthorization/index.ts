import './authorization.scss';
import Block from '../../framework/block';
import templ from './authorization.template.hbs?raw';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';

interface IFormData {
  login: string;
  password: string;
  first_name?: string;
  second_name?: string;
  phone?: string;
  email?: string;
}

interface IProps {
  title: string,
  inputs: Input[],
  submit_btn: Button,
  links: Link[],
}

export class AuthPage extends Block {
  constructor(props: IProps) {
    super({
      events: {
        click: (e: Event) => this.handleSubmitData(e)
      },
      ...props,
    });
  }

  // Валидация
  validateField(name: string, value: string): string | null {
    const nameRegex = /^[A-ZА-ЯЁ][a-zа-яё-]{1,}$/u;
    const loginRegex = /^(?!^\d+$)[A-Za-z0-9_-]{3,20}$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    switch (name) {
      case 'login':
        if (!value) return 'Логин не может быть пустым';
        if (!loginRegex.test(value)) return 'Логин может содержать только латинские буквы, цифры, подчеркивания и дефисы, а начинаться с буквы или цифры';
        break;
      case 'password':
        if (!value) return 'Пароль не может быть пустым';
        if (value.length < 8) return 'Пароль должен быть не менее 8 символов';
        break;
      case 'first_name':
        if (!value) return 'Имя не может быть пустым';
        if (value.length <= 2) return 'Имя не должно быть коротким';
        if (!nameRegex.test(value)) return 'Имя должно начинаться с заглавной буквы и содержать только буквы и дефис';
        break;
      case 'second_name':
        if (!value) return 'Фамилия не может быть пустым';
        if (value.length <= 4) return 'Фамилия не должно быть коротким';
        if (!nameRegex.test(value)) return 'Фамилия должно начинаться с заглавной буквы и содержать только буквы и дефис';
        break;
      case 'phone':
        if (!value) return 'Номер телефона не может быть пустым';
        if (!phoneRegex.test(value)) return 'Введите корректный номер телефона';
        break;
      case 'email':
        if (!value) return 'Email не может быть пустым';
        if (!emailRegex.test(value)) return 'Введите корректный email';
        break;
      default:
        return null;
    }
    return null;
  }


  // Показ ошибки под полями
  showError(input: Block, errorMessage: string | null): void {
    const errorElement = input.getContent().parentElement?.querySelector('.error') as HTMLElement;
    if (errorMessage) {
      if (errorElement) {
        errorElement.textContent = errorMessage;
      } else {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error');
        errorDiv.textContent = errorMessage;
        input.getContent().parentElement?.appendChild(errorDiv);
      }
    } else if (errorElement) {
      errorElement.remove();
    }
  }

  // Обработка данных формы и валидация
  handleSubmitData(e: Event): void {
    e.preventDefault();
    let formData = {} as IFormData;
    let hasErrors = false;

    if (e.target === this.children.submit_btn.getContent()) {
      this.lists.inputs.forEach((inp) => {
        const inpName: string = inp.props.input.name;
        const inpValue: string = inp.getValue();
        const errorMessage: string | null = this.validateField(inpName, inpValue);
        const errorDiv: HTMLDivElement | null = document.querySelector('.error');

        if (errorMessage) {
          this.showError(inp, errorMessage);
          hasErrors = true;
          errorDiv?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          throw new Error(`Ошибка валидации полей: ${errorMessage}`);
        } else {
          formData[inpName as keyof typeof formData] = inpValue;
          this.showError(inp, null); // Скрытие ошибки если поле валидно
        }
      });

      if (!hasErrors) {
        console.log('Отправка данных: ', formData);
        formData = {} as IFormData;
        this.lists.inputs.forEach((inp) => inp.clearValue());
      }
    }
  }

  protected render(): string {
    return templ;
  }
}
