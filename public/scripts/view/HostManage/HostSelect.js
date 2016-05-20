'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'HostSelect',
    render: function render() {
        var _props = this.props;
        var current = _props.current;
        var server = _props.server;
        var cache = _props.cache;
        var onHostChange = _props.onHostChange;
        var groupName = _props.groupName;
        var ruleIndex = _props.ruleIndex;
        var hostList = server[current];

        return current === 'custom' ? _react2.default.createElement('input', {
            type: 'text',
            className: 'ip_input form-control',
            onChange: function onChange(evt) {
                onHostChange(groupName, ruleIndex, current, evt.target.value);
            },
            value: cache
        }) : current === 'online' ? null : _react2.default.createElement(
            'select',
            {
                value: cache,
                onChange: function onChange(evt) {
                    onHostChange(groupName, ruleIndex, current, evt.target.value);
                },
                className: 'host_select form-control'
            },
            Object.keys(hostList).map(function (hostIndex) {
                return _react2.default.createElement(
                    'option',
                    {
                        key: hostIndex,
                        value: hostIndex
                    },
                    hostList[hostIndex]
                );
            })
        );
    }
}); /**
     * Created by Ellery1 on 16/1/2.
     */
//# sourceMappingURL=HostSelect.js.map
