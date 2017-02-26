/**
 * Created by Ellery1 on 16/1/1.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigator from '../Common/Navigator';
import HostManage from '../HostManage/index';
import {
    selectRule,
    deselectRule,
    multiDeleteRuleAndSave,
    selectGroupAndSave,
    selectEnvAndSave,
    selectHostAndSave,
    deleteRuleAndSave,
    deleteGroupAndSave,
    insertGroupAndSave,
    insertRuleAndSave,
    editDomainAndSave,
    switchHttpsAndSave,
    selectThrottleLevelAndSave,
    switchMockServiceAndSave
} from '../../dataLayer/qproxy/action';

const HostManageView = React.createClass({
    render() {
        const { dispatch, server }=this.props,
            { group, activated, multiDeleteDisabled, httpsOn, throttleLevel, mockServices } = this.props.config;

        return (
            <div className="qproxyApp">
                <Navigator/>
                <HostManage
                    group={group}
                    mockServices={mockServices}
                    httpsOn={httpsOn}
                    throttleLevel={throttleLevel}
                    activated={activated}
                    multiDeleteDisabled={multiDeleteDisabled}
                    server={server}
                    onSelectGroup={(groupName) => dispatch(selectGroupAndSave(groupName))}
                    onEnvChange={(groupName, ruleIndex, env) => dispatch(selectEnvAndSave(groupName, ruleIndex, env))}
                    onHostChange={(groupName, ruleIndex, env, host) => dispatch(selectHostAndSave(groupName, ruleIndex, env, host))}
                    onDeleteRule={(groupName, ruleIndex) => dispatch(deleteRuleAndSave(groupName, ruleIndex))}
                    onDeleteGroup={(groupName) => dispatch(deleteGroupAndSave(groupName))}
                    onInsertGroup={(groupName) => dispatch(insertGroupAndSave(groupName))}
                    onEditDomain={(groupName, ruleIndex, domain) => dispatch(editDomainAndSave(groupName, ruleIndex, domain))}
                    onInsertRule={(groupName, ruleList) => {
                        dispatch(insertRuleAndSave(groupName, ruleList))
                    }}
                    onSelectRule={(groupName, ruleIndex) => {
                        dispatch(selectRule(groupName, ruleIndex))
                    }}
                    onDeselectRule={(groupName, ruleIndex) => {
                        dispatch(deselectRule(groupName, ruleIndex))
                    }}
                    onMultiDeleteRule={(groupName) => dispatch(multiDeleteRuleAndSave(groupName))}
                    onSwitchHttps={(isOn) => dispatch(switchHttpsAndSave(isOn))}
                    onSelectThrottleLevel={level => dispatch(selectThrottleLevelAndSave(level))}
                    onSwitchMockService={open => dispatch(switchMockServiceAndSave(open))}
                />
            </div>
        );
    }
});

function select(state) {
    return state.qproxy.toJS();
}

export default connect(select)(HostManageView);