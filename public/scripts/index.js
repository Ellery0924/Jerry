'use strict';

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = require('redux');

var _action = require('./dataLayer/qproxy/action');

var _index = require('./dataLayer/index');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _HostManageView = require('./view/ControllerView/HostManageView');

var _HostManageView2 = _interopRequireDefault(_HostManageView);

var _ServerManageView = require('./view/ControllerView/ServerManageView');

var _ServerManageView2 = _interopRequireDefault(_ServerManageView);

var _PatternManageView = require('./view/ControllerView/PatternManageView');

var _PatternManageView2 = _interopRequireDefault(_PatternManageView);

var _LoggerView = require('./view/ControllerView/LoggerView');

var _LoggerView2 = _interopRequireDefault(_LoggerView);

require('./logSocket/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore);
var store = createStoreWithMiddleware(_index.qproxyApp);
var root = document.getElementById('content');

store.dispatch((0, _action.fetchConfig)());

_reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
        _reactRouter.Router,
        null,
        _react2.default.createElement(_reactRouter.Route, { name: 'host', path: '/', component: _HostManageView2.default }),
        _react2.default.createElement(_reactRouter.Route, { name: 'server', path: '/server', component: _ServerManageView2.default }),
        _react2.default.createElement(_reactRouter.Route, { name: 'rewrite', path: '/rewrite', component: _PatternManageView2.default }),
        _react2.default.createElement(_reactRouter.Route, { name: 'logger', path: '/logger', component: _LoggerView2.default })
    )
), root);
//# sourceMappingURL=index.js.map
