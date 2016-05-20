'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setPattern = setPattern;
exports.insertPattern = insertPattern;
exports.deletePattern = deletePattern;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setPattern(state, index, pattern) {

    return state.updateIn(['config', 'rewrite', index], function (_) {
        return pattern;
    });
} /**
   * Created by Ellery1 on 16/1/11.
   */

function insertPattern(state, pattern) {

    return state.updateIn(['config', 'rewrite'], function (patterList) {
        return patterList.concat([_immutable2.default.fromJS(pattern)]);
    });
}

function deletePattern(state, index) {

    return state.updateIn(['config', 'rewrite'], function (patternList) {
        return patternList.filter(function (pattern, i) {
            return i !== index;
        });
    });
}
//# sourceMappingURL=rewriteManage.js.map
