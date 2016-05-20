'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.qproxyApp = qproxyApp;

var _action = require('../action');

var _hostManage = require('./hostManage');

var _serverManage = require('./serverManage');

var _rewriteManage = require('./rewriteManage');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = _immutable2.default.fromJS({
    config: {
        group: {},
        activated: '',
        rewrite: []
    },
    server: {}
});

function qproxyApp() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    switch (action.type) {

        case _action.RECEIVE_CONFIG:
            return (0, _hostManage.receiveConfig)(action.config, action.server);

        case _action.SELECT_GROUP:
            return (0, _hostManage.selectGroup)(state, action.groupName);

        case _action.SELECT_ENV:
            return (0, _hostManage.selectEnv)(state, action.groupName, action.ruleIndex, action.env);

        case _action.SELECT_HOST:
            return (0, _hostManage.selectHost)(state, action.groupName, action.ruleIndex, action.env, action.host);

        case _action.DELETE_RULE:
            return (0, _hostManage.deleteRule)(state, action.groupName, action.ruleIndex);

        case _action.DELETE_GROUP:
            return (0, _hostManage.deleteGroup)(state, action.groupName);

        case _action.INSERT_GROUP:
            return (0, _hostManage.insertGroup)(state, action.groupName);

        case _action.EDIT_DOMAIN:
            return (0, _hostManage.editDomain)(state, action.groupName, action.ruleIndex, action.domain);

        case _action.INSERT_RULE:
            return (0, _hostManage.insertRule)(state, action.groupName, action.ruleList);

        case _action.SELECT_RULE:
            return (0, _hostManage.selectRule)(state, action.groupName, action.ruleIndex);

        case _action.DESELECT_RULE:
            return (0, _hostManage.deselectRule)(state, action.groupName, action.ruleIndex);

        case _action.MULTI_DELETE_RULE:
            return (0, _hostManage.multiDeleteRule)(state, action.groupName);

        case _action.SET_SERVER:
            return (0, _serverManage.setServer)(state, action.server);

        case _action.SET_PATTERN:
            return (0, _rewriteManage.setPattern)(state, action.index, action.pattern);

        case _action.INSERT_PATTERN:
            return (0, _rewriteManage.insertPattern)(state, action.pattern);

        case _action.DELETE_PATTERN:
            return (0, _rewriteManage.deletePattern)(state, action.index);

        case _action.SWITCH_HTTPS:
            return (0, _hostManage.switchHttps)(state, action.isOn);

        default:
            return state;
    }
}
//# sourceMappingURL=index.js.map
