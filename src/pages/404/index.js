import Handlebars from "handlebars";
import templ from './404.template.hbs?raw';
import './404.scss';

export default () => {
    return Handlebars.compile(templ)();
}
