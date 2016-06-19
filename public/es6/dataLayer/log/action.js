/**
 * Created by Ellery1 on 16/6/6.
 */
import wsClient from '../../wsClient';

export const PUSH_LOG = 'PUSH_LOG';
export const PUSH_BLOCK_POINT = 'PUSH_BLOCK_POINT';
export const BLOCK_POINT_CONTINUE = 'BLOCK_POINT_CONTINUE';
export const CHECK_DETAIL = 'CHECK_DETAIL';
export const FILTER = 'FILTER';
export const CLEAR = 'CLEAR';
export const CLOSE_DETAIL = 'CLOSE_DETAIL';

export function pushLog(logData) {
    return {type: PUSH_LOG, logData};
}

export function pushBlockPoint(logData) {
    return {type: PUSH_BLOCK_POINT, logData};
}

export function blockPointContinue(blockPoint) {
    return {type: BLOCK_POINT_CONTINUE, blockPoint};
}

export function blockPointContinueAsync(blockPoint) {

    return function (dispatch) {

        dispatch(blockPointContinue(blockPoint));
        wsClient.emit('blockPointContinue', blockPoint.guid, blockPoint.response.body);
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

