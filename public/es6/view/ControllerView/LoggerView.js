/**
 * Created by Ellery1 on 16/6/6.
 */
import React from 'react';
import { connect } from 'react-redux';
import Navigator from '../Common/Navigator';
import Logger from '../LoggerView';
import {
    filter,
    checkDetail,
    clear,
    closeDetail,
    blockPointContinueAsync,
    blockPointAbortAsync,
    allBlockPointContinueAsync,
    allBlockPointAbortAsync,
    insertBlockPointAndSave,
    removeBlockPointAndSave,
    removeSelectedBlockPointAndSave,
    switchBlockPointAndSave,
    selectBlockPoint,
    selectAllBlockPoint,
    deselectBlockPoint,
    deselectAllBlockPoint,
    removeBlockPointByUrlAndSave,
    modifyBlockPointRegexAndSave
} from '../../dataLayer/log/action';

const LoggerView = React.createClass({
    render(){
        const { dispatch, state }=this.props;

        return (
            <div className="logger">
                <Navigator/>
                <Logger
                    current={state.get('current').toJS()}
                    filtered={state.get('filtered')}
                    filterCondition={state.get('filterCondition').toJS()}
                    isBlocked={state.get('isBlocked')}
                    blockPointList={state.get('blockPoint')}
                    filter={condition => {
                        dispatch(filter(condition))
                    }}
                    checkDetail={item => {
                        dispatch(checkDetail(item))
                    }}
                    clear={() => {
                        dispatch(clear())
                    }}
                    closeDetail={() => {
                        dispatch(closeDetail())
                    }}
                    blockPointContinue={blockPoint => dispatch(blockPointContinueAsync(blockPoint))}
                    blockPointAbort={blockPoint => dispatch(blockPointAbortAsync(blockPoint))}
                    allBlockPointContinue={() => dispatch(allBlockPointContinueAsync())}
                    allBlockPointAbort={() => dispatch(allBlockPointAbortAsync())}
                    insertBlockPointAndSave={regex => dispatch(insertBlockPointAndSave(regex))}
                    removeBlockPointAndSave={index => dispatch(removeBlockPointAndSave(index))}
                    removeSelectedBlockPointAndSave={() => dispatch(removeSelectedBlockPointAndSave())}
                    switchBlockPointAndSave={(index, isOn) => dispatch(switchBlockPointAndSave(index, isOn))}
                    selectBlockPoint={index => dispatch(selectBlockPoint(index))}
                    selectAllBlockPoint={() => dispatch(selectAllBlockPoint())}
                    deselectBlockPoint={index => dispatch(deselectBlockPoint(index))}
                    deselectAllBlockPoint={() => dispatch(deselectAllBlockPoint())}
                    removeBlockPointByUrlAndSave={url => dispatch(removeBlockPointByUrlAndSave(url))}
                    modifyBlockPointRegexAndSave={(index, regex) => dispatch(modifyBlockPointRegexAndSave(index, regex))}
                />
            </div>
        );
    }
});

function select(state) {
    return { state: state.logger };
}

export default connect(select)(LoggerView);