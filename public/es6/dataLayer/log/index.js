/**
 * Created by Ellery1 on 16/6/6.
 */
import {FILTER, CHECK_DETAIL, PUSH_LOG} from './action';
import {filter, checkDetail, pushLog} from './log';

export default function (state, action) {

    var logState = state.get('logger');

    switch (action.type) {
        case FILTER:
            return filter(logState, action.condition);

        case CHECK_DETAIL:
            return checkDetail(logState, action.index);

        case PUSH_LOG:
            return pushLog(logState, action.logData);

        default:
            return logState;
    }
}