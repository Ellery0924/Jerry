'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Ellery1 on 16/1/11.
 */
exports.default = _react2.default.createClass({
    displayName: 'InsertModal',
    onSubmit: function onSubmit() {

        var pattern = this.refs.newPatternInput.value,
            responder = this.refs.newResponderInput.value;

        var _props = this.props;
        var onInsertPattern = _props.onInsertPattern;
        var patternList = _props.patternList;

        var validateResult = (0, _utils.validatePattern)(pattern, responder, patternList);

        if (validateResult.result) {

            onInsertPattern({ pattern: pattern, responder: responder, isOn: 1 });
            $(this.refs.insertPatternModal).modal('hide');
        } else {

            alert(validateResult.message);
        }
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        $(this.refs.insertPatternModal).on('shown.bs.modal', function () {
            $(_this.refs.newPatternInput).val('').focus();
            $(_this.refs.newResponderInput).val('');
        });
    },
    render: function render() {

        return _react2.default.createElement(
            'div',
            { className: 'modal', id: 'addPatternModal', ref: 'insertPatternModal' },
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
                                { 'aria-hidden': 'true' },
                                '×'
                            )
                        ),
                        _react2.default.createElement(
                            'h4',
                            { className: 'modal-title' },
                            '添加Rewrite规则'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-body' },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'newRule_domain' },
                                'Pattern:'
                            ),
                            _react2.default.createElement('input', { ref: 'newPatternInput', type: 'text', className: 'form-control', id: 'new_pattern_input',
                                autofocus: true })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'newRule_domain' },
                                'Responder:'
                            ),
                            _react2.default.createElement('input', { ref: 'newResponderInput', type: 'text', className: 'form-control',
                                id: 'new_responder_input', autofocus: true })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-footer' },
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
                            '取消'
                        ),
                        _react2.default.createElement(
                            'button',
                            {
                                type: 'button',
                                className: 'btn btn-primary addPatternSubmit',
                                onClick: this.onSubmit
                            },
                            '确定'
                        )
                    )
                )
            )
        );
    }
});
//# sourceMappingURL=InsertModal.js.map
