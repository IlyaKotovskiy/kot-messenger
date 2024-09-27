import './authorization.scss';
import Block from '../../framework/block';
import templ from './authorization.template.hbs?raw';

export class AuthPage extends Block {
  constructor(props?: {}) {
    super({...props});
  }

  protected render(): string {
    return templ;
  }
}
