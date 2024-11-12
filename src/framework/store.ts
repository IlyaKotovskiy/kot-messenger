import { STORE_EVENTS } from "../enum";
import { Indexed } from "../types/Indexed.t";
import EventBus from "./eventBus";

class Store extends EventBus {
  private state: Indexed = {};

  public getState(): {} {
    return this.state;
  }

  public setState(nextState: {}): void {
    const prevState = this.getState();
    this.state = { ...this.state, ...nextState };

    if (this.listeners[STORE_EVENTS.Updated]) {
      this.emit(STORE_EVENTS.Updated, prevState, nextState);
    }
  }
}

export default new Store();