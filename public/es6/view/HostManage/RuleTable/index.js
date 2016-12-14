/**
 * Created by Ellery1 on 16/1/1.
 */
import React from 'react';
import Rule from './Rule';
import InsertGroupModal from './InsertGroupModal';
import InsertRuleModal from './InsertRuleModal';
import ExportHostListModal from './ExportHostListModal';
import {exportHostList} from '../../../utils';

export default React.createClass({
    render(){
        const {
            mockServices,
            activated,
            group,
            server,
            multiDeleteDisabled,
            onEnvChange,
            onHostChange,
            onDeleteRule,
            onEditDomain,
            onInsertGroup,
            onSelectRule,
            onDeselectRule,
            onMultiDeleteRule,
            onInsertRule,
            onSwitchMockService
        }=this.props;

        var currentGroup = group[activated],
            isAllSelected = currentGroup && currentGroup.length && currentGroup.every(rule=>rule.selected),
            mockServiceOpen = mockServices && !!mockServices.find(gname=>gname === activated),
            mockSwitchText = mockServiceOpen ? 'Mock服务:开启' : 'Mock服务:关闭';

        const rykitGroup = /\_ykit$/,
            isYkitGroup = rykitGroup.test(activated);

        return (
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                <div id="groupView">
                    <div className="page-header">
                        <h1>当前分组:{activated}</h1>
                        {activated && activated !== 'default' && !isYkitGroup ?
                            <button
                                className="btn btn-danger rm_group"
                                onClick={this.deleteGroup}
                            >
                                删除当前分组
                            </button> : null}
                        <button
                            className="btn btn-success add_group"
                            data-target="#newGroupModal"
                            data-toggle="modal"
                        >
                            添加分组
                        </button>
                        <button
                            className="btn btn-primary add_rule_multi"
                            data-target="#addRuleMultiModal"
                            data-toggle="modal"
                        >
                            添加规则
                        </button>
                        <button disabled={multiDeleteDisabled ? 'disabled' : null}
                                className="btn btn-danger multi-delete"
                                onClick={this.multiDeleteRule}>批量删除
                        </button>
                        <button className="btn btn-info export_host" data-target="#exportHostModal" data-toggle="modal">
                            导出host
                        </button>
                        {isYkitGroup ?
                            <div className="mock-switch btn-group">
                                <button
                                    type="button"
                                    className="btn btn-warning dropdown-toggle"
                                    data-toggle="dropdown"
                                >
                                    {mockSwitchText}
                                    <span className="mock-switch-caret caret"/>
                                </button>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <a onClick={()=>onSwitchMockService(true)} href="javascript:void 0;">开启</a></li>
                                    <li>
                                        <a onClick={()=>onSwitchMockService(false)} href="javascript:void 0;">关闭</a>
                                    </li>
                                </ul>
                            </div> : null}
                    </div>
                    <div className="group_setting">
                        <table className="group_setting_table table table-striped table-hover">
                            <tbody>
                            <tr>
                                <th className="rule-select">
                                    <input type="checkbox" checked={isAllSelected} name="rule-select-all"
                                           onChange={this.toggleSelectAll}/>
                                </th>
                                <th className="domain">域</th>
                                <th className="env">环境</th>
                                <th className="host">host</th>
                                <th className="action">操作</th>
                            </tr>
                            {currentGroup ?
                                currentGroup.map((groupData, i)=>
                                    <Rule
                                        key={activated + groupData.domain}
                                        ruleIndex={i}
                                        {...groupData}
                                        server={server}
                                        groupName={activated}
                                        ruleList={currentGroup}
                                        onEnvChange={onEnvChange}
                                        onHostChange={onHostChange}
                                        onDeleteRule={onDeleteRule}
                                        onEditDomain={onEditDomain}
                                        onSelectRule={onSelectRule}
                                        onDeselectRule={onDeselectRule}
                                        onMultiDeleteRule={onMultiDeleteRule}
                                    />) :
                                null}
                            </tbody>
                        </table>
                    </div>
                </div>
                <InsertGroupModal group={group} onInsertGroup={onInsertGroup}/>
                <InsertRuleModal
                    serverInfo={server}
                    onInsertRule={onInsertRule}
                    existedRuleList={currentGroup}
                    groupName={activated}
                />
                <ExportHostListModal
                    hostList={exportHostList(currentGroup, server, true)}
                />
            </div>
        );
    },
    toggleSelectAll(evt){
        var {group, activated, onSelectRule, onDeselectRule}=this.props,
            ruleList = group[activated];

        ruleList.forEach(function (rule, index) {
            let checked = evt.target.checked;
            if (checked) {
                onSelectRule(activated, index);
            } else {
                onDeselectRule(activated, index);
            }
        });
    },
    deleteGroup(){
        const {onDeleteGroup, activated}=this.props;
        if (confirm('确定删除吗?')) {
            onDeleteGroup(activated);
        }
    },
    multiDeleteRule(){
        const {onMultiDeleteRule, activated}=this.props;
        if (confirm('确定删除吗?')) {
            onMultiDeleteRule(activated);
        }
    }
});