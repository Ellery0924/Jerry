'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./GroupNavigator/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./RuleTable/index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'HostManage',
    render: function render() {

        return _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(_index2.default, this.props),
            _react2.default.createElement(_index4.default, this.props)
        );
    }
}); /**
     * Created by Ellery1 on 16/1/1.
     */
//# sourceMappingURL=index.js.map
