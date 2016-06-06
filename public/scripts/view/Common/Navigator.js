'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Ellery1 on 16/1/1.
 */
exports.default = _react2.default.createClass({
    displayName: 'Navigator',
    render: function render() {
        return _react2.default.createElement(
            'nav',
            { className: 'navbar navbar-default navbar-fixed-top' },
            _react2.default.createElement(
                'div',
                { className: 'container-fluid' },
                _react2.default.createElement(
                    'div',
                    { className: 'navbar-header' },
                    _react2.default.createElement(
                        'button',
                        { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse',
                            'data-target': '#bs-example-navbar-collapse-1', 'aria-expanded': 'false' },
                        _react2.default.createElement(
                            'span',
                            { className: 'sr-only' },
                            'Toggle navigation'
                        ),
                        _react2.default.createElement('span', { className: 'icon-bar' }),
                        _react2.default.createElement('span', { className: 'icon-bar' }),
                        _react2.default.createElement('span', { className: 'icon-bar' })
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'navbar-brand', href: 'javascript:void 0;' },
                        'QProxy'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'collapse navbar-collapse', id: 'bs-example-navbar-collapse-1' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'nav navbar-nav' },
                        _react2.default.createElement(
                            'li',
                            { 'nav-hash': '#' },
                            _react2.default.createElement(
                                _reactRouter.Link,
                                {
                                    activeClassName: 'active',
                                    to: '/'
                                },
                                '代理面板'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { 'nav-hash': '#rewrite' },
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { activeClassName: 'active', to: 'rewrite' },
                                'URL MAP'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { 'nav-hash': '#server' },
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { activeClassName: 'active', to: 'server' },
                                '服务器组配置'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { 'nav-hash': '#logger' },
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { activeClassName: 'active', to: 'logger' },
                                '请求/响应日志'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'nav navbar-nav navbar-right' },
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { target: '_blank',
                                    href: 'https://chrome.google.com/webstore/detail/qproxy/nbilnamflokjimlgajofochkjdmlohao/related' },
                                'Chrome Extension (By Barret.Ma)'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { target: '_blank', href: 'http://camsong.github.io/redux-in-chinese/' },
                                'Powered By React-Redux'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { target: '_blank', href: 'https://github.com/Ellery0924/QProxy' },
                                'Github'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { target: '_blank', href: 'https://github.com/Ellery0924/QProxy' },
                                '文档'
                            )
                        )
                    )
                )
            )
        );
    }
});
//# sourceMappingURL=Navigator.js.map
