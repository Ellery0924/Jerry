/**
 * Created by Ellery1 on 16/1/1.
 */

export const SELECT_GROUP = 'SELECT_GROUP';
export const RECEIVE_CONFIG = 'RECEIVE_CONFIG';
export const FETCH_CONFIG = 'FETCH_CONFIG';
export const SELECT_ENV = 'SELECT_ENV';
export const SELECT_HOST = 'SELECT_HOST';
export const DELETE_RULE = 'DELETE_RULE';
export const DELETE_GROUP = 'DELETE_GROUP';
export const INSERT_GROUP = 'INSERT_GROUP';
export const EDIT_DOMAIN = 'EDIT_DOMAIN';
export const INSERT_RULE = 'INSERT_RULE';
export const SET_SERVER = 'SET_SERVER';
export const SET_PATTERN = 'SET_PATTERN';
export const DELETE_PATTERN = 'DELETE_PATTERN';
export const INSERT_PATTERN = 'INSERT_PATTERN';
export const SELECT_RULE = 'SELECT_RULE';
export const DESELECT_RULE = 'DESELECT_RULE';
export const MULTI_DELETE_RULE = 'MULTI_DELETE_RULE';
export const SWITCH_HTTPS = 'SWITCH_HTTPS';
export const SELECT_THROTTLE_LEVEL = 'SELECT_THROTTLE_LEVEL';
export const SWITCH_MOCK_SERVICE = 'SWITCH_MOCK_SERVICE';

export function multiDeleteRule(groupName, indexes) {
    return { type: MULTI_DELETE_RULE, groupName, indexes };
}

export function selectRule(groupName, ruleIndex) {
    return { type: SELECT_RULE, groupName, ruleIndex };
}

export function deselectRule(groupName, ruleIndex) {
    return { type: DESELECT_RULE, groupName, ruleIndex };
}

export function selectGroup(groupName) {
    return { type: SELECT_GROUP, groupName };
}

export function selectEnv(groupName, ruleIndex, env) {
    return { type: SELECT_ENV, groupName, ruleIndex, env };
}

export function selectHost(groupName, ruleIndex, env, host) {
    return { type: SELECT_HOST, groupName, ruleIndex, env, host };
}

export function editDomain(groupName, ruleIndex, domain) {
    return { type: EDIT_DOMAIN, groupName, ruleIndex, domain };
}

export function deleteRule(groupName, ruleIndex) {
    return { type: DELETE_RULE, groupName, ruleIndex };
}

export function insertRule(groupName, ruleList) {
    return { type: INSERT_RULE, groupName, ruleList }
}

export function deleteGroup(groupName) {
    return { type: DELETE_GROUP, groupName };
}

export function insertGroup(groupName) {
    return { type: INSERT_GROUP, groupName };
}

export function receiveConfig(config, server) {
    return { type: RECEIVE_CONFIG, config, server };
}

export function setServer(server) {
    return { type: SET_SERVER, server };
}

export function setPattern(index, pattern) {
    return { type: SET_PATTERN, index, pattern };
}

export function insertPattern(pattern) {
    return { type: INSERT_PATTERN, pattern };
}

export function deletePattern(index) {
    return { type: DELETE_PATTERN, index };
}

export function switchHttps(isOn) {
    return { type: SWITCH_HTTPS, isOn };
}

export function fetchConfig() {
    return dispatch =>
        Promise.all([
            fetch('/proxy/config').then(res => res.json()),
            fetch('/proxy/serverInfo').then(res => res.json())
        ])
            .then((result) => dispatch(receiveConfig(result[0], result[1])))
}

function updateConfig(getState) {
    const source = getState().qproxy.toJS(),
        config = source.config;

    //删除临时状态
    Object.keys(config.group).forEach(groupName => {
        config.group[groupName].forEach(rule => {
            delete rule.selected;
        });
    });
    config.multiDeleteDisabled = true;

    return fetch('/proxy/config', {
        method: 'put',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(source)
    });
}

export function insertGroupAndSave(groupName) {
    return (dispatch, getState) => {
        dispatch(insertGroup(groupName));
        return updateConfig(getState);
    }
}

export function insertRuleAndSave(groupName, ruleList) {
    return (dispatch, getState) => {
        dispatch(insertRule(groupName, ruleList));
        return updateConfig(getState);
    }
}

export function deleteGroupAndSave(groupName) {
    return function (dispatch, getState) {
        dispatch(deleteGroup(groupName));
        return updateConfig(getState);
    }
}

export function selectGroupAndSave(groupName) {
    return function (dispatch, getState) {
        dispatch(selectGroup(groupName));
        return updateConfig(getState);
    }
}

export function selectEnvAndSave(groupName, ruleIndex, env) {
    return function (dispatch, getState) {
        dispatch(selectEnv(groupName, ruleIndex, env));
        return updateConfig(getState);
    }
}

export function selectHostAndSave(groupName, ruleIndex, env, host) {
    return function (dispatch, getState) {
        dispatch(selectHost(groupName, ruleIndex, env, host));
        return updateConfig(getState);
    }
}

export function deleteRuleAndSave(groupName, ruleIndex) {
    return function (dispatch, getState) {
        dispatch(deleteRule(groupName, ruleIndex));
        return updateConfig(getState);
    }
}

export function editDomainAndSave(groupName, ruleIndex, domain) {
    return function (dispatch, getState) {
        dispatch(editDomain(groupName, ruleIndex, domain));
        return updateConfig(getState);
    }
}

export function setServerAndSave(server) {
    return function (dispatch, getState) {
        dispatch(setServer(server));
        return fetch('/proxy/serverInfo', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(getState().qproxy.toJS().server)
        });
    }
}

export function setPatternAndSave(index, pattern) {
    return function (dispatch, getState) {
        dispatch(setPattern(index, pattern));
        return updateConfig(getState);
    }
}

export function insertPatternAndSave(pattern) {
    return function (dispatch, getState) {
        dispatch(insertPattern(pattern));
        return updateConfig(getState);
    }
}

export function deletePatternAndSave(index) {
    return function (dispatch, getState) {
        dispatch(deletePattern(index));
        return updateConfig(getState);
    }
}

export function multiDeleteRuleAndSave(groupName) {
    return function (dispatch, getState) {
        dispatch(multiDeleteRule(groupName));
        return updateConfig(getState);
    }
}

export function switchHttpsAndSave(isOn) {
    return function (dispatch, getState) {
        alert(isOn ? '需要刷新SSL会话缓存,请重启chrome并刷新。' : 'warning:https的url rewrite功能将无法使用,host管理功能仍可正常使用。');
        dispatch(switchHttps(isOn));
        return updateConfig(getState);
    }
}

export function selectThrottleLevel(level) {
    return { type: SELECT_THROTTLE_LEVEL, level };
}

export function selectThrottleLevelAndSave(level) {
    return function (dispatch, getState) {
        dispatch(selectThrottleLevel(level));
        return updateConfig(getState);
    }
}

export function switchMockService(open) {
    return { type: SWITCH_MOCK_SERVICE, open };
}

export function switchMockServiceAndSave(open) {
    return function (dispatch, getState) {
        dispatch(switchMockService(open));
        return updateConfig(getState);
    }
}
