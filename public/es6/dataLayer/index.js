import qproxyReducer from './qproxy';
import loggerReducer from './log';

import Immutable from 'immutable';

var initialState = {
    qproxy: Immutable.fromJS({
        config: {
            group: {},
            activated: '',
            rewrite: []
        },
        server: {}
    }),
    logger: Immutable.fromJS({
        filterCondition: {
            method: 'ALL',
            regex: ''
        },
        isBlocked: false,
        current: {},
        list: [],
        filtered: [],
        blockPoint: []
    })
};

export default function (state = initialState, action) {

    return {
        qproxy: qproxyReducer(state, action),
        logger: loggerReducer(state, action)
    };
}