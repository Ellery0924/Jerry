/**
 * Created by Ellery1 on 16/6/6.
 */
import React from 'react';
import {connect} from 'react-redux';
import Navigator from '../Common/Navigator';
import Logger from '../LoggerView';
import {filter, checkDetail, pushLog} from '../../dataLayer/log/action';

var LoggerView = React.createClass({
    render(){

        const {current, list, filterCondition, filtered} = this.props;

        return (
            <div className="logger">
                <Navigator/>
                <Logger {...this.props}/>
            </div>
        )
    }
});

function select(state) {

    return state.get('logger').toJS();
}

export default connect(select)(LoggerView);