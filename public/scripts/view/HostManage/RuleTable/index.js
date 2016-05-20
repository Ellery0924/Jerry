'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by Ellery1 on 16/1/1.
                                                                                                                                                                                                                                                                   */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Rule = require('./Rule');

var _Rule2 = _interopRequireDefault(_Rule);

var _InsertGroupModal = require('./InsertGroupModal');

var _InsertGroupModal2 = _interopRequireDefault(_InsertGroupModal);

var _InsertRuleModal = require('./InsertRuleModal');

var _InsertRuleModal2 = _interopRequireDefault(_InsertRuleModal);

var _ExportHostListModal = require('./ExportHostListModal');

var _ExportHostListModal2 = _interopRequireDefault(_ExportHostListModal);

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'RuleTable',
    render: function render() {
        var _props = this.props;
        var activated = _props.activated;
        var group = _props.group;
        var server = _props.server;
        var multiDeleteDisabled = _props.multiDeleteDisabled;
        var onEnvChange = _props.onEnvChange;
        var onHostChange = _props.onHostChange;
        var onDeleteRule = _props.onDeleteRule;
        var onEditDomain = _props.onEditDomain;
        var onInsertGroup = _props.onInsertGroup;
        var onSelectRule = _props.onSelectRule;
        var onDeselectRule = _props.onDeselectRule;
        var onMultiDeleteRule = _props.onMultiDeleteRule;
        var onInsertRule = _props.onInsertRule;

        var currentGroup = group[activated],
            isAllSelected = currentGroup && currentGroup.length && currentGroup.every(function (rule) {
            return rule.selected;
        });

        return _react2.default.createElement(
            'div',
            { className: 'col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main' },
            _react2.default.createElement(
                'div',
                { id: 'groupView' },
                _react2.default.createElement(
                    'div',
                    { className: 'page-header' },
                    _react2.default.createElement(
                        'h1',
                        null,
                        '当前分组:',
                        activated
                    ),
                    activated !== 'default' ? _react2.default.createElement(
                        'button',
                        {
                            className: 'btn btn-danger rm_group',
                            onClick: this.deleteGroup
                        },
                        '删除当前分组'
                    ) : null,
                    _react2.default.createElement(
                        'button',
                        {
                            className: 'btn btn-success add_group',
                            'data-target': '#newGroupModal',
                            'data-toggle': 'modal'
                        },
                        '添加分组'
                    ),
                    _react2.default.createElement(
                        'button',
                        {
                            className: 'btn btn-primary add_rule_multi',
                            'data-target': '#addRuleMultiModal',
                            'data-toggle': 'modal'
                        },
                        '添加规则'
                    ),
                    _react2.default.createElement(
                        'button',
                        { disabled: multiDeleteDisabled ? 'disabled' : null, className: 'btn btn-danger multi-delete',
                            onClick: this.multiDeleteRule },
                        '批量删除'
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-info export_host', 'data-target': '#exportHostModal', 'data-toggle': 'modal' },
                        '导出host'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'group_setting' },
                    _react2.default.createElement(
                        'table',
                        { className: 'group_setting_table table table-striped table-hover' },
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'th',
                                    { className: 'rule-select' },
                                    _react2.default.createElement('input', { type: 'checkbox', checked: isAllSelected, name: 'rule-select-all',
                                        onChange: this.toggleSelectAll })
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: 'domain' },
                                    '域'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: 'env' },
                                    '环境'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: 'host' },
                                    'host'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: 'action' },
                                    '操作'
                                )
                            ),
                            currentGroup ? currentGroup.map(function (groupData, i) {
                                return _react2.default.createElement(_Rule2.default, _extends({
                                    key: groupData.domain,
                                    ruleIndex: i
                                }, groupData, {
                                    server: server,
                                    groupName: activated,
                                    ruleList: currentGroup,
                                    onEnvChange: onEnvChange,
                                    onHostChange: onHostChange,
                                    onDeleteRule: onDeleteRule,
                                    onEditDomain: onEditDomain,
                                    onSelectRule: onSelectRule,
                                    onDeselectRule: onDeselectRule,
                                    onMultiDeleteRule: onMultiDeleteRule
                                }));
                            }) : null
                        )
                    )
                )
            ),
            _react2.default.createElement(_InsertGroupModal2.default, { group: group, onInsertGroup: onInsertGroup }),
            _react2.default.createElement(_InsertRuleModal2.default, {
                serverInfo: server,
                onInsertRule: onInsertRule,
                existedRuleList: currentGroup,
                groupName: activated
            }),
            _react2.default.createElement(_ExportHostListModal2.default, {
                hostList: (0, _utils.exportHostList)(currentGroup, server)
            })
        );
    },
    toggleSelectAll: function toggleSelectAll(evt) {
        var _props2 = this.props;
        var group = _props2.group;
        var activated = _props2.activated;
        var onSelectRule = _props2.onSelectRule;
        var onDeselectRule = _props2.onDeselectRule;
        var ruleList = group[activated];

        ruleList.forEach(function (rule, index) {

            var checked = evt.target.checked;

            if (checked) {

                onSelectRule(activated, index);
            } else {

                onDeselectRule(activated, index);
            }
        });
    },
    deleteGroup: function deleteGroup() {
        var _props3 = this.props;
        var onDeleteGroup = _props3.onDeleteGroup;
        var activated = _props3.activated;

        if (confirm('确定删除吗?')) {
            onDeleteGroup(activated);
        }
    },
    multiDeleteRule: function multiDeleteRule() {
        var _props4 = this.props;
        var onMultiDeleteRule = _props4.onMultiDeleteRule;
        var activated = _props4.activated;

        if (confirm('确定删除吗?')) {

            onMultiDeleteRule(activated);
        }
    }
});
//# sourceMappingURL=index.js.map
