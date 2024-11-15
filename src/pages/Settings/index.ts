import './settings.scss';
import Block from "../../framework/block";
import templ from './settings.template.hbs?raw';
import SettingsController from './SettingsController';

export class SettingsPage extends Block {
  constructor(props?: {}) {
    super({
      ...props,
      events: {
        // change: (e: Event) => SettingsController.updateData(e),
        click: (e: Event) => SettingsController.handleClick(e)
      }
    });
  }

  protected componentDidMount(): void {
    SettingsController.getUser();        
  }

  protected render(): string {
    return templ;
  }
}
