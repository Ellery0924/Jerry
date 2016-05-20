'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setServer = setServer;
/**
 * Created by Ellery1 on 16/1/11.
 */
function setServer(state, server) {

  return state.updateIn(['server'], function (_) {
    return server;
  });
}
//# sourceMappingURL=serverManage.js.map
