'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EnvSelect = require('./EnvSelect');

var _EnvSelect2 = _interopRequireDefault(_EnvSelect);

var _HostSelect = require('./HostSelect');

var _HostSelect2 = _interopRequireDefault(_HostSelect);

var _EditDomainModal = require('./EditDomainModal');

var _EditDomainModal2 = _interopRequireDefault(_EditDomainModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Ellery1 on 16/1/2.
 */
exports.default = _react2.default.createClass({
    displayName: 'Rule',
    openEditDomainModal: function openEditDomainModal() {

        $(this.refs.editDomainModal).children().eq(0).modal('show');
    },
    render: function render() {
        var _props = this.props;
        var cache = _props.cache;
        var current = _props.current;
        var domain = _props.domain;
        var selected = _props.selected;
        var server = _props.server;
        var ruleList = _props.ruleList;
        var onEnvChange = _props.onEnvChange;
        var onHostChange = _props.onHostChange;
        var onEditDomain = _props.onEditDomain;
        var groupName = _props.groupName;
        var ruleIndex = _props.ruleIndex;

        return _react2.default.createElement(
            'tr',
            { className: 'rule' },
            _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', { type: 'checkbox', name: 'rule-select', checked: selected, onChange: this.toggleRule })
            ),
            _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                    'a',
                    {
                        onClick: this.openEditDomainModal,
                        'data-toggle': 'modal',
                        className: 'rule_domain'
                    },
                    domain
                )
            ),
            _react2.default.createElement(
                'td',
                { className: 'env_select_cell' },
                _react2.default.createElement(_EnvSelect2.default, {
                    current: current,
                    server: server,
                    onEnvChange: onEnvChange,
                    groupName: groupName,
                    ruleIndex: ruleIndex
                })
            ),
            _react2.default.createElement(
                'td',
                { className: 'host_select_cell' },
                _react2.default.createElement(_HostSelect2.default, {
                    current: current,
                    cache: cache[current],
                    server: server,
                    groupName: groupName,
                    ruleIndex: ruleIndex,
                    onHostChange: onHostChange
                })
            ),
            _react2.default.createElement(
                'td',
                { className: 'del_cell' },
                _react2.default.createElement(
                    'button',
                    {
                        onClick: this.deleteRule,
                        className: 'btn btn-danger del_rule'
                    },
                    '删除'
                )
            ),
            _react2.default.createElement(
                'td',
                { ref: 'editDomainModal' },
                _react2.default.createElement(_EditDomainModal2.default, {
                    domain: domain,
                    onEditDomain: onEditDomain,
                    ruleList: ruleList,
                    ruleIndex: ruleIndex,
                    groupName: groupName
                })
            )
        );
    },
    toggleRule: function toggleRule(evt) {

        if (evt.target.checked) {

            this.props.onSelectRule(this.props.groupName, this.props.ruleIndex);
        } else {

            this.props.onDeselectRule(this.props.groupName, this.props.ruleIndex);
        }
    },
    deleteRule: function deleteRule() {
        var _props2 = this.props;
        var onDeleteRule = _props2.onDeleteRule;
        var groupName = _props2.groupName;
        var ruleIndex = _props2.ruleIndex;

        if (confirm('确定删除吗?')) {
            onDeleteRule(groupName, ruleIndex);
        }
    }
});
//# sourceMappingURL=Rule.js.map
