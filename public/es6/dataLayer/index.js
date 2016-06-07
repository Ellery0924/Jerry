import qproxyReducer from './qproxy';
import loggerReducer from './log';

import Immutable from 'immutable';

var initialState = Immutable.fromJS({
    qproxy: {
        config: {
            group: {},
            activated: '',
            rewrite: []
        },
        server: {}
    },
    logger: {
        filterCondition: {},
        current: {},
        list: [],
        filtered: []
    }
});

export default function (state = initialState, action) {

    return Immutable.fromJS({
        qproxy: qproxyReducer(state, action),
        logger: loggerReducer(state, action)
    });
}