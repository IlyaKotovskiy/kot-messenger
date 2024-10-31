import { connect } from "./framework/HOC";
import Router from "./framework/Router";
import { ErrorPage } from "./pages/Error";

interface AppState {
  currentPage: string;
}

export class App {
  private state: AppState;
  private appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: 'home',
    };
    this.appElement = document.getElementById('app');
    const errorPage = connect(ErrorPage);
    const router = new Router('app');

    router
      .use('/', errorPage)
  }

  render(): string {
    return '';
  }
}
