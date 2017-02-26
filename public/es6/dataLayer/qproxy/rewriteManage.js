/**
 * Created by Ellery1 on 16/1/11.
 */
import Immutable from 'immutable';

export function setPattern(state, index, pattern) {
    return state.updateIn(['config', 'rewrite', index], () => pattern)
}

export function insertPattern(state, pattern) {
    return state.updateIn(['config', 'rewrite'], patterList => patterList.concat([Immutable.fromJS(pattern)]));
}

export function deletePattern(state, index) {
    return state.updateIn(['config', 'rewrite'], patternList => patternList.filter((pattern, i) => i !== index));
}