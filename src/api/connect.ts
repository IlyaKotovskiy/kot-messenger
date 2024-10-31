import Block from "../framework/block";
import { Indexed } from "../types/Indexed.t";
import store, { StoreEvents } from "../framework/store";

function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props) {
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        });
      }
    }
  }
}
