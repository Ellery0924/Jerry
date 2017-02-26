/**
 * Created by Ellery1 on 16/1/11.
 */
import React from 'react';
export default React.createClass({
    onPatternChange(){
        const { index, onSetPattern } = this.props;
        const pattern = this.refs.patternInput.value,
            responder = this.refs.responderInput.value,
            isOn = Number(this.refs.isOnSelect.value);

        onSetPattern(index, { pattern, responder, isOn });
    },
    onDeletePattern(){
        const { index, onDeletePattern } = this.props;

        if (confirm('确定删除吗?')) {
            onDeletePattern(index);
        }
    },
    render(){
        const { pattern, responder, isOn } = this.props;

        return (
            <tr className="rewrite_rule">
                <td>
                    <input
                        ref="patternInput"
                        type="text"
                        className="form-control pattern_input"
                        value={pattern}
                        placeholder="输入正则表达式(请使用\.和\?代替.和?,其他正则表达式元字符以此类推)"
                        onChange={this.onPatternChange}
                    />
                </td>
                <td>
                    <input
                        ref="responderInput"
                        type="text"
                        className="form-control responder_input"
                        value={responder}
                        placeholder="可以使用$1,$2来表示pattern中正则表达式的匹配分组"
                        onChange={this.onPatternChange}
                    />
                </td>
                <td>
                    <select
                        ref="isOnSelect"
                        id="rewriteRuleIsOn"
                        className="form-control rewrite_rule_is_on"
                        onChange={this.onPatternChange}
                        value={isOn}
                    >
                        <option value="1">开启</option>
                        <option value="0">关闭</option>
                    </select>
                    <button
                        onClick={this.onDeletePattern}
                        className="btn del_pattern btn-danger"
                    >
                        删除
                    </button>
                </td>
            </tr>
        );
    }
});