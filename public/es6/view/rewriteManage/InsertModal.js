/**
 * Created by Ellery1 on 16/1/11.
 */
import React from 'react';
import { validatePattern } from '../../utils';

export default React.createClass({
    onSubmit(){
        const pattern = this.refs.newPatternInput.value,
            responder = this.refs.newResponderInput.value;

        const { onInsertPattern, patternList }=this.props;

        var validateResult = validatePattern(pattern, responder, patternList);

        if (validateResult.result) {
            onInsertPattern({ pattern, responder, isOn: 1 });
            $(this.refs.insertPatternModal).modal('hide');
        } else {
            alert(validateResult.message);
        }
    },
    componentDidMount(){
        $(this.refs.insertPatternModal).on('shown.bs.modal', () => {

            $(this.refs.newPatternInput).val('').focus();
            $(this.refs.newResponderInput).val('');
        });
    },
    render(){
        return (
            <div className="modal" id="addPatternModal" ref="insertPatternModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">添加Rewrite规则</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="newRule_domain">Pattern:</label>
                                <input ref="newPatternInput" type="text" className="form-control" id="new_pattern_input"
                                       placeholder="输入正则表达式(请使用\.和\?代替.和?,其他正则表达式元字符以此类推)"
                                       autofocus/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="newRule_domain">Responder:</label>
                                <input ref="newResponderInput" type="text" className="form-control"
                                       placeholder="可以使用$1,$2来表示pattern中正则表达式的匹配分组"
                                       id="new_responder_input" autofocus/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                            <button
                                type="button"
                                className="btn btn-primary addPatternSubmit"
                                onClick={this.onSubmit}
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