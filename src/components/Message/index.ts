import Block from "../../framework/block";
import templ from './message.template.hbs?raw';

export class Message extends Block {
  constructor(props?: {}) {
    super({...props});
  }
  protected render(): string {
    return templ;
  }
};
