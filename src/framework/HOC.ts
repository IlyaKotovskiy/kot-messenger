import store from "./store";
import Block from "./block";

export function connect(Component: typeof Block) {
  return (props: any = {}) =>
    class ConnectedComponent extends Component {
      constructor() {
        super({ ...props, ...store.getState() });

        store.subscribe(() => {
          console.log("Store обновился");
          this.setProps({ ...store.getState() });
        });
      }
    };
}
