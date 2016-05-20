'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EnvSelect = require('./EnvSelect');

var _EnvSelect2 = _interopRequireDefault(_EnvSelect);

var _HostSelect = require('./HostSelect');

var _HostSelect2 = _interopRequireDefault(_HostSelect);

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Ellery1 on 16/1/2.
 */
exports.default = _react2.default.createClass({
    displayName: 'EditDomainModal',
    componentDidMount: function componentDidMount() {
        var domain = this.props.domain;

        $(this.refs.editDomainModal).on('shown.bs.modal', function () {

            $(this).find('textarea').focus().val(domain);
        });
    },
    submit: function submit() {
        var _props = this.props;
        var onEditDomain = _props.onEditDomain;
        var ruleList = _props.ruleList;
        var ruleIndex = _props.ruleIndex;
        var groupName = _props.groupName;

        var domainInput = this.refs.domainInput,
            newDomainVal = domainInput.value,
            validateRet = (0, _utils.validateDomain)(newDomainVal, ruleIndex, ruleList);

        if (validateRet.result) {
            onEditDomain(groupName, ruleIndex, newDomainVal);
            $(this.refs.editDomainModal).modal('hide');
        } else {
            alert(validateRet.message);
        }
    },
    render: function render() {
        var ruleIndex = this.props.ruleIndex;

        return _react2.default.createElement(
            'div',
            { className: 'modal newRuleModal', ref: 'editDomainModal', ruleIndex: ruleIndex },
            _react2.default.createElement(
                'div',
                { id: 'newRuleModal_content', className: 'modal-dialog newRuleModal_content' },
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
                            '编辑规则'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-body newRule_form' },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'newRule_domain' },
                                '域(支持输入多个域,以空格或者回车分隔):'
                            ),
                            _react2.default.createElement('textarea', {
                                ref: 'domainInput',
                                className: 'form-control',
                                id: 'newRule_domain'
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
                                'data-dismiss': 'modal'
                            },
                            '取消'
                        ),
                        _react2.default.createElement(
                            'button',
                            {
                                type: 'button',
                                className: 'btn btn-primary newRule_save',
                                onClick: this.submit
                            },
                            '确定'
                        )
                    )
                )
            )
        );
    }
});
//# sourceMappingURL=EditDomainModal.js.map
