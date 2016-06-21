/**
 * Created by Ellery1 on 16/6/7.
 */
import Immutable from 'immutable';

const MAX_LOG_NUM = 1000;
var guid = -1;

function _renderLogData(logData) {

    return Immutable.fromJS(logData.map(log=> {

        var index = ++guid;
        return Object.assign({}, log, {index});
    }));
}

function _filterSingleLog(logData, condition) {

    var method = condition.method || 'ALL',
        regex = condition.regex === '' ? null : condition.regex;

    if (method === 'ALL' || logData.method === method) {

        if (regex !== null) {

            let r = new RegExp(regex);
            return r.test(logData.url.replace(/\?.+/, ''));
        }
        return true;
    }
    return false;
}

export function pushLog(logState, logData) {

    var renderedLogData = _renderLogData(logData);

    return logState
        .updateIn(['list'], list=> {

            return list.concat(renderedLogData).slice(-MAX_LOG_NUM);
        })
        .updateIn(['filtered'], filteredList=> {

            var condition = logState.get('filterCondition').toJS();
            var filteredRenderedLogData = renderedLogData.filter(log=>_filterSingleLog(log.toJS(), condition));

            return filteredList.concat(filteredRenderedLogData).slice(-MAX_LOG_NUM);
        });
}

export function checkDetail(logState, current) {

    return logState.updateIn(['current'], ()=>Immutable.fromJS(current));
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
        .updateIn(['filtered'], ()=>Immutable.fromJS([]))
        .updateIn(['list'], ()=>Immutable.fromJS([]))
        .updateIn(['current'], ()=>Immutable.fromJS({}));
}

export function closeDetail(logState) {

    return logState.updateIn(['current'], ()=>Immutable.fromJS({}));
}

export function pushBlockPoint(logState, logData) {

    var newState = logState
        .updateIn(['list'], list=> {

            return list.concat(_renderLogData(logData));
        })
        .updateIn(['isBlocked'], ()=>true)
        .updateIn(['filterCondition'], ()=>Immutable.fromJS({method: "ALL", regex: ""}));

    return newState.updateIn(['filtered'], ()=> {

        return newState.get('list').filter(log=> {

            var logJs = log.toJS();
            return logJs.type === 'blockpoint' && !logJs.isProposed;
        });
    });
}

export function blockPointHandle(logState, blockPoint) {

    var guid = blockPoint.guid;

    var newState = logState
        .updateIn(['filtered'], filtered=> {

            return filtered.filter(log=> {

                return log.toJS().guid !== guid;
            });
        })
        .updateIn(['list'], list=> {

            return list.filter(log=> {

                return log.toJS().guid !== guid;
            });
        })
        .updateIn(['current'], ()=> Immutable.fromJS({}));

    return newState
        .updateIn(['isBlocked'], ()=> {

            return newState.get('list').some(log=> {

                return log.toJS().type === 'blockpoint';
            });
        })
        .updateIn(['filtered'], filtered=> {

            if (!filtered.size) {

                return newState.get('list');
            }
            return filtered;
        });
}

export function initBlockPointList(logState, list) {

    return logState.updateIn(['blockPoint'], ()=>
        Immutable.fromJS(list.map(setting=>Object.assign(setting, {selected: false})))
    );
}

export function insertBlockPoint(logState, regex) {

    return logState.updateIn(['blockPoint'], list=>
        list.push(Immutable.fromJS({
            regex,
            isOn: true,
            selected: false
        }))
    );
}

export function removeBlockPoint(logState, index) {

    return logState.updateIn(['blockPoint'], list=>list.delete(index));
}

function _updateSetting(logState, index, attr) {

    var targetSetting = logState.get('blockPoint').get(index).toJS(),
        modifiedSetting = Object.assign(targetSetting, attr);
    return logState.updateIn(['blockPoint'], list=>list.set(index, Immutable.fromJS(modifiedSetting)));
}

export function switchBlockPoint(logState, index, isOn) {

    return _updateSetting(logState, index, {isOn});
}

export function selectBlockPoint(logState, index) {

    return _updateSetting(logState, index, {selected: true});
}

export function deselectBlockPoint(logState, index) {

    return _updateSetting(logState, index, {selected: false});
}

export function selectAllBlockPoint(logState) {

    return logState.updateIn(['blockPoint'], list=>
        list.map(setting=>
            Immutable.fromJS(Object.assign(setting.toJS(), {selected: true}))
        )
    );
}

export function deselectAllBlockPoint(logState) {

    return logState.updateIn(['blockPoint'], list=>
        list.map(setting=>
            Immutable.fromJS(Object.assign(setting.toJS(), {selected: false}))
        )
    );
}

export function removeSelectedBlockPoint(logState) {

    return logState.updateIn(['blockPoint'], list=>
        list.filter(setting=>!setting.selected)
    );
}

export function removeBlockPointByUrl(logState, url) {

    return logState.updateIn(['blockPoint'], list=>
        list.delete(list.findIndex(setting=>
            url === setting.get('regex')
        ))
    );
}

export function modifyBlockPointRegex(logState, index, regex) {

    return _updateSetting(logState, index, {regex});
}