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
    SWITCH_HTTPS,
    SELECT_THROTTLE_LEVEL,
    SWITCH_MOCK_SERVICE
} from './action';
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
    switchHttps,
    selectThrottleLevel,
    switchMockService
} from './hostManage';
import { setServer } from './serverManage';
import { setPattern, insertPattern, deletePattern } from './rewriteManage';

export default function (state, action) {
    const subState = state.qproxy;

    switch (action.type) {
    case RECEIVE_CONFIG:
        return receiveConfig(action.config, action.server);
    case SELECT_GROUP:
        return selectGroup(subState, action.groupName);
    case SELECT_ENV:
        return selectEnv(subState, action.groupName, action.ruleIndex, action.env);
    case SELECT_HOST:
        return selectHost(subState, action.groupName, action.ruleIndex, action.env, action.host);
    case DELETE_RULE:
        return deleteRule(subState, action.groupName, action.ruleIndex);
    case DELETE_GROUP:
        return deleteGroup(subState, action.groupName);
    case INSERT_GROUP:
        return insertGroup(subState, action.groupName);
    case EDIT_DOMAIN:
        return editDomain(subState, action.groupName, action.ruleIndex, action.domain);
    case INSERT_RULE:
        return insertRule(subState, action.groupName, action.ruleList);
    case SELECT_RULE:
        return selectRule(subState, action.groupName, action.ruleIndex);
    case DESELECT_RULE:
        return deselectRule(subState, action.groupName, action.ruleIndex);
    case MULTI_DELETE_RULE:
        return multiDeleteRule(subState, action.groupName);
    case SET_SERVER:
        return setServer(subState, action.server);
    case SET_PATTERN:
        return setPattern(subState, action.index, action.pattern);
    case INSERT_PATTERN:
        return insertPattern(subState, action.pattern);
    case DELETE_PATTERN:
        return deletePattern(subState, action.index);
    case SWITCH_HTTPS:
        return switchHttps(subState, action.isOn);
    case SELECT_THROTTLE_LEVEL:
        return selectThrottleLevel(subState, action.level);
    case SWITCH_MOCK_SERVICE:
        return switchMockService(subState, action.open);
    default:
        return subState;
    }
}