/**
 * Created by Ellery1 on 16/1/2.
 */
import React from 'react';
import {validateGroupName} from '../../../utils';

export default React.createClass({
    componentDidMount(){
        var self = this;

        $('#newGroupModal').on('shown.bs.modal', function () {
                $(this).find('#newGroup_name').val('').focus();
            }
        );
        $('#newGroup_name').on('keyup', function (e) {
            if (e.which === 13) {
                self.submit();
            }
        });
    },
    render(){
        return (
            <div className="modal" id="newGroupModal">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">添加分组</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="newRule_domain">组名:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="newGroup_name"
                                    ref="groupNameInput"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                            >
                                取消
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary addGroupSubmit"
                                id="addGroupSubmit"
                                onClick={this.submit}
                            >
                                确定
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    submit(){
        const {onInsertGroup,group}=this.props;
        var groupName = this.refs.groupNameInput.value,
            validateRet = validateGroupName(groupName, group);

        if (validateRet.result) {
            onInsertGroup(groupName);
            $('#newGroupModal').modal('hide');
        } else {
            alert(validateRet.message);
        }
    }
});