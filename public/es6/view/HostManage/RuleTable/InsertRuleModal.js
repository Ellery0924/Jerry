/**
 * Created by Ellery1 on 16/1/3.
 */
import React from 'react';
import {formatRuleList} from '../../../utils';

export default React.createClass({
    submit(){
        const {onInsertRule, serverInfo, groupName, existedRuleList}=this.props;
        const formatedRuleList = formatRuleList(this.refs.insertRuleInput.value, serverInfo, existedRuleList);
        if (formatedRuleList) {
            onInsertRule(groupName, formatedRuleList);
            $(this.refs.insertRuleModal).modal('hide');
        }
    },
    componentDidMount(){
        $(this.refs.insertRuleModal).on('shown.bs.modal', ()=> {
            this.refs.insertRuleInput.value = "";
            this.refs.insertRuleInput.focus();
        });
    },
    render(){
        return (
            <div className="modal" ref="insertRuleModal" id="addRuleMultiModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">批量添加规则</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>
                                    格式为ip_domain, 例如127.0.0.1 localhost.可以输入多条,每行一条<br/>
                                    新增对缩写IP的支持,例如qzz-1 qunarzz.com表示192.168.237.71 qunarzz.com<br/>
                                    请勿使用服务器组配置中不存在的组名和服务器序号
                                </label>
                                <textarea
                                    ref="insertRuleInput"
                                    type="text"
                                    className="form-control"
                                    id="addRuleMultiInput">
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
                                className="btn btn-primary addGroupSubmit"
                                id="addRuleMultiSubmit"
                                onClick={this.submit}
                            >
                                确定
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});