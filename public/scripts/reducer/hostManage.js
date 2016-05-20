'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.receiveConfig = receiveConfig;
exports.selectEnv = selectEnv;
exports.selectGroup = selectGroup;
exports.selectHost = selectHost;
exports.insertRule = insertRule;
exports.insertGroup = insertGroup;
exports.deleteRule = deleteRule;
exports.deleteGroup = deleteGroup;
exports.editDomain = editDomain;
exports.selectRule = selectRule;
exports.deselectRule = deselectRule;
exports.multiDeleteRule = multiDeleteRule;
exports.switchHttps = switchHttps;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function receiveConfig(config, server) {

    return _immutable2.default.fromJS({ config: config, server: server }).updateIn(['config', 'multiDeleteDisabled'], function (_) {
        return true;
    });
} /**
   * Created by Ellery1 on 16/1/2.
   */

function selectEnv(state, groupName, ruleIndex, env) {

    return state.updateIn(['config', 'group', groupName, ruleIndex, 'current'], function (_) {
        return env;
    }).updateIn(['config', 'group', groupName, ruleIndex, 'cache', env], function (hostIndex) {

        return hostIndex ? hostIndex : env === 'custom' || env === 'online' ? '' : 1;
    });
}

function selectGroup(state, groupName) {

    return state.updateIn(['config', 'activated'], function (_) {
        return groupName;
    }).updateIn(['config', 'multiDeleteDisabled'], function (_) {
        return true;
    }).updateIn(['config', 'group', groupName], function (ruleList) {
        return ruleList.map(function (rule) {
            return rule.set('selected', false);
        });
    });
}

function selectHost(state, groupName, ruleIndex, env, host) {

    return state.updateIn(['config', 'group', groupName, ruleIndex, 'cache', env], function (_) {
        return host;
    });
}

function insertRule(state, groupName, ruleList) {

    return state.updateIn(['config', 'group', groupName], function (rules) {
        return rules.concat(_immutable2.default.fromJS(ruleList));
    });
}

function insertGroup(state, groupName) {

    return state.updateIn(['config', 'group'], function (group) {
        return group.set(groupName, _immutable2.default.fromJS([]));
    }).updateIn(['config', 'activated'], function (_) {
        return groupName;
    });
}

function deleteRule(state, groupName, ruleIndex) {

    return state.updateIn(['config', 'group', groupName], function (rules) {
        return rules.filter(function (rule, index) {
            return ruleIndex !== index;
        });
    });
}

function deleteGroup(state, groupName) {

    return state.updateIn(['config', 'group'], function (group) {
        var newGroup = {},
            groupObj = group.toJS();

        Object.keys(groupObj).forEach(function (key) {
            if (key !== groupName) {
                newGroup[key] = groupObj[key];
            }
        });

        return _immutable2.default.fromJS(newGroup);
    }).updateIn(['config', 'activated'], function (_) {
        return 'default';
    });
}

function editDomain(state, groupName, ruleIndex, domain) {

    return state.updateIn(['config', 'group', groupName, ruleIndex, 'domain'], function (_) {
        return domain;
    });
}

function selectRule(state, groupName, ruleIndex) {

    return state.updateIn(['config', 'group', groupName, ruleIndex, 'selected'], function (_) {
        return true;
    }).updateIn(['config', 'multiDeleteDisabled'], function (_) {
        return false;
    });
}

function deselectRule(state, groupName, ruleIndex) {

    var newState = state.updateIn(['config', 'group', groupName, ruleIndex, 'selected'], function (_) {
        return false;
    });

    return newState.updateIn(['config', 'multiDeleteDisabled'], function (_) {
        return newState.get('config').get('group').get(groupName).every(function (rule) {
            return !rule.get('selected');
        });
    });
}

function multiDeleteRule(state, groupName) {

    return state.updateIn(['config', 'group', groupName], function (ruleList) {
        return ruleList.filter(function (rule) {
            return !rule.get('selected');
        });
    }).updateIn(['config', 'multiDeleteDisabled'], function (_) {
        return true;
    });
}

function switchHttps(state, isOn) {

    return state.updateIn(['config', 'httpsOn'], function (_) {
        return isOn;
    });
}
//# sourceMappingURL=hostManage.js.map
