import './errorPage.scss';
import Block from "../../framework/block";
import compiler from "../../utils/compiler";
import templ from './errorPage.template.hbs?raw';

export class ErrorPage extends Block {
  constructor(props?: {}) {
    super({...props});
  }

  protected render(): string {
    return compiler(templ, this.props);
  }
}
