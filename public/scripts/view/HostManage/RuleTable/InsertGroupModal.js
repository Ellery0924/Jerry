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
    displayName: 'InsertGroupModal',
    componentDidMount: function componentDidMount() {

        var self = this;

        $('#newGroupModal').on('shown.bs.modal', function () {
            $(this).find('#newGroup_name').val('').focus();
        });

        $('#newGroup_name').on('keyup', function (e) {
            if (e.which === 13) {
                self.submit();
            }
        });
    },
    render: function render() {

        return _react2.default.createElement(
            'div',
            { className: 'modal', id: 'newGroupModal' },
            _react2.default.createElement(
                'div',
                { className: 'modal-dialog modal-sm' },
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
                            '添加分组'
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
                                '组名:'
                            ),
                            _react2.default.createElement('input', {
                                type: 'text',
                                className: 'form-control',
                                id: 'newGroup_name',
                                ref: 'groupNameInput'
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
                                className: 'btn btn-primary addGroupSubmit',
                                id: 'addGroupSubmit',
                                onClick: this.submit
                            },
                            '确定'
                        )
                    )
                )
            )
        );
    },
    submit: function submit() {
        var _props = this.props;
        var onInsertGroup = _props.onInsertGroup;
        var group = _props.group;

        var groupName = this.refs.groupNameInput.value,
            validateRet = (0, _utils.validateGroupName)(groupName, group);

        if (validateRet.result) {
            onInsertGroup(groupName);
            $('#newGroupModal').modal('hide');
        } else {
            alert(validateRet.message);
        }
    }
});
//# sourceMappingURL=InsertGroupModal.js.map
