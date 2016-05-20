"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: "EnvSelect",
    render: function render() {
        var _props = this.props;
        var server = _props.server;
        var current = _props.current;
        var onEnvChange = _props.onEnvChange;
        var groupName = _props.groupName;
        var ruleIndex = _props.ruleIndex;

        return _react2.default.createElement(
            "select",
            {
                value: current,
                onChange: function onChange(evt) {
                    onEnvChange(groupName, ruleIndex, evt.target.value);
                },
                className: "env_select form-control"
            },
            Object.keys(server).map(function (env) {
                return _react2.default.createElement(
                    "option",
                    {
                        key: env,
                        value: env
                    },
                    env
                );
            })
        );
    }
}); /**
     * Created by Ellery1 on 16/1/2.
     */
//# sourceMappingURL=EnvSelect.js.map
