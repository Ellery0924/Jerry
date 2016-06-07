/**
 * Created by Ellery1 on 16/6/7.
 */
import Immutable from 'immutable';

var guid = -1;

export function pushLog(logState, logData) {

    var renderedLogData = logData.map(log=> {

        var index = ++guid;
        return Immutable.fromJS(Object.assign({}, log, {index}));
    });

    return logState
        .updateIn(['list'], list=> {

            return list.concat(renderedLogData);
        })
        .updateIn(['filtered'], filteredList=> {

            var condition = logState.get('filterCondition').toJS();
            var filteredRenderedLogData = renderedLogData.filter(log=>_filterSingleLog(log.toJS(), condition));

            return filteredList.concat(Immutable.fromJS(filteredRenderedLogData));
        });
}

export function checkDetail(logState, index) {

    return logState.updateIn('current', logState.get('list').find(item=>item.index === index));
}

export function filter(logState, condition) {

    return logState
        .updateIn(['filterCondition'], ()=>Immutable.fromJS(condition))
        .updateIn(['filtered'], ()=> {

            return logState.get('list').filter(log=>_filterSingleLog(log.toJS(), condition));
        });
}

export function clear(logState) {

    return logState
        .updateIn(['filtered'], _=>Immutable.fromJS([]))
        .updateIn(['list'], _=>Immutable.fromJS([]))
        .updateIn(['current', _=>Immutable.fromJS({})]);
}

function _filterSingleLog(logData, condition) {

    var method = condition.method || 'ALL',
        regex = condition.regex === '' ? null : condition.regex;

    if ((method === 'ALL' || logData.method === method)) {

        if (regex !== null) {

            let r = new RegExp(regex);
            return r.test(logData.url);
        }
        return true;
    }
    return false;
}