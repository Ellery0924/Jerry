'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.multiDeleteRule = multiDeleteRule;
exports.selectRule = selectRule;
exports.deselectRule = deselectRule;
exports.selectGroup = selectGroup;
exports.selectEnv = selectEnv;
exports.selectHost = selectHost;
exports.editDomain = editDomain;
exports.deleteRule = deleteRule;
exports.insertRule = insertRule;
exports.deleteGroup = deleteGroup;
exports.insertGroup = insertGroup;
exports.receiveConfig = receiveConfig;
exports.setServer = setServer;
exports.setPattern = setPattern;
exports.insertPattern = insertPattern;
exports.deletePattern = deletePattern;
exports.switchHttps = switchHttps;
exports.fetchConfig = fetchConfig;
exports.insertGroupAndSave = insertGroupAndSave;
exports.insertRuleAndSave = insertRuleAndSave;
exports.deleteGroupAndSave = deleteGroupAndSave;
exports.selectGroupAndSave = selectGroupAndSave;
exports.selectEnvAndSave = selectEnvAndSave;
exports.selectHostAndSave = selectHostAndSave;
exports.deleteRuleAndSave = deleteRuleAndSave;
exports.editDomainAndSave = editDomainAndSave;
exports.setServerAndSave = setServerAndSave;
exports.setPatternAndSave = setPatternAndSave;
exports.insertPatternAndSave = insertPatternAndSave;
exports.deletePatternAndSave = deletePatternAndSave;
exports.multiDeleteRuleAndSave = multiDeleteRuleAndSave;
exports.switchHttpsAndSave = switchHttpsAndSave;
/**
 * Created by Ellery1 on 16/1/1.
 */

var SELECT_GROUP = exports.SELECT_GROUP = 'SELECT_GROUP';
var RECEIVE_CONFIG = exports.RECEIVE_CONFIG = 'RECEIVE_CONFIG';
var FETCH_CONFIG = exports.FETCH_CONFIG = 'FETCH_CONFIG';
var SELECT_ENV = exports.SELECT_ENV = 'SELECT_ENV';
var SELECT_HOST = exports.SELECT_HOST = 'SELECT_HOST';
var DELETE_RULE = exports.DELETE_RULE = 'DELETE_RULE';
var DELETE_GROUP = exports.DELETE_GROUP = 'DELETE_GROUP';
var INSERT_GROUP = exports.INSERT_GROUP = 'INSERT_GROUP';
var EDIT_DOMAIN = exports.EDIT_DOMAIN = 'EDIT_DOMAIN';
var INSERT_RULE = exports.INSERT_RULE = 'INSERT_RULE';
var SET_SERVER = exports.SET_SERVER = 'SET_SERVER';
var SET_PATTERN = exports.SET_PATTERN = 'SET_PATTERN';
var DELETE_PATTERN = exports.DELETE_PATTERN = 'DELETE_PATTERN';
var INSERT_PATTERN = exports.INSERT_PATTERN = 'INSERT_PATTERN';
var SELECT_RULE = exports.SELECT_RULE = 'SELECT_RULE';
var DESELECT_RULE = exports.DESELECT_RULE = 'DESELECT_RULE';
var MULTI_DELETE_RULE = exports.MULTI_DELETE_RULE = 'MULTI_DELETE_RULE';
var SWITCH_HTTPS = exports.SWITCH_HTTPS = 'SWITCH_HTTPS';

function multiDeleteRule(groupName, indexes) {
    return { type: MULTI_DELETE_RULE, groupName: groupName, indexes: indexes };
}

function selectRule(groupName, ruleIndex) {
    return { type: SELECT_RULE, groupName: groupName, ruleIndex: ruleIndex };
}

function deselectRule(groupName, ruleIndex) {
    return { type: DESELECT_RULE, groupName: groupName, ruleIndex: ruleIndex };
}

function selectGroup(groupName) {
    return { type: SELECT_GROUP, groupName: groupName };
}

function selectEnv(groupName, ruleIndex, env) {
    return { type: SELECT_ENV, groupName: groupName, ruleIndex: ruleIndex, env: env };
}

function selectHost(groupName, ruleIndex, env, host) {
    return { type: SELECT_HOST, groupName: groupName, ruleIndex: ruleIndex, env: env, host: host };
}

function editDomain(groupName, ruleIndex, domain) {
    return { type: EDIT_DOMAIN, groupName: groupName, ruleIndex: ruleIndex, domain: domain };
}

function deleteRule(groupName, ruleIndex) {
    return { type: DELETE_RULE, groupName: groupName, ruleIndex: ruleIndex };
}

function insertRule(groupName, ruleList) {
    return { type: INSERT_RULE, groupName: groupName, ruleList: ruleList };
}

function deleteGroup(groupName) {
    return { type: DELETE_GROUP, groupName: groupName };
}

function insertGroup(groupName) {
    return { type: INSERT_GROUP, groupName: groupName };
}

function receiveConfig(config, server) {
    return { type: RECEIVE_CONFIG, config: config, server: server };
}

function setServer(server) {
    return { type: SET_SERVER, server: server };
}

function setPattern(index, pattern) {
    return { type: SET_PATTERN, index: index, pattern: pattern };
}

function insertPattern(pattern) {
    return { type: INSERT_PATTERN, pattern: pattern };
}

function deletePattern(index) {
    return { type: DELETE_PATTERN, index: index };
}

function switchHttps(isOn) {
    return { type: SWITCH_HTTPS, isOn: isOn };
}

function fetchConfig() {

    return function (dispatch) {
        return Promise.all([fetch('/proxy/config').then(function (res) {
            return res.json();
        }), fetch('/proxy/serverInfo').then(function (res) {
            return res.json();
        })]).then(function (result) {
            return dispatch(receiveConfig(result[0], result[1]));
        });
    };
}

function updateConfig(getState) {

    var source = getState().toJS(),
        config = source.config;

    //删除临时状态
    Object.keys(config.group).forEach(function (groupName) {
        config.group[groupName].forEach(function (rule) {
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

function insertGroupAndSave(groupName) {

    return function (dispatch, getState) {

        dispatch(insertGroup(groupName));
        return updateConfig(getState);
    };
}

function insertRuleAndSave(groupName, ruleList) {

    return function (dispatch, getState) {

        dispatch(insertRule(groupName, ruleList));
        return updateConfig(getState);
    };
}

function deleteGroupAndSave(groupName) {

    return function (dispatch, getState) {

        dispatch(deleteGroup(groupName));
        return updateConfig(getState);
    };
}

function selectGroupAndSave(groupName) {

    return function (dispatch, getState) {

        dispatch(selectGroup(groupName));
        return updateConfig(getState);
    };
}

function selectEnvAndSave(groupName, ruleIndex, env) {

    return function (dispatch, getState) {

        dispatch(selectEnv(groupName, ruleIndex, env));
        return updateConfig(getState);
    };
}

function selectHostAndSave(groupName, ruleIndex, env, host) {

    return function (dispatch, getState) {

        dispatch(selectHost(groupName, ruleIndex, env, host));
        return updateConfig(getState);
    };
}

function deleteRuleAndSave(groupName, ruleIndex) {

    return function (dispatch, getState) {

        dispatch(deleteRule(groupName, ruleIndex));
        return updateConfig(getState);
    };
}

function editDomainAndSave(groupName, ruleIndex, domain) {

    return function (dispatch, getState) {

        dispatch(editDomain(groupName, ruleIndex, domain));
        return updateConfig(getState);
    };
}

function setServerAndSave(server) {

    return function (dispatch, getState) {

        dispatch(setServer(server));

        return fetch('/proxy/serverInfo', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(getState().toJS())
        });
    };
}

function setPatternAndSave(index, pattern) {

    return function (dispatch, getState) {

        dispatch(setPattern(index, pattern));
        return updateConfig(getState);
    };
}

function insertPatternAndSave(pattern) {

    return function (dispatch, getState) {

        dispatch(insertPattern(pattern));
        return updateConfig(getState);
    };
}

function deletePatternAndSave(index) {

    return function (dispatch, getState) {

        dispatch(deletePattern(index));
        return updateConfig(getState);
    };
}

function multiDeleteRuleAndSave(groupName) {

    return function (dispatch, getState) {

        dispatch(multiDeleteRule(groupName));
        return updateConfig(getState);
    };
}

function switchHttpsAndSave(isOn) {

    return function (dispatch, getState) {

        alert(isOn ? '需要刷新SSL会话缓存,请重启chrome并刷新。' : 'warning:https的url rewrite功能将无法使用,host管理功能仍可正常使用。');
        dispatch(switchHttps(isOn));
        return updateConfig(getState);
    };
}
//# sourceMappingURL=action.js.map
