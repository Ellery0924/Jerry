'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Navigator = require('../Common/Navigator');

var _Navigator2 = _interopRequireDefault(_Navigator);

var _reactRedux = require('react-redux');

var _action = require('../../dataLayer/qproxy/action');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServerManageView = _react2.default.createClass({
    displayName: 'ServerManageView',
    componentDidUpdate: function componentDidUpdate() {

        $(this.refs.serverInfoInput).val(JSON.stringify(this.props.server, null, '\t'));
    },
    onSubmit: function onSubmit() {
        var dispatch = this.props.dispatch;

        var serverInfo = this.refs.serverInfoInput.value,
            validateResult = (0, _utils.validateServerConfig)(serverInfo);

        if (validateResult.result) {

            dispatch((0, _action.setServerAndSave)(JSON.parse(this.refs.serverInfoInput.value))).then(function () {
                return alert('保存成功,请重启qproxy.');
            });
        } else {

            alert(validateResult.message);
        }
    },
    render: function render() {

        return _react2.default.createElement(
            'div',
            { className: 'container-fluid serverView' },
            _react2.default.createElement(_Navigator2.default, null),
            _react2.default.createElement(
                'div',
                { className: 'container-fluid serverView' },
                _react2.default.createElement(
                    'div',
                    { className: 'page-header' },
                    _react2.default.createElement(
                        'h1',
                        null,
                        '服务器组配置(~/.qsconfig):'
                    )
                ),
                _react2.default.createElement('textarea', { ref: 'serverInfoInput', className: 'form-control serverInfo_input' }),
                _react2.default.createElement(
                    'button',
                    {
                        type: 'submit',
                        className: 'save form-control btn btn-success',
                        onClick: this.onSubmit
                    },
                    '保存'
                )
            )
        );
    }
}); /**
     * Created by Ellery1 on 16/1/11.
     */

function select(state) {
    return state.toJS().qproxy;
}

exports.default = (0, _reactRedux.connect)(select)(ServerManageView);
//# sourceMappingURL=ServerManageView.js.map
