import React, { useEffect } from "react";
import reducer, { remoteAppScopeName, setName } from "./redux/modules/name";
import { Provider, useSelector, useDispatch, useStore } from "react-redux";

import "./index.css";
import { Reducer, type Store } from "@reduxjs/toolkit";

const App = () => {
  const dispatch = useDispatch();
  const name = useSelector<
    {
      [remoteAppScopeName]?: {
        value: string;
      };
    },
    string | undefined
  >((state) => state?.[remoteAppScopeName]?.value);

  const store = useStore();

  return (
    <div className="container">
      <div>Name: remote-app</div>
      <div>Framework: react</div>
      <div>Language: TypeScript</div>
      <div>CSS: Empty CSS</div>
      <div>
        <button
          onClick={() => {
            dispatch(setName({ name: "리모트앱" }));
          }}
        >
          change
        </button>
      </div>
      {name && <div>{name}</div>}
    </div>
  );
};

const RemoteAppWrapper: React.FC<
  React.PropsWithChildren<{
    store: Store;
    injectReducer: (scope: string, reducer: Reducer) => void;
  }>
> = ({ store, injectReducer }) => {
  useEffect(() => {
    injectReducer(remoteAppScopeName, reducer);
  }, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default React.memo(RemoteAppWrapper);
