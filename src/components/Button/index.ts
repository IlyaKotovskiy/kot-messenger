import Block from "../../framework/block";
import templ from './button.template.hbs?raw';

interface IButton {
  class: string,
  theme?: string,
  text: string,
}

export class Button extends Block {
  constructor(props?: IButton) {
    super({...props});
  }
  
  protected render(): string {
    return templ;
  }
}
