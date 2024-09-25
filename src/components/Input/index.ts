import Block from "../../framework/block";
import templ from './input.template.hbs?raw';
import compiler from "../../utils/compiler";

interface IInput {
  type: string;
  name: string;
  class: string;
}

export class Input extends Block {
  constructor(props: IInput) {
    super({...props});
  }

  render(): string {
    return compiler(templ, this.props);
  }
}
