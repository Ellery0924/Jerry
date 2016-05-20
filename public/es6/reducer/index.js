import {
    MULTI_DELETE_RULE,
    SELECT_RULE,
    DESELECT_RULE,
    RECEIVE_CONFIG,
    SELECT_GROUP,
    SELECT_ENV,
    SELECT_HOST,
    DELETE_RULE,
    DELETE_GROUP,
    INSERT_GROUP,
    EDIT_DOMAIN,
    INSERT_RULE,
    SET_SERVER,
    SET_PATTERN,
    INSERT_PATTERN,
    DELETE_PATTERN,
    SWITCH_HTTPS} from '../action';
import {
    multiDeleteRule,
    deselectRule,
    selectRule,
    receiveConfig,
    selectGroup,
    selectEnv,
    selectHost,
    deleteRule,
    deleteGroup,
    insertGroup,
    editDomain,
    insertRule,
    switchHttps} from './hostManage';
import {setServer} from './serverManage';
import {setPattern,insertPattern,deletePattern} from './rewriteManage';

import Immutable from 'immutable';

var initialState = Immutable.fromJS({
    config: {
        group: {},
        activated: '',
        rewrite: []
    },
    server: {}
});

export function qproxyApp(state = initialState, action) {

    switch (action.type) {

        case RECEIVE_CONFIG:
            return receiveConfig(action.config, action.server);

        case SELECT_GROUP:
            return selectGroup(state, action.groupName);

        case SELECT_ENV:
            return selectEnv(state, action.groupName, action.ruleIndex, action.env);

        case SELECT_HOST:
            return selectHost(state, action.groupName, action.ruleIndex, action.env, action.host);

        case DELETE_RULE:
            return deleteRule(state, action.groupName, action.ruleIndex);

        case DELETE_GROUP:
            return deleteGroup(state, action.groupName);

        case INSERT_GROUP:
            return insertGroup(state, action.groupName);

        case EDIT_DOMAIN:
            return editDomain(state, action.groupName, action.ruleIndex, action.domain);

        case INSERT_RULE:
            return insertRule(state, action.groupName, action.ruleList);

        case SELECT_RULE:
            return selectRule(state,action.groupName,action.ruleIndex);

        case DESELECT_RULE:
            return deselectRule(state,action.groupName,action.ruleIndex);

        case MULTI_DELETE_RULE:
            return multiDeleteRule(state,action.groupName);

        case SET_SERVER:
            return setServer(state, action.server);

        case SET_PATTERN:
            return setPattern(state, action.index, action.pattern);

        case INSERT_PATTERN:
            return insertPattern(state, action.pattern);

        case DELETE_PATTERN:
            return deletePattern(state, action.index);

        case SWITCH_HTTPS:
            return switchHttps(state,action.isOn);

        default:
            return state;
    }
}