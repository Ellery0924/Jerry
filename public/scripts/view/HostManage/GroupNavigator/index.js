'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'GroupNavigator',
    _getJSX: function _getJSX() {
        var _props = this.props;
        var group = _props.group;
        var activated = _props.activated;
        var onSelectGroup = _props.onSelectGroup;

        if (group !== undefined) {

            return Object.keys(group).map(function (groupName) {
                return _react2.default.createElement(
                    'li',
                    {
                        key: groupName,
                        onClick: function onClick() {
                            onSelectGroup(groupName);
                        },
                        className: activated === groupName ? 'active' : ''
                    },
                    _react2.default.createElement(
                        'a',
                        { href: 'javascript:void 0;' },
                        groupName
                    )
                );
            });
        }
        return [];
    },
    componentDidMount: function componentDidMount() {

        $('.dropdown-toggle').dropdown();
    },
    render: function render() {
        var _props2 = this.props;
        var onSwitchHttps = _props2.onSwitchHttps;
        var httpsOn = _props2.httpsOn;

        var httpsOnTxt = httpsOn === undefined ? '' : httpsOn ? '开启' : '关闭';

        return _react2.default.createElement(
            'div',
            { className: 'col-sm-3 col-md-2 sidebar' },
            _react2.default.createElement(
                'div',
                { className: 'btn-group https-switch' },
                _react2.default.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-default dropdown-toggle', 'data-toggle': 'dropdown',
                        'aria-haspopup': 'true', 'aria-expanded': 'false' },
                    'Https代理:',
                    httpsOnTxt,
                    ' ',
                    _react2.default.createElement('span', { className: 'caret' })
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'dropdown-menu' },
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'a',
                            { onClick: function onClick() {
                                    return onSwitchHttps(true);
                                }, href: 'javascript:void 0;' },
                            '开启'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'a',
                            { onClick: function onClick() {
                                    return onSwitchHttps(false);
                                }, href: 'javascript:void 0' },
                            '关闭'
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'ul',
                { className: 'nav nav-sidebar group_nav', id: 'group_nav' },
                this._getJSX()
            )
        );
    }
}); /**
     * Created by Ellery1 on 16/1/1.
     */
//# sourceMappingURL=index.js.map
