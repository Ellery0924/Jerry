'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Ellery1 on 16/1/2.
 */
exports.default = _react2.default.createClass({
    displayName: 'ExportHostListModal',
    componentDidMount: function componentDidMount() {
        var _this = this;

        $(this.refs.exportHostModal).on('shown.bs.modal', function () {
            return $(_this.refs.exportHostDisplay).val(_this.props.hostList).select();
        });
    },
    render: function render() {

        return _react2.default.createElement(
            'div',
            { ref: 'exportHostModal', className: 'modal', id: 'exportHostModal' },
            _react2.default.createElement(
                'div',
                { className: 'modal-dialog' },
                _react2.default.createElement(
                    'div',
                    { className: 'modal-content' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-header' },
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                            _react2.default.createElement(
                                'span',
                                {
                                    'aria-hidden': 'true' },
                                '×'
                            )
                        ),
                        _react2.default.createElement(
                            'h4',
                            { className: 'modal-title' },
                            '导出Host'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-body' },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement('textarea', {
                                ref: 'exportHostDisplay',
                                type: 'text',
                                className: 'exportHostDisplay',
                                id: 'exportHostDisplay',
                                defaultValue: this.props.hostList
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-footer' },
                        _react2.default.createElement(
                            'button',
                            {
                                type: 'button',
                                className: 'btn btn-default',
                                'data-dismiss': 'modal' },
                            '关闭'
                        )
                    )
                )
            )
        );
    }
});
//# sourceMappingURL=ExportHostListModal.js.map
