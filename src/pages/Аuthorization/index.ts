import './authorization.scss';
import Block from '../../framework/block';
import compiler from '../../utils/compiler';
import templ from './authorization.template.hbs?raw';

export class AuthPage extends Block {
  constructor(props?: {}) {
    super({...props});
    console.log(this.lists.inputs);
  }

  protected render(): string {
    return compiler(templ, this.props);
  }
}
