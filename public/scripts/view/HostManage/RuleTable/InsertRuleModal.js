'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Ellery1 on 16/1/3.
 */
exports.default = _react2.default.createClass({
    displayName: 'InsertRuleModal',
    submit: function submit() {
        var _props = this.props;
        var onInsertRule = _props.onInsertRule;
        var serverInfo = _props.serverInfo;
        var groupName = _props.groupName;
        var existedRuleList = _props.existedRuleList;

        var formatedRuleList = (0, _utils.formatRuleList)(this.refs.insertRuleInput.value, serverInfo, existedRuleList);
        if (formatedRuleList) {
            onInsertRule(groupName, formatedRuleList);
            $(this.refs.insertRuleModal).modal('hide');
        }
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        $(this.refs.insertRuleModal).on('shown.bs.modal', function () {
            _this.refs.insertRuleInput.value = "";
            _this.refs.insertRuleInput.focus();
        });
    },
    render: function render() {

        return _react2.default.createElement(
            'div',
            { className: 'modal', ref: 'insertRuleModal', id: 'addRuleMultiModal' },
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
                            '批量添加规则'
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
                                null,
                                '格式为ip_domain, 例如127.0.0.1 localhost.可以输入多条,每行一条',
                                _react2.default.createElement('br', null),
                                '新增对缩写IP的支持,例如qzz-1 qunarzz.com表示192.168.237.71 qunarzz.com',
                                _react2.default.createElement('br', null),
                                '请勿使用服务器组配置中不存在的组名和服务器序号'
                            ),
                            _react2.default.createElement('textarea', {
                                ref: 'insertRuleInput',
                                type: 'text',
                                className: 'form-control',
                                id: 'addRuleMultiInput' })
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
                                className: 'btn btn-primary addGroupSubmit',
                                id: 'addRuleMultiSubmit',
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
//# sourceMappingURL=InsertRuleModal.js.map
