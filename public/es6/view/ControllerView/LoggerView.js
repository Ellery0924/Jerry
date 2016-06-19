/**
 * Created by Ellery1 on 16/6/6.
 */
import React from 'react';
import {connect} from 'react-redux';
import Navigator from '../Common/Navigator';
import Logger from '../LoggerView';
import {filter, checkDetail, clear, closeDetail, blockPointContinueAsync} from '../../dataLayer/log/action';

var LoggerView = React.createClass({
    render(){

        const {dispatch, state}=this.props;

        return (
            <div className="logger">
                <Navigator/>
                <Logger
                    current={state.get('current').toJS()}
                    filtered={state.get('filtered')}
                    filterCondition={state.get('filterCondition').toJS()}
                    isBlocked={state.get('isBlocked')}
                    filter={condition=>{dispatch(filter(condition))}}
                    checkDetail={item=>{dispatch(checkDetail(item))}}
                    clear={()=>{dispatch(clear())}}
                    closeDetail={()=>{dispatch(closeDetail())}}
                    blockPointContinue={blockPoint=>dispatch(blockPointContinueAsync(blockPoint))}
                />
            </div>
        );
    }
});

function select(state) {

    return {state: state.logger};
}

export default connect(select)(LoggerView);