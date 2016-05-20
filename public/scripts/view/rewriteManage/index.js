'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by Ellery1 on 16/1/11.
                                                                                                                                                                                                                                                                   */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Pattern = require('./Pattern');

var _Pattern2 = _interopRequireDefault(_Pattern);

var _InsertModal = require('./InsertModal');

var _InsertModal2 = _interopRequireDefault(_InsertModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'rewriteManage',
    render: function render() {
        var _props = this.props;
        var patternList = _props.patternList;
        var onSetPattern = _props.onSetPattern;
        var onDeletePattern = _props.onDeletePattern;
        var onInsertPattern = _props.onInsertPattern;

        return _react2.default.createElement(
            'div',
            { className: 'rewriteSetting container-fluid' },
            _react2.default.createElement(
                'div',
                { className: 'page-header' },
                _react2.default.createElement(
                    'h1',
                    null,
                    'URL Rewrite配置'
                ),
                _react2.default.createElement(
                    'button',
                    { className: 'btn btn-success openAddModal', 'data-toggle': 'modal', 'data-target': '#addPatternModal' },
                    '新增规则'
                )
            ),
            _react2.default.createElement(
                'table',
                { className: 'table table-striped table-hover' },
                _react2.default.createElement(
                    'tbody',
                    { className: 'pattern_setting' },
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'th',
                            null,
                            'Pattern'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'Responder'
                        ),
                        _react2.default.createElement(
                            'th',
                            { className: 'action' },
                            '操作'
                        )
                    ),
                    patternList.map(function (pattern, index) {
                        return _react2.default.createElement(_Pattern2.default, _extends({
                            key: index,
                            index: index,
                            onSetPattern: onSetPattern,
                            onDeletePattern: onDeletePattern
                        }, pattern));
                    })
                )
            ),
            _react2.default.createElement(_InsertModal2.default, { patternList: patternList, onInsertPattern: onInsertPattern })
        );
    }
});
//# sourceMappingURL=index.js.map
