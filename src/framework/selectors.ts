import { IMessage, IUser } from "../interfaces";
import store from "./store";

class Selectors {
  public getUser(): IUser | null {
    return store.getState().user;
  }

  public setMessages(messages: IMessage[]): void {
    const messageItems = messages.reverse();
    store.setState({ messages: messageItems });
  }

  public addMessage(message: IMessage): void {
    const state = store.getState();
    state.messages.push(message);
    store.setState({ messages: state.messages });
  }
}

export const selectors = new Selectors();