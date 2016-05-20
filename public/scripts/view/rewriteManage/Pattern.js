'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'Pattern',
    onPatternChange: function onPatternChange() {
        var _props = this.props;
        var index = _props.index;
        var onSetPattern = _props.onSetPattern;

        var pattern = this.refs.patternInput.value,
            responder = this.refs.responderInput.value,
            isOn = Number(this.refs.isOnSelect.value);

        onSetPattern(index, { pattern: pattern, responder: responder, isOn: isOn });
    },
    onDeletePattern: function onDeletePattern() {
        var _props2 = this.props;
        var index = _props2.index;
        var onDeletePattern = _props2.onDeletePattern;

        if (confirm('确定删除吗?')) {

            onDeletePattern(index);
        }
    },
    render: function render() {
        var _props3 = this.props;
        var pattern = _props3.pattern;
        var responder = _props3.responder;
        var isOn = _props3.isOn;

        return _react2.default.createElement(
            'tr',
            { className: 'rewrite_rule' },
            _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', {
                    ref: 'patternInput',
                    type: 'text',
                    className: 'form-control pattern_input',
                    value: pattern,
                    onChange: this.onPatternChange
                })
            ),
            _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', {
                    ref: 'responderInput',
                    type: 'text',
                    className: 'form-control responder_input',
                    value: responder,
                    onChange: this.onPatternChange
                })
            ),
            _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                    'select',
                    {
                        ref: 'isOnSelect',
                        id: 'rewriteRuleIsOn',
                        className: 'form-control rewrite_rule_is_on',
                        onChange: this.onPatternChange,
                        value: isOn
                    },
                    _react2.default.createElement(
                        'option',
                        { value: '1' },
                        '开启'
                    ),
                    _react2.default.createElement(
                        'option',
                        { value: '0' },
                        '关闭'
                    )
                ),
                _react2.default.createElement(
                    'button',
                    {
                        onClick: this.onDeletePattern,
                        className: 'btn del_pattern btn-danger'
                    },
                    '删除'
                )
            )
        );
    }
}); /**
     * Created by Ellery1 on 16/1/11.
     */
//# sourceMappingURL=Pattern.js.map
