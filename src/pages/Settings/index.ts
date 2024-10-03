import './settings.scss';
import Block from "../../framework/block";
import templ from './settings.template.hbs?raw';

export class SettingsPage extends Block {
  constructor(props?: {}) {
    super({...props});
  }

  protected render(): string {
    return templ;
  }
}
