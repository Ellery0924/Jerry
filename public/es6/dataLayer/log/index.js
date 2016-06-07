/**
 * Created by Ellery1 on 16/6/6.
 */
export default function (state, action) {

    var logState = state.get('logger');

    switch (action.type) {
        default:
            return logState;
    }
}