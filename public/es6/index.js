import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { fetchConfig } from './dataLayer/qproxy/action'
import { pushLog, pushBlockPoint, fetchBlockPoint } from './dataLayer/log/action';
import reducer from './dataLayer/index'
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import HostManageView from './view/ControllerView/HostManageView';
import ServerManageView from './view/ControllerView/ServerManageView';
import PatternManageView from './view/ControllerView/PatternManageView';
import LoggerView from './view/ControllerView/LoggerView';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

import wsClient from './wsClient';
window.qproxy = {
    shouldRefreshConsole: false,
    logClient: null
};

store.dispatch(fetchConfig()).then((ret) => {
    const logServerPort = ret.config.logServerPort || 3000;
    const logClient = window.qproxy.logClient = wsClient(logServerPort);
    logClient
        .on('log', (logData) => {
            store.dispatch(pushLog(logData));
        })
        .on('blockpoint', (logData) => {
            store.dispatch(pushBlockPoint(logData));
        });
});

store.dispatch(fetchBlockPoint());

ReactDom.render(
    <Provider store={store}>
        <Router>
            <Route name="host" path="/" component={HostManageView}/>
            <Route name="server" path="/server" component={ServerManageView}/>
            <Route name="rewrite" path="/rewrite" component={PatternManageView}/>
            <Route name="logger" path="/logger" component={LoggerView}/>
        </Router>
    </Provider>,
    document.getElementById('content')
);