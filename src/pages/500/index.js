import Handlebars from "handlebars"
import templ from './500.template.hbs?raw';
import './500.scss';

export default () => {
    return Handlebars.compile(templ)();
}
