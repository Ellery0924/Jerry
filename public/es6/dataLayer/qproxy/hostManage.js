/**
 * Created by Ellery1 on 16/1/2.
 */
import Immutable from 'immutable';

export function receiveConfig(config, server) {
    return Immutable.fromJS({ config, server })
        .updateIn(['config', 'multiDeleteDisabled'], () => true)
        .updateIn(['config', 'activated'], activated => activated ? activated : 'default');
}

export function selectEnv(state, groupName, ruleIndex, env) {
    return state
        .updateIn(['config', 'group', groupName, ruleIndex, 'current'], () => env)
        .updateIn(['config', 'group', groupName, ruleIndex, 'cache', env], hostIndex => {
            return hostIndex ? hostIndex :
                env === 'custom' || env === 'online' ? '' : 1;
        });
}

export function selectGroup(state, groupName) {
    return state
        .updateIn(['config', 'activated'], () => groupName)
        .updateIn(['config', 'multiDeleteDisabled'], () => true)
        .updateIn(['config', 'group', groupName], ruleList => ruleList.map(rule => rule.set('selected', false)));
}

export function selectHost(state, groupName, ruleIndex, env, host) {
    return state.updateIn(['config', 'group', groupName, ruleIndex, 'cache', env], () => host);
}

export function insertRule(state, groupName, ruleList) {
    return state.updateIn(
        ['config', 'group', groupName],
        rules => rules.concat(Immutable.fromJS(ruleList))
    );
}

export function insertGroup(state, groupName) {
    return state
        .updateIn(
            ['config', 'group'],
            group => group.set(groupName, Immutable.fromJS([]))
        )
        .updateIn(['config', 'activated'], () => groupName);
}

export function deleteRule(state, groupName, ruleIndex) {
    return state.updateIn(
        ['config', 'group', groupName],
        rules => rules.filter((rule, index) => ruleIndex !== index)
    );
}

export function deleteGroup(state, groupName) {
    return state
        .updateIn(
            ['config', 'group'],
            group => {
                var newGroup = {},
                    groupObj = group.toJS();

                Object.keys(groupObj).forEach(key => {
                    if (key !== groupName) {
                        newGroup[key] = groupObj[key];
                    }
                });

                return Immutable.fromJS(newGroup);
            }
        )
        .updateIn(['config', 'activated'], () => 'default');
}

export function editDomain(state, groupName, ruleIndex, domain) {
    return state.updateIn(
        ['config', 'group', groupName, ruleIndex, 'domain'],
        () => domain
    );
}

export function selectRule(state, groupName, ruleIndex) {
    return state
        .updateIn(['config', 'group', groupName, ruleIndex, 'selected'], () => true)
        .updateIn(['config', 'multiDeleteDisabled'], () => false);
}

export function deselectRule(state, groupName, ruleIndex) {
    const newState = state.updateIn(['config', 'group', groupName, ruleIndex, 'selected'], () => false);

    return newState
        .updateIn(
            ['config', 'multiDeleteDisabled'],
            () => newState.get('config').get('group').get(groupName).every(rule => !rule.get('selected'))
        );
}

export function multiDeleteRule(state, groupName) {
    return state
        .updateIn(['config', 'group', groupName], ruleList => ruleList.filter(rule => !rule.get('selected')))
        .updateIn(['config', 'multiDeleteDisabled'], () => true);
}

export function switchHttps(state, isOn) {
    return state.updateIn(['config', 'httpsOn'], () => isOn);
}

export function selectThrottleLevel(state, level) {
    return state.updateIn(['config', 'throttleLevel'], () => level);
}

export function switchMockService(state, open) {
    if (!state.get('config').get('mockServices')) {
        state = state.updateIn(['config', 'mockServices'], () => Immutable.fromJS([]));
    }

    const activated = state.get('config').get('activated');

    return state.updateIn(['config', 'mockServices'], mservices => {
        if (open) {
            if (!mservices.find(groupName => groupName === activated)) {
                return mservices.push(activated);
            }
            return mservices;
        } else {
            return mservices.filter(groupName => groupName !== activated);
        }
    });
}