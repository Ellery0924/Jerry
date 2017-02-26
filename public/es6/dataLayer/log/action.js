/**
 * Created by Ellery1 on 16/6/6.
 */
export const PUSH_LOG = 'PUSH_LOG';
export const PUSH_BLOCK_POINT = 'PUSH_BLOCK_POINT';
export const BLOCK_POINT_CONTINUE = 'BLOCK_POINT_CONTINUE';
export const BLOCK_POINT_ABORT = 'BLOCK_POINT_ABORT';
export const CHECK_DETAIL = 'CHECK_DETAIL';
export const FILTER = 'FILTER';
export const CLEAR = 'CLEAR';
export const CLOSE_DETAIL = 'CLOSE_DETAIL';
export const FETCH_BLOCK_POINT = 'FETCH_BLOCK_POINT';
export const INIT_BLOCK_POINT_LIST = 'INIT_BLOCK_POINT_LIST';
export const INSERT_BLOCK_POINT = 'INSERT_BLOCK_POINT';
export const REMOVE_BLOCK_POINT = 'REMOVE_BLOCK_POINT';
export const REMOVE_BLOCK_POINT_BY_URL = 'REMOVE_BLOCK_POINT_BY_URL';
export const SWITCH_BLOCK_POINT = 'SWITCH_BLOCK_POINT';
export const REMOVE_SELECTED_BLOCK_POINT = 'REMOVE_SELECTED_BLOCK_POINT';
export const SELECT_BLOCK_POINT = 'SELECT_BLOCK_POINT';
export const DESELECT_BLOCK_POINT = 'DESELECT_BLOCK_POINT';
export const SELECT_ALL_BLOCK_POINT = 'SELECT_ALL_BLOCK_POINT';
export const DESELECT_ALL_BLOCK_POINT = 'DESELECT_ALL_BLOCK_POINT';
export const MODIFY_BLOCK_POINT_REGEX = 'MODIFY_BLOCK_POINT_REGEX';

export function pushLog(logData) {
    return { type: PUSH_LOG, logData };
}

export function pushBlockPoint(logData) {
    return { type: PUSH_BLOCK_POINT, logData };
}

export function blockPointContinue(blockPoint) {
    return { type: BLOCK_POINT_CONTINUE, blockPoint };
}

export function blockPointAbort(blockPoint) {
    return { type: BLOCK_POINT_ABORT, blockPoint };
}

export function blockPointContinueAsync(blockPoint, noJsonp) {
    return function (dispatch, getState) {
        const wsClient = window.qproxy.logClient;
        dispatch(blockPointContinue(blockPoint));
        let isBlocked = getState().logger.get('isBlocked');
        wsClient.emit('blockPointContinue', blockPoint, isBlocked, noJsonp);
    }
}

export function blockPointAbortAsync(blockPoint) {
    return function (dispatch, getState) {
        const wsClient = window.qproxy.logClient;
        dispatch(blockPointAbort(blockPoint));
        let isBlocked = getState().logger.get('isBlocked');
        wsClient.emit('blockPointAbort', blockPoint, isBlocked);
    }
}

export function allBlockPointContinueAsync() {
    return function (dispatch, getState) {
        getState().logger.get('list').toJS().forEach(log => {
            if (log.type === 'blockpoint') {
                log.response.body = log.response.raw;
                dispatch(blockPointContinueAsync(log, true));
            }
        });
    }
}

export function allBlockPointAbortAsync() {
    return function (dispatch, getState) {
        getState().logger.get('list').toJS().forEach(log => {
            if (log.type === 'blockpoint') {
                dispatch(blockPointAbortAsync(log));
            }
        });
    }
}

export function checkDetail(current) {
    return { type: CHECK_DETAIL, current };
}

export function filter(condition) {
    return { type: FILTER, condition };
}

export function clear() {
    return { type: CLEAR };
}

export function closeDetail() {
    return { type: CLOSE_DETAIL };
}

export function fetchBlockPoint() {
    return function (dispatch) {
        return fetch('/qproxy/blockPointSetting', {
            method: 'get'
        })
            .then(res => res.json())
            .then(res => {
                dispatch(initBlockPointList(res.list));
            });
    }
}

export function initBlockPointList(list) {
    return { type: INIT_BLOCK_POINT_LIST, list };
}

export function insertBlockPoint(regex) {
    return { type: INSERT_BLOCK_POINT, regex };
}

export function removeBlockPoint(index) {
    return { type: REMOVE_BLOCK_POINT, index };
}

export function switchBlockPoint(index, isOn) {
    return { type: SWITCH_BLOCK_POINT, index, isOn };
}

export function removeSelectedBlockPoint() {
    return { type: REMOVE_SELECTED_BLOCK_POINT };
}

export function selectBlockPoint(index) {
    return { type: SELECT_BLOCK_POINT, index };
}

export function deselectBlockPoint(index) {
    return { type: DESELECT_BLOCK_POINT, index };
}

export function selectAllBlockPoint() {
    return { type: SELECT_ALL_BLOCK_POINT };
}

export function deselectAllBlockPoint() {
    return { type: DESELECT_ALL_BLOCK_POINT };
}

export function removeBlockPointByUrl(url) {
    return { type: REMOVE_BLOCK_POINT_BY_URL, url };
}

export function modifyBlockPointRegex(index, regex) {
    return { type: MODIFY_BLOCK_POINT_REGEX, index, regex };
}

function updateBlockPointSetting(getState) {
    const settingList = getState().logger.get('blockPoint').toJS().map(setting => ({
        regex: setting.regex,
        isOn: setting.isOn
    }));

    return fetch('/qproxy/blockPointSetting', {
        method: 'put',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ setting: settingList })
    });
}

export function insertBlockPointAndSave(regex) {
    return (dispatch, getState) => {
        dispatch(insertBlockPoint(regex));
        updateBlockPointSetting(getState);
    }
}

export function removeBlockPointAndSave(index) {
    return (dispatch, getState) => {
        dispatch(removeBlockPoint(index));
        updateBlockPointSetting(getState);
    }
}

export function switchBlockPointAndSave(index, isOn) {
    return (dispatch, getState) => {
        dispatch(switchBlockPoint(index, isOn));
        updateBlockPointSetting(getState);
    }
}

export function removeSelectedBlockPointAndSave() {
    return (dispatch, getState) => {
        dispatch(removeSelectedBlockPoint());
        updateBlockPointSetting(getState);
    }
}

export function removeBlockPointByUrlAndSave(url) {
    return (dispatch, getState) => {
        dispatch(removeBlockPointByUrl(url));
        updateBlockPointSetting(getState);
    }
}

export function modifyBlockPointRegexAndSave(index, regex) {
    return (dispatch, getState) => {
        dispatch(modifyBlockPointRegex(index, regex));
        updateBlockPointSetting(getState);
    }
}
