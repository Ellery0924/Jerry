/**
 * Created by Ellery1 on 16/6/7.
 */
import Immutable from 'immutable';

export function pushLog(logState, logData) {

}

export function checkDetail(logState, index) {

}

export function filter(logState, condition) {

    return logState
        .updateIn('filterCondition', Immutable.fromJS(condition))
        .filter(log=>_filterSingleLog(log.toJS(), condition));
}

function _filterSingleLog(log, condition) {

    var method = condition.method || 'ALL',
        regex = condition.regex || null;

    if ((method === 'ALL' || log.method === method)) {

        if (regex !== null) {

            let r = new RegExp(regex);
            return r.test(log.url);
        }
        return true;
    }
    return false;
}