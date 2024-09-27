import Block from "../../framework/block";
import templ from './input.template.hbs?raw';

interface IInput {
  titleInp: string,
  wrapInp: string,
  input: {
    type: string,
    name: string,
    value?: string,
  }
}

export class Input extends Block {
  constructor(props: IInput) {
    super({...props});
  }

  render(): string {
    return templ;
  }
}
