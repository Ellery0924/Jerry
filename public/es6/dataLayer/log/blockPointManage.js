import Immutable from 'immutable';
var blockPointSettingId = -1;

export function initBlockPointList(logState, list) {
    return logState.updateIn(['blockPoint'], () =>
        Immutable.fromJS(list.map(setting =>
            Object.assign(setting, { selected: false, id: ++blockPointSettingId }))
        )
    );
}

export function insertBlockPoint(logState, regex) {
    return logState.updateIn(['blockPoint'], list =>
        list.push(Immutable.fromJS({
            regex,
            isOn: true,
            selected: false,
            id: ++blockPointSettingId
        }))
    );
}

export function removeBlockPoint(logState, index) {
    return logState.updateIn(['blockPoint'], list => list.delete(index));
}

function _updateSetting(logState, index, attr) {
    const targetSetting = logState.get('blockPoint').get(index).toJS(),
        modifiedSetting = Object.assign(targetSetting, attr);
    return logState.updateIn(['blockPoint'], list =>
        list.set(index, Immutable.fromJS(modifiedSetting))
    );
}

export function switchBlockPoint(logState, index, isOn) {
    return _updateSetting(logState, index, { isOn });
}

export function selectBlockPoint(logState, index) {
    return _updateSetting(logState, index, { selected: true });
}

export function deselectBlockPoint(logState, index) {
    return _updateSetting(logState, index, { selected: false });
}

export function selectAllBlockPoint(logState) {
    return logState.updateIn(['blockPoint'], list =>
        list.map(setting =>
            Immutable.fromJS(Object.assign(setting.toJS(), { selected: true }))
        )
    );
}

export function deselectAllBlockPoint(logState) {
    return logState.updateIn(['blockPoint'], list =>
        list.map(setting =>
            Immutable.fromJS(Object.assign(setting.toJS(), { selected: false }))
        )
    );
}

export function removeSelectedBlockPoint(logState) {
    return logState.updateIn(['blockPoint'], list =>
        list.filter(setting => !setting.get('selected'))
    );
}

export function removeBlockPointByUrl(logState, url) {
    return logState.updateIn(['blockPoint'], list =>
        list.delete(list.findIndex(setting =>
            url === setting.get('regex')
        ))
    );
}

export function modifyBlockPointRegex(logState, index, regex) {
    return _updateSetting(logState, index, { regex });
}