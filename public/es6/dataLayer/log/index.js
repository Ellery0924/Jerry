/**
 * Created by Ellery1 on 16/6/6.
 */
import {
    FILTER,
    CHECK_DETAIL,
    PUSH_LOG,
    PUSH_BLOCK_POINT,
    CLEAR,
    CLOSE_DETAIL,
    INIT_BLOCK_POINT_LIST,
    BLOCK_POINT_CONTINUE,
    BLOCK_POINT_ABORT,
    INSERT_BLOCK_POINT,
    REMOVE_BLOCK_POINT,
    SWITCH_BLOCK_POINT,
    SELECT_BLOCK_POINT,
    DESELECT_BLOCK_POINT,
    SELECT_ALL_BLOCK_POINT,
    DESELECT_ALL_BLOCK_POINT,
    REMOVE_SELECTED_BLOCK_POINT,
    REMOVE_BLOCK_POINT_BY_URL,
    MODIFY_BLOCK_POINT_REGEX
} from './action';
import {
    filter,
    checkDetail,
    pushLog,
    pushBlockPoint,
    clear,
    closeDetail,
    blockPointHandle
} from './log';

import {
    initBlockPointList,
    insertBlockPoint,
    removeBlockPoint,
    switchBlockPoint,
    selectBlockPoint,
    deselectBlockPoint,
    selectAllBlockPoint,
    deselectAllBlockPoint,
    removeSelectedBlockPoint,
    removeBlockPointByUrl,
    modifyBlockPointRegex
} from './blockPointManage';

export default function (state, action) {
    const logState = state.logger;

    switch (action.type) {
    case FILTER:
        return filter(logState, action.condition);
    case CHECK_DETAIL:
        return checkDetail(logState, action.current);
    case PUSH_LOG:
        return pushLog(logState, action.logData);
    case CLEAR:
        return clear(logState);
    case CLOSE_DETAIL:
        return closeDetail(logState);
    case PUSH_BLOCK_POINT:
        return pushBlockPoint(logState, action.logData);
    case BLOCK_POINT_CONTINUE:
        return blockPointHandle(logState, action.blockPoint);
    case BLOCK_POINT_ABORT:
        return blockPointHandle(logState, action.blockPoint);
    case INIT_BLOCK_POINT_LIST:
        return initBlockPointList(logState, action.list);
    case INSERT_BLOCK_POINT:
        return insertBlockPoint(logState, action.regex);
    case REMOVE_BLOCK_POINT:
        return removeBlockPoint(logState, action.index);
    case SWITCH_BLOCK_POINT:
        return switchBlockPoint(logState, action.index, action.isOn);
    case SELECT_BLOCK_POINT:
        return selectBlockPoint(logState, action.index);
    case DESELECT_BLOCK_POINT:
        return deselectBlockPoint(logState, action.index);
    case SELECT_ALL_BLOCK_POINT:
        return selectAllBlockPoint(logState);
    case DESELECT_ALL_BLOCK_POINT:
        return deselectAllBlockPoint(logState);
    case REMOVE_SELECTED_BLOCK_POINT:
        return removeSelectedBlockPoint(logState);
    case REMOVE_BLOCK_POINT_BY_URL:
        return removeBlockPointByUrl(logState, action.url);
    case MODIFY_BLOCK_POINT_REGEX:
        return modifyBlockPointRegex(logState, action.index, action.regex);
    default:
        return logState;
    }
}