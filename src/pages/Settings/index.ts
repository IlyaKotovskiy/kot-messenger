import Handlebars from "handlebars";
import templ from './settings.template.hbs?raw';
import './settings.scss';

export default (props?: {}): string => {
  return Handlebars.compile(templ)(props);
}
