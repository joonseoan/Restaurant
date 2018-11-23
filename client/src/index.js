import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReduxPromise from "redux-promise";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./components/App";
import GuestbookAllPosted from "./guestbooks/guestbook_all_posted";
import GuestbookNewCreated from "./guestbooks/guestbook_new_created";
import EmailPasswordInput from "./guestbooks/email_password_input";
import GuestbookList from "./guestbooks/geustbook_list";
//import Background from "./components/Bill/Background";

import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route
            exact
            path="/guestbookAllPosted"
            component={GuestbookAllPosted}
          />
          <Route exact path="/guestbookList" component={GuestbookList} />
          <Route
            exact
            path="/guestbookNewCreated"
            component={GuestbookNewCreated}
          />
          <Route
            exact
            path="/emailPasswordInput"
            component={EmailPasswordInput}
          />
          {/* 
            <Route exact path="/background" component={Background} />
           */}
          <Route exact path="/" component={App} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
