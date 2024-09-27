import Block from "../../framework/block";
import templ from './link.template.hbs?raw';

export class Link extends Block {
  constructor(props: {}) {
    super({...props});
  }

  protected render(): string {
    return templ;
  }
}
