import Handlebars from 'handlebars';
import templ from './authorization.template.hbs?raw';
import './authorization.scss';

export default (props) => {
    return Handlebars.compile(templ)(props);
}
