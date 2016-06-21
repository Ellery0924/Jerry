/**
 * Created by Ellery1 on 16/6/6.
 */
import wsClient from '../../wsClient';

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
export const SWITCH_BLOCK_POINT = 'SWITCH_BLOCK_POINT';

export function pushLog(logData) {
    return {type: PUSH_LOG, logData};
}

export function pushBlockPoint(logData) {
    return {type: PUSH_BLOCK_POINT, logData};
}

export function blockPointContinue(blockPoint) {
    return {type: BLOCK_POINT_CONTINUE, blockPoint};
}

export function blockPointAbort(blockPoint) {
    return {type: BLOCK_POINT_ABORT, blockPoint};
}

export function blockPointContinueAsync(blockPoint) {

    return function (dispatch, getState) {

        dispatch(blockPointContinue(blockPoint));
        let isBlocked = getState().logger.get('isBlocked');
        wsClient.emit('blockPointContinue', blockPoint, isBlocked);
    }
}

export function blockPointAbortAsync(blockPoint) {

    return function (dispatch, getState) {

        dispatch(blockPointAbort(blockPoint));
        let isBlocked = getState().logger.get('isBlocked');
        wsClient.emit('blockPointAbort', blockPoint, isBlocked);
    }
}

export function checkDetail(current) {
    return {type: CHECK_DETAIL, current};
}

export function filter(condition) {
    return {type: FILTER, condition};
}

export function clear() {
    return {type: CLEAR};
}

export function closeDetail() {
    return {type: CLOSE_DETAIL};
}

export function fetchBlockPoint() {

    return function (dispatch, getState) {

        return fetch('/qproxy/blockPointSetting', {
            method: 'get'
        })
            .then(res=>res.json())
            .then(res=> {

                dispatch(initBlockPointList(res.list));
            });
    }
}

export function initBlockPointList(list) {
    return {type: INIT_BLOCK_POINT_LIST, list};
}

export function insertBlockPoint(regex) {
    return {type: INIT_BLOCK_POINT_LIST, regex};
}

export function removeBlockPoint(index) {
    return {type: REMOVE_BLOCK_POINT, index};
}

export function switchBlockPoint(index, isOn) {
    return {type: SWITCH_BLOCK_POINT, index, isOn};
}