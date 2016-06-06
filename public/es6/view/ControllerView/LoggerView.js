/**
 * Created by Ellery1 on 16/6/6.
 */
import React from 'react';
import {connect} from 'react-redux';
import Navigator from '../Common/Navigator';

var LoggerView = React.createClass({
    render(){

        const {current, list} = this.props;

        return (
            <div className="logger">
                <Navigator/>
                <div className="test">{JSON.stringify(current)}</div>
            </div>
        )
    }
});

function select(state) {

    return state.get('logger').toJS();
}

export default connect(select)(LoggerView);