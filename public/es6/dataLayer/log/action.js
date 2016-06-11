/**
 * Created by Ellery1 on 16/6/6.
 */
export const PUSH_LOG = 'PUSH_LOG';
export const CHECK_DETAIL = 'CHECK_DETAIL';
export const FILTER = 'FILTER';
export const CLEAR = 'CLEAR';
export const CLOSE_DETAIL = 'CLOSE_DETAIL';

export function pushLog(logData) {
    return {type: PUSH_LOG, logData};
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

