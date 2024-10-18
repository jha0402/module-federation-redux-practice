import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import createStore from "./redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";

import "./index.css";
import { decrement, increment } from "./redux/modules/counter";

const RemoteApp = React.lazy(() => import("remote_app/RemoteApp"));

const { store, injectReducer } = createStore();

const App = () => {
  const dispatch = useDispatch();
  const counter = useSelector<ReturnType<typeof store.getState>, number>(
    (state) => state.counter.value
  );

  return (
    <div className="container">
      <div>Name: main-app</div>
      <div>Framework: react</div>
      <div>Language: TypeScript</div>
      <div>CSS: Empty CSS</div>
      <div>{counter}</div>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteApp store={store} injectReducer={injectReducer} />
      </Suspense>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("app")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
