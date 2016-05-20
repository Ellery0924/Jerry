'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Navigator = require('./Navigator');

var _Navigator2 = _interopRequireDefault(_Navigator);

var _index = require('./HostManage/index');

var _index2 = _interopRequireDefault(_index);

var _action = require('../action');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = _react2.default.createClass({
    displayName: 'App',
    render: function render() {
        var _props = this.props;
        var dispatch = _props.dispatch;
        var server = _props.server;
        var _props$config = this.props.config;
        var group = _props$config.group;
        var activated = _props$config.activated;
        var multiDeleteDisabled = _props$config.multiDeleteDisabled;

        return _react2.default.createElement(
            'div',
            { className: 'qproxyApp' },
            _react2.default.createElement(_Navigator2.default, null),
            _react2.default.createElement(_index2.default, {
                group: group,
                activated: activated,
                multiDeleteDisabled: multiDeleteDisabled,
                server: server,
                onSelectGroup: function onSelectGroup(groupName) {
                    return dispatch((0, _action.selectGroupAndSave)(groupName));
                },
                onEnvChange: function onEnvChange(groupName, ruleIndex, env) {
                    return dispatch((0, _action.selectEnvAndSave)(groupName, ruleIndex, env));
                },
                onHostChange: function onHostChange(groupName, ruleIndex, env, host) {
                    return dispatch((0, _action.selectHostAndSave)(groupName, ruleIndex, env, host));
                },
                onDeleteRule: function onDeleteRule(groupName, ruleIndex) {
                    return dispatch((0, _action.deleteRuleAndSave)(groupName, ruleIndex));
                },
                onDeleteGroup: function onDeleteGroup(groupName) {
                    return dispatch((0, _action.deleteGroupAndSave)(groupName));
                },
                onInsertGroup: function onInsertGroup(groupName) {
                    return dispatch((0, _action.insertGroupAndSave)(groupName));
                },
                onEditDomain: function onEditDomain(groupName, ruleIndex, domain) {
                    return dispatch((0, _action.editDomainAndSave)(groupName, ruleIndex, domain));
                },
                onInsertRule: function onInsertRule(groupName, ruleList) {
                    dispatch((0, _action.insertRuleAndSave)(groupName, ruleList));
                },
                onSelectRule: function onSelectRule(groupName, ruleIndex) {
                    dispatch((0, _action.selectRule)(groupName, ruleIndex));
                },
                onDeselectRule: function onDeselectRule(groupName, ruleIndex) {
                    dispatch((0, _action.deselectRule)(groupName, ruleIndex));
                },
                onMultiDeleteRule: function onMultiDeleteRule(groupName) {
                    return dispatch((0, _action.multiDeleteRuleAndSave)(groupName));
                }
            })
        );
    }
}); /**
     * Created by Ellery1 on 16/1/1.
     */

function select(state) {
    return state.toJS();
}

exports.default = (0, _reactRedux.connect)(select)(App);
//# sourceMappingURL=HostManageView.js.map
