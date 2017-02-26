/**
 * Created by Ellery1 on 16/1/11.
 */
export function setServer(state, server) {
    return state.updateIn(['server'], () => server);
}