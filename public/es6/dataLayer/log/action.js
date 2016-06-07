/**
 * Created by Ellery1 on 16/6/6.
 */
export const PUSH_LOG = 'PUSH_LOG';
export const CHECK_DETAIL = 'CHECK_DETAIL';
export const FILTER = 'FILTER';

export function pushLog(logData) {
    return {type: PUSH_LOG, logData};
}

export function checkDetail(index) {
    return {type: CHECK_DETAIL, index};
}

export function filter(condition) {
    return {type: FILTER, condition};
}

