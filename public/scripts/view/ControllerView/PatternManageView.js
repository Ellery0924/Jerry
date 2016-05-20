'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Navigator = require('../Common/Navigator');

var _Navigator2 = _interopRequireDefault(_Navigator);

var _index = require('../RewriteManage/index');

var _index2 = _interopRequireDefault(_index);

var _action = require('../../action');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RewriteManageView = _react2.default.createClass({
    displayName: 'RewriteManageView',
    render: function render() {
        var dispatch = this.props.dispatch;
        var rewrite = this.props.config.rewrite;

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_Navigator2.default, null),
            _react2.default.createElement(_index2.default, {
                patternList: rewrite,
                onSetPattern: function onSetPattern(index, pattern) {
                    return dispatch((0, _action.setPatternAndSave)(index, pattern));
                },
                onInsertPattern: function onInsertPattern(pattern) {
                    return dispatch((0, _action.insertPatternAndSave)(pattern));
                },
                onDeletePattern: function onDeletePattern(index) {
                    return dispatch((0, _action.deletePatternAndSave)(index));
                }
            })
        );
    }
}); /**
     * Created by Ellery1 on 16/1/11.
     */

function select(state) {

    return state.toJS();
}

exports.default = (0, _reactRedux.connect)(select)(RewriteManageView);
//# sourceMappingURL=PatternManageView.js.map
