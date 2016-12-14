/**
 * Created by Ellery1 on 16/1/2.
 */
import React from 'react';
import { validateDomain } from '../../../utils';

export default React.createClass({
    componentDidMount(){
        const { domain }=this.props;

        $(this.refs.editDomainModal).on('shown.bs.modal', function () {
            $(this).find('textarea').focus().val(domain);
        });
    },
    submit(){
        const { onEditDomain, ruleList, ruleIndex, groupName }=this.props;

        var domainInput = this.refs.domainInput,
            newDomainVal = domainInput.value,
            validateRet = validateDomain(newDomainVal, ruleIndex, ruleList);

        if (validateRet.result) {
            onEditDomain(groupName, ruleIndex, newDomainVal);
            $(this.refs.editDomainModal).modal('hide');
        } else {
            alert(validateRet.message);
        }
    },
    render(){
        const { ruleIndex, id }=this.props;

        return (
            <div className="modal newRuleModal" id={id} ref="editDomainModal" ruleIndex={ruleIndex}>
                <div id="newRuleModal_content" className="modal-dialog newRuleModal_content">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">编辑规则</h4>
                        </div>
                        <div className="modal-body newRule_form">
                            <div className="form-group">
                                <label htmlFor="newRule_domain">域(支持输入多个域,以空格或者回车分隔):</label>
                                <textarea
                                    ref="domainInput"
                                    className="form-control"
                                    id="newRule_domain"
                                >
                                </textarea>
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
                                className="btn btn-primary newRule_save"
                                onClick={this.submit}
                            >
                                确定
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});