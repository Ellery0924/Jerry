/**
 * Created by Ellery1 on 16/1/2.
 */
import React from 'react';
import EnvSelect from './EnvSelect';
import HostSelect from './HostSelect';
import EditDomainModal from './EditDomainModal'

export default React.createClass({
    render(){
        const {
            cache,
            current,
            domain,
            selected,
            server,
            ruleList,
            onEnvChange,
            onHostChange,
            onEditDomain,
            groupName,
            ruleIndex
        }=this.props;

        const modalId="editDomainModal-"+groupName+'-'+ruleIndex;

        return (
            <tr className="rule">
                <td>
                    <input type="checkbox" name="rule-select" checked={selected} onChange={this.toggleRule}/>
                </td>
                <td>
                    <a
                        href={'#'+modalId}
                        data-toggle="modal"
                        className="rule_domain"
                    >
                        {domain}
                    </a>
                    <EditDomainModal
                        domain={domain}
                        id={modalId}
                        onEditDomain={onEditDomain}
                        ruleList={ruleList}
                        ruleIndex={ruleIndex}
                        groupName={groupName}
                    />
                </td>
                <td className="env_select_cell">
                    <EnvSelect
                        current={current}
                        server={server}
                        onEnvChange={onEnvChange}
                        groupName={groupName}
                        ruleIndex={ruleIndex}
                    />
                </td>
                <td className="host_select_cell">
                    <HostSelect
                        current={current}
                        cache={cache[current]}
                        server={server}
                        groupName={groupName}
                        ruleIndex={ruleIndex}
                        onHostChange={onHostChange}
                    />
                </td>
                <td className="del_cell">
                    <button
                        onClick={this.deleteRule}
                        className="btn btn-danger del_rule"
                    >
                        删除
                    </button>
                </td>
            </tr>
        );
    },
    toggleRule(evt){

        if (evt.target.checked) {

            this.props.onSelectRule(this.props.groupName, this.props.ruleIndex);
        } else {

            this.props.onDeselectRule(this.props.groupName, this.props.ruleIndex);
        }
    },
    deleteRule(){

        const {onDeleteRule, groupName, ruleIndex}=this.props;

        if (confirm('确定删除吗?')) {
            onDeleteRule(groupName, ruleIndex);
        }
    }
});